from flask import Flask, request, jsonify
from flask_cors import CORS
import re
from datetime import datetime

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

def luhn_check(card_number):
    if not card_number or not card_number.strip():
        return False

    # Remove all non-digit characters
    numbers = ''.join(filter(str.isdigit, card_number))
    if len(numbers) < 13 or len(numbers) > 19:
        return False

    sum = 0
    is_even = False

    # Loop through values starting from the rightmost digit
    for i in range(len(numbers) - 1, -1, -1):
        digit = int(numbers[i])

        if is_even:
            digit *= 2
            if digit > 9:
                digit -= 9

        sum += digit
        is_even = not is_even

    return sum % 10 == 0

def get_card_type(number):
    # Remove all non-digit characters
    number = ''.join(filter(str.isdigit, number))
    
    if not number:
        return "Unknown"
        
    first_digit = number[0]
    first_two_digits = number[:2]
    
    if first_digit == '4':
        return 'Visa'
    if first_two_digits in ['51', '52', '53', '54', '55']:
        return 'MasterCard'
    if first_two_digits in ['34', '37']:
        return 'American Express'
    if first_digit == '6':
        return 'Discover'
    return 'Unknown'

def validate_card_format(card_number):
    # Remove spaces and non-digit characters
    clean_number = ''.join(filter(str.isdigit, card_number))
    
    # Check if the number contains only digits
    if not clean_number.isdigit():
        return False, "Card number must contain only digits"
    
    # Check length
    if len(clean_number) < 13 or len(clean_number) > 19:
        return False, "Card number must be between 13 and 19 digits"
    
    return True, clean_number

def get_card_details(card_number):
    clean_number = ''.join(filter(str.isdigit, card_number))
    card_type = get_card_type(clean_number)
    
    # Get card length
    length = len(clean_number)
    
    # Get first 6 digits (BIN/IIN)
    bin_number = clean_number[:6] if length >= 6 else clean_number
    
    # Get last 4 digits
    last_four = clean_number[-4:] if length >= 4 else clean_number
    
    return {
        'type': card_type,
        'length': length,
        'bin': bin_number,
        'lastFour': last_four,
        'isValid': luhn_check(clean_number)
    }

@app.route('/api/validate', methods=['POST'])
def validate_card():
    try:
        data = request.get_json()
        
        if not data or 'cardNumber' not in data:
            return jsonify({
                'error': 'Card number is required'
            }), 400

        card_number = data['cardNumber']
        
        # Validate card format
        is_valid_format, format_result = validate_card_format(card_number)
        if not is_valid_format:
            return jsonify({
                'error': format_result
            }), 400
            
        # Get card details
        card_details = get_card_details(card_number)
        
        # Add timestamp
        card_details['timestamp'] = datetime.utcnow().isoformat()
        
        return jsonify(card_details)
        
    except Exception as e:
        return jsonify({
            'error': f'An error occurred: {str(e)}'
        }), 500

@app.route('/api/health', methods=['GET'])
def health_check():
    return jsonify({
        'status': 'healthy',
        'timestamp': datetime.utcnow().isoformat()
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000) 
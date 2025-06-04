# Credit Card Validator

This project is a web application that validates credit card numbers using Luhn's Algorithm and identifies the card type. It features a React frontend with a modern UI and a Python Flask backend.

## Features

### Frontend (React)

*   **Modern UI/UX:** Built with Material UI with improved styling, animations, and user feedback.
*   **Input Formatting:** Automatically formats the credit card number with spaces.
*   **Real-time Feedback:** Displays the number of digits entered and validation status.
*   **Loading Indicator:** Shows a loading spinner during validation.
*   **Error Handling:** Displays informative error messages.
*   **Card Icon:** Shows a generic card icon in the input field.

### Backend (Flask)

*   **Luhn's Algorithm Validation:** Implements the check digit algorithm.
*   **Card Type Detection:** Identifies Visa, Mastercard, American Express, and Discover.
*   **REST API:** Provides a `/api/validate` endpoint to receive card numbers and return validation results and card details.
*   **Input Validation:** Basic format validation for the card number.
*   **Error Handling:** Provides meaningful error responses for invalid input or server issues.
*   **Health Check:** Includes a `/api/health` endpoint.

## Technologies Used

*   **Frontend:** React, Material UI (MUI)
*   **Backend:** Python, Flask, Flask-CORS, Werkzeug

## Setup

1.  **Clone the repository:**

    ```bash
    git clone <repository_url>
    cd Credit-Card-Validator-main
    ```

2.  **Backend Setup (Python/Flask):**

    *   Navigate into the `backend` directory:

        ```bash
        cd backend
        ```

    *   (Optional but Recommended) Create a virtual environment:

        ```bash
        # On Windows
        python -m venv venv
        .\venv\Scripts\activate

        # On macOS/Linux
        python3 -m venv venv
        source venv/bin/activate
        ```

    *   Install dependencies:

        ```bash
        pip install -r requirements.txt
        ```

3.  **Frontend Setup (React):**

    *   Navigate back to the project root directory:

        ```bash
        cd ..
        ```

    *   Install dependencies:

        ```bash
        npm install
        ```

## Running the Application

1.  **Start the Flask Backend:**

    *   Open a terminal and navigate to the `backend` directory.
    *   Run the Flask development server:

        ```bash
        python app.py
        ```

2.  **Start the React Frontend:**

    *   Open a *separate* terminal and navigate to the project root directory.
    *   Run the React development server:

        ```bash
        npm start
        ```

    The frontend should open in your browser at `http://localhost:3000/`.

## Usage

1.  Ensure both the backend and frontend servers are running.
2.  Open your browser to `http://localhost:3000/`.
3.  Enter a credit card number in the input field.
4.  Click the "Validate Card" button.
5.  The application will display whether the card is valid and its type.

## Deployment

Deploying a project with a separate frontend and backend involves deploying each part to a suitable hosting service.

1.  **Deploying the Flask Backend:**

    *   Platforms like Heroku, Render, PythonAnywhere, or a Virtual Private Server (VPS) are suitable for Flask applications.
    *   You'll typically need to:
        *   Choose a hosting provider.
        *   Set up a production-ready web server (like Gunicorn or uWSGI).
        *   Configure environment variables (though not strictly necessary for this simple project).
        *   Push your backend code to the hosting service.

2.  **Deploying the React Frontend:**

    *   Platforms that host static websites are ideal, such as Netlify, Vercel, GitHub Pages, or surge.sh.
    *   You'll typically need to:
        *   Build your React application:

            ```bash
            npm run build
            ```
        *   The build output will be in the `build` folder.
        *   Upload the contents of the `build` folder to your static hosting service.

3.  **Connecting Frontend and Backend:**

    *   **Crucially:** Once your backend is deployed, you will get a public URL for it (e.g., `https://your-flask-backend.herokuapp.com`).
    *   You need to update the `fetch` request URL in your frontend code (`src/App.js`) from `'http://localhost:5000/api/validate'` to your backend's deployed URL (e.g., `'https://your-flask-backend.herokuapp.com/api/validate'`).
    *   After updating the URL, rebuild the frontend (`npm run build`) and redeploy the updated `build` folder to your static hosting service.

*Note: For simple projects like this, you might consider deploying both the frontend and backend together on a platform like Render or Heroku for easier management, although separating them is also a common and often more scalable approach.*

## Contributing

If you'd like to contribute, please fork the repository and create a pull request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details. (You might want to add a LICENSE file to your repo if you plan to share it.)

## Acknowledgments

*   Built with React and Flask.
*   Uses Material UI for the user interface.
*   Luhn's Algorithm implementation based on standard practices.

## Output
![image](https://github.com/user-attachments/assets/df92fee7-29a2-473c-a0e1-655036522378)
![image](https://github.com/user-attachments/assets/1f17e218-6380-4e0e-bbe6-b75612aa4bb8)
![image](https://github.com/user-attachments/assets/53c86e4f-7041-4ae7-a442-c236fdbccd7d)


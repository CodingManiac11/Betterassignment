import React, { useState, useEffect } from 'react';
import {
  Container,
  Box,
  TextField,
  Typography,
  Card,
  CardContent,
  Button,
  Alert,
  CircularProgress,
  IconButton,
  InputAdornment,
  Tooltip,
  Fade,
  Zoom,
} from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import { CreditCard, Info, CheckCircle, Error } from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#2196f3',
      light: '#64b5f6',
      dark: '#1976d2',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5',
      paper: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 600,
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
  },
});

function App() {
  const [cardNumber, setCardNumber] = useState('');
  const [isValid, setIsValid] = useState(null);
  const [cardType, setCardType] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [cardDetails, setCardDetails] = useState({
    length: 0,
    formattedNumber: '',
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    
    try {
      const response = await fetch('http://localhost:5000/api/validate', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ cardNumber }),
      });

      const data = await response.json();
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to validate card');
      }

      setIsValid(data.isValid);
      setCardType(data.type);
    } catch (err) {
      setError(err.message);
      setIsValid(false);
      setCardType('');
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (e) => {
    const input = e.target.value;
    // Remove all non-digit characters
    const digitsOnly = input.replace(/\D/g, '');
    
    // Format with spaces after every 4 digits
    let formatted = '';
    for (let i = 0; i < digitsOnly.length; i++) {
      if (i > 0 && i % 4 === 0) {
        formatted += ' ';
      }
      formatted += digitsOnly[i];
    }
    
    setCardNumber(formatted);
    setCardDetails({
      length: digitsOnly.length,
      formattedNumber: formatted,
    });
    
    // Reset validation state when input changes
    setIsValid(null);
    setCardType('');
    setError('');
  };

  const getCardIcon = () => {
    if (!cardType) return <CreditCard />;
    switch (cardType.toLowerCase()) {
      case 'visa':
        return '💳';
      case 'mastercard':
        return '💳';
      case 'american express':
        return '💳';
      case 'discover':
        return '💳';
      default:
        return <CreditCard />;
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <Box
        sx={{
          minHeight: '100vh',
          backgroundColor: 'background.default',
          py: 4,
        }}
      >
        <Container maxWidth="sm">
          <Fade in={true} timeout={1000}>
            <Card
              elevation={3}
              sx={{
                backgroundColor: 'background.paper',
                borderRadius: 2,
                transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                },
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    mb: 3,
                  }}
                >
                  <Typography
                    variant="h4"
                    component="h1"
                    sx={{
                      color: 'primary.main',
                      fontWeight: 'bold',
                      textAlign: 'center',
                    }}
                  >
                    Credit Card Validator
                  </Typography>
                </Box>

                <form onSubmit={handleSubmit}>
                  <TextField
                    fullWidth
                    label="Enter Credit Card Number"
                    variant="outlined"
                    value={cardNumber}
                    onChange={handleInputChange}
                    margin="normal"
                    placeholder="XXXX XXXX XXXX XXXX"
                    inputProps={{
                      maxLength: 24,
                    }}
                    sx={{
                      mb: 2,
                      '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                          borderColor: 'primary.light',
                        },
                      },
                    }}
                    error={isValid === false}
                    helperText={
                      isValid === false
                        ? "Invalid card number"
                        : cardDetails.length > 0
                        ? `${cardDetails.length} digits entered`
                        : ""
                    }
                    disabled={isLoading}
                    InputProps={{
                      startAdornment: (
                        <InputAdornment position="start">
                          {getCardIcon()}
                        </InputAdornment>
                      ),
                      endAdornment: cardNumber && (
                        <InputAdornment position="end">
                          <Tooltip title="Clear">
                            <IconButton
                              onClick={() => {
                                setCardNumber('');
                                setCardDetails({ length: 0, formattedNumber: '' });
                                setIsValid(null);
                                setCardType('');
                              }}
                              edge="end"
                            >
                              <Error />
                            </IconButton>
                          </Tooltip>
                        </InputAdornment>
                      ),
                    }}
                  />

                  {isValid === true && cardType && (
                    <Zoom in={true}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          mb: 2,
                          p: 2,
                          backgroundColor: 'success.light',
                          borderRadius: 1,
                          color: 'success.contrastText',
                        }}
                      >
                        <CheckCircle sx={{ mr: 1 }} />
                        <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                          Valid {cardType} Card
                        </Typography>
                      </Box>
                    </Zoom>
                  )}

                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    fullWidth
                    size="large"
                    sx={{
                      mb: 2,
                      height: 48,
                      position: 'relative',
                    }}
                    disabled={!cardNumber.trim() || isLoading}
                  >
                    {isLoading ? (
                      <CircularProgress
                        size={24}
                        sx={{
                          position: 'absolute',
                          top: '50%',
                          left: '50%',
                          marginTop: '-12px',
                          marginLeft: '-12px',
                        }}
                      />
                    ) : (
                      'Validate Card'
                    )}
                  </Button>

                  {error && (
                    <Fade in={true}>
                      <Alert
                        severity="error"
                        sx={{
                          mt: 2,
                          '& .MuiAlert-icon': {
                            alignItems: 'center',
                          },
                        }}
                      >
                        {error}
                      </Alert>
                    </Fade>
                  )}

                  {isValid !== null && !error && (
                    <Fade in={true}>
                      <Alert
                        severity={isValid ? "success" : "error"}
                        sx={{
                          mt: 2,
                          animation: 'fadeIn 0.5s ease-in',
                          '@keyframes fadeIn': {
                            '0%': {
                              opacity: 0,
                              transform: 'translateY(-10px)',
                            },
                            '100%': {
                              opacity: 1,
                              transform: 'translateY(0)',
                            },
                          },
                        }}
                      >
                        {isValid
                          ? "Valid credit card number!"
                          : "Invalid credit card number. Please check and try again."}
                      </Alert>
                    </Fade>
                  )}
                </form>

                <Box
                  sx={{
                    mt: 3,
                    pt: 2,
                    borderTop: '1px solid',
                    borderColor: 'divider',
                  }}
                >
                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Info sx={{ mr: 1, fontSize: 16 }} />
                    Enter a credit card number to validate it using Luhn's algorithm
                  </Typography>
                </Box>
              </CardContent>
            </Card>
          </Fade>
        </Container>
      </Box>
    </ThemeProvider>
  );
}

export default App; 
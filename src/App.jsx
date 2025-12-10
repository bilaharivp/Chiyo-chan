import { useState } from 'react';
import './App.css';

function App() {
  const [cardNumber, setCardNumber] = useState('');
  const [expiryDate, setExpiryDate] = useState('');
  const [securityCode, setSecurityCode] = useState('');
  const [showSuccess, setShowSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  // Format card number with spaces every 4 digits
  const handleCardNumberChange = (e) => {
    const value = e.target.value.replace(/\s/g, '');
    const formattedValue = value.replace(/(\d{4})/g, '$1 ').trim();
    if (value.length <= 16) {
      setCardNumber(formattedValue);
      if (errors.cardNumber) {
        setErrors({ ...errors, cardNumber: false });
      }
    }
  };

  // Format expiry date as MM/YY
  const handleExpiryDateChange = (e) => {
    let value = e.target.value.replace(/\D/g, '');
    if (value.length >= 2) {
      value = value.slice(0, 2) + '/' + value.slice(2, 4);
    }
    setExpiryDate(value);
    if (errors.expiryDate) {
      setErrors({ ...errors, expiryDate: false });
    }
  };

  // Handle security code
  const handleSecurityCodeChange = (e) => {
    const value = e.target.value.replace(/\D/g, '');
    if (value.length <= 3) {
      setSecurityCode(value);
      if (errors.securityCode) {
        setErrors({ ...errors, securityCode: false });
      }
    }
  };

  // Validate form
  const validateForm = () => {
    const newErrors = {};
    const cardNumberDigits = cardNumber.replace(/\s/g, '');
    
    if (cardNumberDigits.length !== 16) {
      newErrors.cardNumber = true;
    }
    
    if (expiryDate.length !== 5) {
      newErrors.expiryDate = true;
    }
    
    if (securityCode.length !== 3) {
      newErrors.securityCode = true;
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = () => {
    if (validateForm()) {
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setCardNumber('');
        setExpiryDate('');
        setSecurityCode('');
      }, 3000);
    }
  };

  return (
    <div className="popup-container">
      <div className="popup">
        <div className="title-bar">
          <span className="title">Totally Not Malware</span>
          <button className="close-btn" onClick={() => window.close()}>✕</button>
        </div>
        <div className="content">
          <div className="message">
            H-hi there… do you th-think I could have your credit card information, p-please?
          </div>
          <div className="main-content">
            <div className="left-side">
              <img 
                src="/chiyo-character.png" 
                alt="Anime character" 
                className="character-image" 
              />
            </div>
            <div className="right-side">
              <div className="input-group">
                <label htmlFor="card-number">Card number</label>
                <input 
                  type="text" 
                  id="card-number" 
                  placeholder="1234 5678 9012 3456"
                  value={cardNumber}
                  onChange={handleCardNumberChange}
                  className={errors.cardNumber ? 'error' : cardNumber.replace(/\s/g, '').length === 16 ? 'success' : ''}
                />
              </div>
              <div className="input-group">
                <label htmlFor="expiry-date">Expiry date</label>
                <input 
                  type="text" 
                  id="expiry-date" 
                  placeholder="MM/YY"
                  value={expiryDate}
                  onChange={handleExpiryDateChange}
                  className={errors.expiryDate ? 'error' : expiryDate.length === 5 ? 'success' : ''}
                />
              </div>
              <div className="input-group">
                <label htmlFor="security-code">Security code</label>
                <input 
                  type="text" 
                  id="security-code" 
                  placeholder="123"
                  value={securityCode}
                  onChange={handleSecurityCodeChange}
                  className={errors.securityCode ? 'error' : securityCode.length === 3 ? 'success' : ''}
                />
              </div>
            </div>
          </div>
          <div className="button-container">
            <button className="thanks-btn" onClick={handleSubmit}>
              Th-thanks
            </button>
          </div>
          {showSuccess && (
            <div className="success-message">
              Th-thank you so much! I promise I'm not a scammer! 💕
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

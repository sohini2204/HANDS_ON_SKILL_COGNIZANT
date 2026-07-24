import React, { useState } from 'react';

function CurrencyConvertor() {
  const [amount, setAmount] = useState(0);
  const [currency, setCurrency] = useState('INR');
  const [convertedAmount, setConvertedAmount] = useState(null);

  const handleSubmit = (event) => {
    event.preventDefault();
    // Conversion rates (approximate)
    const conversionRates = {
      INR: { EUR: 0.011 },
      EUR: { INR: 91.0 }
    };

    let result;
    if (currency === 'INR') {
      result = amount * conversionRates.INR.EUR;
      setConvertedAmount(`${amount} INR = ${result.toFixed(2)} EUR`);
    } else if (currency === 'EUR') {
      result = amount * conversionRates.EUR.INR;
      setConvertedAmount(`${amount} EUR = ${result.toFixed(2)} INR`);
    }
  };

  return (
    <div className="currency-convertor">
      <h2>Currency Convertor !!!</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Amount:</label>
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(Number(e.target.value))}
            placeholder="Enter amount"
          />
        </div>
        <div className="form-group">
          <label>Currency:</label>
          <select value={currency} onChange={(e) => setCurrency(e.target.value)}>
            <option value="INR">INR - Indian Rupee</option>
            <option value="EUR">EUR - Euro</option>
          </select>
        </div>
        <button type="submit" className="convert-btn">Convert</button>
      </form>
      {convertedAmount && (
        <div className="conversion-result">
          <p>{convertedAmount}</p>
        </div>
      )}
    </div>
  );
}

export default CurrencyConvertor;


import React, { useState } from 'react';
import './App.css';
import {
  FaMoneyCheckAlt,
  FaUserCheck,
  FaPercent,
  FaClock,
  FaShieldAlt,
} from 'react-icons/fa';

function App() {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    mobile: '',
    monthlySalary: '',
    requiredLoanAmount: '',
  });

  const [status, setStatus] = useState('idle'); // idle | submitting | success | error

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'mobile') {
      const digits = value.replace(/\D/g, '');
      if (digits.length <= 10) {
        setFormData((prev) => ({ ...prev, mobile: digits }));
      }
      return;
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setStatus('submitting');

  // Use FormData for easier handling (also works if you add files later)
  const formElement = e.target;
  const formDataObj = new FormData(formElement);
  formDataObj.append('form-name', 'loan-enquiry'); // ensure it's there

  const formBody = new URLSearchParams();
  for (const [key, value] of formDataObj.entries()) {
    formBody.append(key, value);
  }

  try {
    const response = await fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: formBody.toString(),
    });

    if (response.ok) {
      setStatus('success');
      console.log('Form submitted successfully!');
    } else {
      const errorText = await response.text();
      console.error('Submission failed:', response.status, errorText);
      setStatus('error');
    }
  } catch (err) {
    console.error('Network/fetch error:', err);
    setStatus('error');
  }
};

  return (
    <div className="app">
      {/* Floating Icons */}
      <div className="floating-icons">
        <div className="loan-icon"><FaMoneyCheckAlt /></div>
        <div className="loan-icon"><FaUserCheck /></div>
        <div className="loan-icon"><FaPercent /></div>
        <div className="loan-icon"><FaClock /></div>
        <div className="loan-icon"><FaShieldAlt /></div>
      </div>

      <div className="overlay">
        <div className="form-card">
          <h1>💰 Affordable Personal Loan</h1>

          <p className="intro-text">
            Looking for a quick and affordable personal loan?<br />
            Share your details and get the <strong>best loan options with low interest rates</strong>.
          </p>

          <ul className="benefits-list">
            <li>✅ Low Interest Rates</li>
            <li>⚡ Quick Approval</li>
            <li>🔒 100% Secure</li>
            <li>📞 Personal Assistance</li>
          </ul>

          {status === 'success' ? (
            <div className="success-msg">
              <h3>✅ Thank you!</h3>
              <p>Your enquiry has been submitted successfully.<br />We'll contact you soon.</p>
            </div>
          ) : (
            <form
              name="loan-enquiry"
              method="POST"
              data-netlify="true"
              className="styled-form"
              onSubmit={handleSubmit}
            >
              <input type="hidden" name="form-name" value="loan-enquiry" />

              <div className="form-group">
                <label htmlFor="firstName">First Name</label>
                <input
                  id="firstName"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="lastName">Last Name</label>
                <input
                  id="lastName"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  id="email"
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="mobile">Mobile Number</label>
                <input
                  id="mobile"
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={handleChange}
                  placeholder="10-digit number"
                  pattern="[0-9]{10}"
                  title="Please enter a 10-digit mobile number"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="monthlySalary">Monthly Salary (₹)</label>
                <input
                  id="monthlySalary"
                  type="number"
                  name="monthlySalary"
                  value={formData.monthlySalary}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>

              <div className="form-group">
                <label htmlFor="requiredLoanAmount">Required Loan Amount (₹)</label>
                <input
                  id="requiredLoanAmount"
                  type="number"
                  name="requiredLoanAmount"
                  value={formData.requiredLoanAmount}
                  onChange={handleChange}
                  min="0"
                  required
                />
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className={status === 'submitting' ? 'submitting' : ''}
              >
                {status === 'submitting' ? 'Submitting...' : '📄 Apply for Personal Loan'}
              </button>

              {status === 'error' && (
                <p className="error-msg">Something went wrong. Please try again.</p>
              )}
            </form>
          )}

          <p className="cta-text">
            No hidden charges • No spam • Free consultation
          </p>
        </div>
      </div>
    </div>
  );
}

export default App;
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

  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="app">
      <div className="floating-icons">
        <FaMoneyCheckAlt className="loan-icon" />
        <FaUserCheck className="loan-icon" />
        <FaPercent className="loan-icon" />
        <FaClock className="loan-icon" />
        <FaShieldAlt className="loan-icon" />
      </div>

      <div className="overlay">
        <div className="form-card">
          <h1>💰 Affordable Personal Loan</h1>

          <p>
            Looking for a quick and affordable personal loan?
            Share your details and our experts will help you find the
            <strong> best loan options with low interest rates</strong>.
          </p>

          <ul className="benefits-list">
            <li>✅ <strong>Low Interest Rates</strong> – Budget-friendly EMIs</li>
            <li>⚡ <strong>Quick Approval</strong> – Minimal paperwork</li>
            <li>🔒 <strong>100% Secure</strong> – Your data is safe</li>
            <li>📞 <strong>Personal Assistance</strong> – Dedicated advisors</li>
          </ul>

          {submitted ? (
            <h3 style={{ color: 'green', textAlign: 'center' }}>
              ✅ Thank you! Your enquiry has been submitted.
            </h3>
          ) : (
              <form
                name="loan-enquiry"
                method="POST"
                data-netlify="true"
                className="styled-form"
                onSubmit={() => {
                  setSubmitted(true);
                }}
              >
              {/* Netlify hidden input */}
              <input type="hidden" name="form-name" value="loan-enquiry" />

              <div className="form-group">
                <label>First Name</label>
                <input name="firstName" value={formData.firstName} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Last Name</label>
                <input name="lastName" value={formData.lastName} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Email Address</label>
                <input type="email" name="email" value={formData.email} onChange={handleChange} required />
              </div>

              <div className="form-group">
                <label>Mobile Number</label>
                <input
                  type="tel"
                  name="mobile"
                  value={formData.mobile}
                  onChange={(e) => {
                    const value = e.target.value.replace(/\D/g, '');
                    if (value.length <= 10) {
                      setFormData(prev => ({ ...prev, mobile: value }));
                    }
                  }}
                  pattern="[0-9]{10}"
                  maxLength="10"
                  placeholder="10-digit mobile number"
                  required
                />
              </div>

              <div className="form-group">
                <label>Monthly Salary</label>
                <input
                  type="number"
                  name="monthlySalary"
                  value={formData.monthlySalary}
                  onChange={handleChange}
                  min="0"
                  onKeyDown={(e) => e.key === '-' && e.preventDefault()}
                  placeholder="Enter monthly salary"
                  required
                />
              </div>

              <div className="form-group">
                <label>Required Loan Amount</label>
                <input
                  type="number"
                  name="requiredLoanAmount"
                  value={formData.requiredLoanAmount}
                  onChange={handleChange}
                  min="0"
                  onKeyDown={(e) => e.key === '-' && e.preventDefault()}
                  placeholder="Enter loan amount"
                  required
                />
              </div>

              <button type="submit">📄 Apply for Personal Loan</button>
            </form>
          )}

          <p className="cta-text">No hidden charges • No spam • Free consultation</p>
        </div>
      </div>
    </div>
  );
}

export default App;

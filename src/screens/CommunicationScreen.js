import React, { useState } from 'react';
import { baseApiUrl } from '../styles/common';

const CommunicationScreen = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [message, setMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    
    try {
      const response = await fetch(`${baseApiUrl}/customer-care/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          name,
          email,
          phone,
          address,
          message
        })
      });
      
      if (!response.ok) {
        throw new Error('Failed to submit request');
      }
      
      setSubmitStatus('success');
      // Clear form
      setName('');
      setEmail('');
      setPhone('');
      setAddress('');
      setMessage('');
    } catch (error) {
      console.error('Error submitting:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Customer Care</h2>
      
      <div style={styles.formContainer}>
        <h3 style={styles.formTitle}>How Can We Help You?</h3>
        
        {submitStatus === 'success' && (
          <div style={styles.successMessage}>
            <p>Your request has been submitted successfully!</p>
            <p>Our team will contact you shortly.</p>
          </div>
        )}
        
        {submitStatus === 'error' && (
          <div style={styles.errorMessage}>
            <p>There was an error submitting your request. Please try again.</p>
          </div>
        )}
        
        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.formGroup}>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Full Name"
              style={styles.input}
            />
          </div>
          
          <div style={styles.formGroup}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="Email Address"
              style={styles.input}
            />
          </div>
          
          <div style={styles.formGroup}>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              required
              placeholder="Phone Number"
              style={styles.input}
            />
          </div>
          
          <div style={styles.formGroup}>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              required
              placeholder="Delivery Address"
              style={styles.textarea}
              rows="2"
            />
          </div>
          
          <div style={styles.formGroup}>
            <textarea
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="How can we assist you? Describe your needs..."
              style={styles.textarea}
              rows="4"
            />
          </div>
          
          <button 
            type="submit" 
            style={styles.submitButton}
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Submitting...' : 'Submit Request'}
          </button>
        </form>
      </div>
      
      <div style={styles.contactInfo}>
        <h3 style={styles.infoTitle}>Contact Information</h3>
        <p style={styles.infoItem}>
          <strong>Customer Care Hours:</strong> Mon-Fri: 8am - 5pm, Sat: 9am - 1pm
        </p>
        <p style={styles.infoItem}>
          <strong>Phone Support:</strong> +27 65 932 8906
        </p>
        <p style={styles.infoItem}>
          <strong>Response Time:</strong> We aim to respond within 24 business hours
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    padding: '15px',
    maxWidth: '600px',
    margin: '0 auto',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    textAlign: 'center',
    color: '#36b9cc',
    margin: '20px 0',
    fontSize: '1.8rem',
    fontWeight: 'bold'
  },
  formContainer: {
    backgroundColor: 'white',
    padding: '25px',
    borderRadius: '10px',
    boxShadow: '0 3px 15px rgba(0,0,0,0.08)',
    marginBottom: '30px'
  },
  formTitle: {
    marginTop: 0,
    color: '#2c3e50',
    textAlign: 'center',
    fontSize: '1.4rem',
    marginBottom: '25px',
    fontWeight: '600'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '18px'
  },
  formGroup: {
    marginBottom: '12px'
  },
  input: {
    width: '100%',
    padding: '14px',
    border: '1px solid #d1d3e2',
    borderRadius: '8px',
    fontSize: '16px',
    boxSizing: 'border-box',
    transition: 'border-color 0.3s',
    ':focus': {
      outline: 'none',
      borderColor: '#4e73df',
      boxShadow: '0 0 0 3px rgba(78, 115, 223, 0.15)'
    }
  },
  textarea: {
    width: '100%',
    padding: '14px',
    border: '1px solid #d1d3e2',
    borderRadius: '8px',
    fontSize: '16px',
    resize: 'vertical',
    boxSizing: 'border-box',
    minHeight: '100px',
    transition: 'border-color 0.3s',
    ':focus': {
      outline: 'none',
      borderColor: '#4e73df',
      boxShadow: '0 0 0 3px rgba(78, 115, 223, 0.15)'
    }
  },
  submitButton: {
    backgroundColor: '#4e73df',
    color: 'white',
    border: 'none',
    padding: '15px',
    borderRadius: '8px',
    cursor: 'pointer',
    fontWeight: '600',
    fontSize: '17px',
    transition: 'background-color 0.3s, transform 0.2s',
    marginTop: '10px',
    ':hover': {
      backgroundColor: '#2e59d9',
      transform: 'translateY(-2px)'
    },
    ':disabled': {
      backgroundColor: '#a0aec0',
      cursor: 'not-allowed',
      transform: 'none'
    }
  },
  contactInfo: {
    backgroundColor: '#f8f9fa',
    padding: '25px',
    borderRadius: '10px',
    border: '1px solid #eaeaea'
  },
  infoTitle: {
    marginTop: 0,
    color: '#2c3e50',
    fontSize: '1.3rem',
    marginBottom: '20px',
    textAlign: 'center'
  },
  infoItem: {
    margin: '15px 0',
    fontSize: '16px',
    lineHeight: '1.6'
  },
  successMessage: {
    backgroundColor: '#d4edda',
    color: '#155724',
    padding: '18px',
    borderRadius: '8px',
    marginBottom: '25px',
    textAlign: 'center',
    fontSize: '16px'
  },
  errorMessage: {
    backgroundColor: '#f8d7da',
    color: '#721c24',
    padding: '18px',
    borderRadius: '8px',
    marginBottom: '25px',
    textAlign: 'center',
    fontSize: '16px'
  }
};

export default CommunicationScreen;
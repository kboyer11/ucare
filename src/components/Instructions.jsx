import React from 'react';

const Instructions = ({ title = "Instructions", content, onContinue }) => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h1 style={styles.header}>{title}</h1>
        <div style={styles.instructionText}>
          {content}
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: '100vh',
    width: '100vw',
    backgroundColor: '#ffffff',
    padding: '20px',
    boxSizing: 'border-box'
  },
  content: {
    maxWidth: '800px',
    width: '100%',
    textAlign: 'center'
  },
  header: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#333',
    marginBottom: '2rem',
    fontFamily: 'Arial, sans-serif'
  },
  instructionText: {
    fontSize: '1.2rem',
    lineHeight: '1.6',
    color: '#555',
    marginBottom: '3rem',
    textAlign: 'left',
    fontFamily: 'Arial, sans-serif'
  },
  continueButton: {
    backgroundColor: '#007bff',
    color: 'white',
    border: 'none',
    padding: '12px 30px',
    fontSize: '1.1rem',
    borderRadius: '5px',
    cursor: 'pointer',
    fontFamily: 'Arial, sans-serif',
    transition: 'background-color 0.3s'
  }
};

export default Instructions;

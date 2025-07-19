import React from 'react';

const TextInstructions = () => {
  return (
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '100vh',
      padding: '20px',
      textAlign: 'center',
      maxWidth: '800px',
      margin: '0 auto'
    }}>
      <h2 style={{ marginBottom: '20px' }}>Instructions:</h2>
      <p>A passage of text will be shown, followed by a question related to its content.</p>
    </div>
  );
};

export default TextInstructions;

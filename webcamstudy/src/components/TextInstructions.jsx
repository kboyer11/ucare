import React from 'react';

const TextInstructions = ({ onSubmit }) => {

  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.title}>Instructions</h2>
        <p style={styles.instructions}>
          A passage of text will be shown, followed by a question related to its content.
        </p>
        <p style={styles.instructions}>
          Please read the text carefully.
        </p>
      </div>
    </div>
  );
};

const styles = {
  container: {
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    fontFamily: 'Arial, sans-serif',
  },
  content: {
    textAlign: 'center',
    maxWidth: '600px',
    padding: '20px',
  },
  title: {
    fontSize: '28px',
    marginBottom: '30px',
  },
  instructions: {
    fontSize: '20px',
    lineHeight: '1.6',
    marginBottom: '20px',
  }
};

export default TextInstructions;

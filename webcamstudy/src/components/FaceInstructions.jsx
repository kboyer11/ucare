import React from 'react';

const FaceInstructions = ({ onSubmit }) => {
  return (
    <div style={styles.container}>
      <div style={styles.content}>
        <h2 style={styles.title}>Instructions</h2>
        <p style={styles.instructions}>
          You will be shown a grid of faces. In each grid, select the face that portrays the happiest expression.
        </p>
        <p style={styles.instructions}>
          A new grid will show immediately after, repeat until the task is finished. 
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

export default FaceInstructions;

import React from 'react';

const FaceInstructions = () => {
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
      <p>A grid with images of faces will be shown, select the face that portrays the happiest expression for each grid. Repeat for each grid shown.</p>
    </div>
  );
};

export default FaceInstructions;

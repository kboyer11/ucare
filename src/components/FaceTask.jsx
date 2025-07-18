import React, { useEffect, useState, useCallback, useMemo } from 'react';

const TASKS = [
  { gridSize: 3, trials: 12, maleTrials: 6, femaleTrials: 6 },
];

// Function to dynamically import all images from a folder
function importAll(r) {
  let images = {};
  r.keys().forEach((item, index) => {
    images[item.replace('./', '')] = r(item);
  });
  return Object.values(images);
}

// Function to shuffle an array
function shuffleArray(array) {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

function getRandomSubset(array, size) {
  return [...array].sort(() => Math.random() - 0.5).slice(0, size);
}

const FaceTask = ({ onSubmit }) => {
  const [taskStage, setTaskStage] = useState(0);
  const [trial, setTrial] = useState(0);
  const [grid, setGrid] = useState([]);
  const [completed, setCompleted] = useState(false);
  const [showCross, setShowCross] = useState(true);
  const [imagesLoaded, setImagesLoaded] = useState(false);
  const [results, setResults] = useState([]);
  const [currentGender, setCurrentGender] = useState('male'); // Track current gender for alternating
  const [maleTrialsCompleted, setMaleTrialsCompleted] = useState(0);
  const [femaleTrialsCompleted, setFemaleTrialsCompleted] = useState(0);

  const currentTask = TASKS[taskStage];
  const { gridSize, trials: maxTrials, maleTrials, femaleTrials } = currentTask;

  const rightMaleImagePaths = useMemo(() =>
    importAll(require.context('../assets/images/Rightmale', false, /\.(png|jpe?g|svg)$/)),
    []
  );
  const rightFemaleImagePaths = useMemo(() =>
    importAll(require.context('../assets/images/Rightfemale', false, /\.(png|jpe?g|svg)$/)),
    []
  );
  const wrongMaleImagePaths = useMemo(() =>
    importAll(require.context('../assets/images/Wrongmale', false, /\.(png|jpe?g|svg)$/)),
    []
  );
  const wrongFemaleImagePaths = useMemo(() =>
    importAll(require.context('../assets/images/Wrongfemale', false, /\.(png|jpe?g|svg)$/)),
    []
  );

  const preloadImage = (src) => {
    return new Promise((resolve, reject) => {
      const img = new Image();
      img.onload = () => resolve(src);
      img.onerror = reject;
      img.src = src;
    });
  };

  const generateNewGrid = useCallback(async () => {
    const totalCells = gridSize * gridSize;

    // Determine which gender to use for this trial
    let useGender;
    if (maleTrialsCompleted < maleTrials && femaleTrialsCompleted < femaleTrials) {
      // If we haven't completed all trials of either gender, alternate or choose randomly
      useGender = currentGender;
    } else if (maleTrialsCompleted < maleTrials) {
      // If we've completed all female trials but not male trials
      useGender = 'male';
    } else {
      // If we've completed all male trials but not female trials
      useGender = 'female';
    }

    // Select the appropriate image sets based on gender
    const wrongImageSet = useGender === 'male' ? wrongMaleImagePaths : wrongFemaleImagePaths;
    const rightImageSet = useGender === 'male' ? rightMaleImagePaths : rightFemaleImagePaths;

    // Create grid with wrong (non-happy) faces
    let newGrid = shuffleArray(wrongImageSet)
      .slice(0, totalCells)
      .map((src, i) => ({
        src,
        id: i + 1,
        isCorrect: false,
        gender: useGender
      }));

    // Replace one random position with a happy face (correct answer)
    const replacedIndex = Math.floor(Math.random() * totalCells);
    const happyFace = rightImageSet[Math.floor(Math.random() * rightImageSet.length)];

    newGrid[replacedIndex] = {
      src: happyFace,
      id: replacedIndex + 1,
      isCorrect: true,
      gender: useGender
    };

    setGrid(newGrid);
    setImagesLoaded(false);

    try {
      const imagePromises = newGrid.map(image => preloadImage(image.src));
      await Promise.all(imagePromises);
      setImagesLoaded(true);
    } catch (error) {
      console.error('Error loading images:', error);
      setImagesLoaded(true);
    }
  }, [gridSize, rightMaleImagePaths, rightFemaleImagePaths, wrongMaleImagePaths, wrongFemaleImagePaths, currentGender, maleTrialsCompleted, femaleTrialsCompleted, maleTrials, femaleTrials]);

  useEffect(() => {
    setShowCross(true);
    setImagesLoaded(false);
    generateNewGrid();
  }, [trial, taskStage, generateNewGrid]);

  useEffect(() => {
    if (imagesLoaded) {
      const timer = setTimeout(() => {
        setShowCross(false);
      }, 1000);
      return () => clearTimeout(timer);
    }
  }, [imagesLoaded]);

  const handleClick = (index) => {
    if (completed || showCross) return;

    const clickedImage = grid[index];
    const isCorrectClick = clickedImage?.isCorrect === true;
    const imageGender = clickedImage?.gender;

    const row = Math.floor(index / gridSize) + 1;
    const column = (index % gridSize) + 1;

    const result = {
      gridSize,
      trial: trial + 1,
      selectedRow: row,
      selectedColumn: column,
      correct: isCorrectClick ? 'Yes' : 'No',
      gender: imageGender
    };
    setResults((prev) => [...prev, result]);

    // Update gender-specific trial counters
    if (imageGender === 'male') {
      setMaleTrialsCompleted(prev => prev + 1);
      setCurrentGender('female'); // Switch to female for next trial
    } else {
      setFemaleTrialsCompleted(prev => prev + 1);
      setCurrentGender('male'); // Switch to male for next trial
    }

    const newTrial = trial + 1;
    if (newTrial >= maxTrials || (maleTrialsCompleted + femaleTrialsCompleted + 1) >= maxTrials) {
      setCompleted(true);
      const finalResults = [...results, result];
      onSubmit?.(finalResults);
    } else {
      setTrial(newTrial);
    }
  };

  const gridStyle = {
    display: 'grid',
    gap: `${5 - gridSize}vw`,
    width: '70vh',
    height: '70vh',
    gridTemplateColumns: `repeat(${gridSize}, 1fr)`,
    gridTemplateRows: `repeat(${gridSize}, 1fr)`,
    justifyContent: 'center',
    alignItems: 'center',
  };

  return (
    <div
      className="container"
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '90vh',
        width: '100vw',
        overflow: 'hidden',
        position: 'relative',
        backgroundColor: '#fff',
      }}
    >
      {showCross && (
        <div style={styles.crossContainer}>
          <div style={styles.cross}>+</div>
        </div>
      )}

      {!showCross && (
        <>
          {completed ? (
            <p
              id="completion-message"
              style={{
                fontFamily: 'Arial, sans-serif',
                fontSize: 18,
                marginBottom: 20,
              }}
            >
              Completed!
            </p>
          ) : (
            <div className="grid" style={gridStyle}>
              {grid.map((image, idx) => {
                const row = Math.floor(idx / gridSize) + 1;
                const column = (idx % gridSize) + 1;
                return (
                  <img
                    key={`${trial}-${image.id}`}
                    src={image.src}
                    className="grid-item"
                    data-id={image.id}
                    data-correct={image.isCorrect ? 'T' : 'F'}
                    data-re-aoi-name={`${row}-${column}-${image.gender}-${image.isCorrect ? 'happy' : 'neutral'}`}
                    alt="Game"
                    style={{
                      objectFit: 'cover',
                      cursor: 'pointer',
                      border: '2px solid transparent',
                      transition: '0.3s',
                      width: `calc(70vh / ${gridSize + 1})`,
                      height: `calc(70vh / ${gridSize + 1})`,
                    }}
                    onClick={() => handleClick(idx)}
                  />
                );
              })}
            </div>
          )}
        </>
      )}

      <style>{`
        .grid-item:hover {
          border-color: #3498db;
        }
      `}</style>
    </div>
  );
};

const styles = {
  crossContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 9999,
    backgroundColor: '#fff',
  },
  cross: {
    fontSize: '100px',
    fontWeight: 'bold',
    color: 'black',
  },
};

export default FaceTask;
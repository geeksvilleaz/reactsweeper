import React, { useEffect, useState } from 'react';
import useGame from '../../hooks/useGame';
import './Smiley.scss';

const FACES = {
  UP: 'up',
  DOWN: 'down',
  EXPLODED: 'exploded',
  WIN: 'win'
};

interface IProps {
  isGameOver: boolean;
  difficultyLevel: string;
  isGameWon: boolean;
}

const Smiley: React.FC<IProps> = ({ difficultyLevel, isGameOver, isGameWon }) => {
  const [face, setFace] = useState<string>(FACES.UP);

  const { initGameCB } = useGame();

  useEffect(() => {
    if (isGameOver && !isGameWon) {
      setFace(FACES.EXPLODED);
    } else if (isGameWon) {
      setFace(FACES.WIN);
    }
  }, [isGameOver, isGameWon]);

  const handleMouseDown = () => {
    setFace(FACES.DOWN);
  };

  const handleMouseUp = () => {
    setFace(FACES.UP);
    initGameCB(difficultyLevel);
  };

  return (
    <div 
      className={`smiley ${face}`} 
      onMouseDown={handleMouseDown}
      onMouseUp={handleMouseUp}
    />
  );
};

export default Smiley;

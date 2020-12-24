import React, { useState, useEffect } from 'react';
import useGame from '../../hooks/useGame';
import gameConst from '../../constants/gameConst';
import './Smiley.scss';

const STATES = {
  UP: 'up',
  DOWN: 'down',
  GAME_OVER: 'gameover',
  WIN: 'win'
};

interface IProps {
  isGameOver: boolean;
  isWon: boolean;
}

const Smiley: React.FC<IProps> = ({ isGameOver, isWon }) => {
  const [state, setState] = useState<string>(STATES.UP);

  const { initGameCB } = useGame();

  useEffect(() => {
    if (isWon) {
      setState(STATES.WIN);
    } else if (isGameOver) {
      setState(STATES.GAME_OVER);
    }
  }, [isGameOver, isWon]);
  
  const handleMouseDown = () => {
    setState(STATES.DOWN);
  };

  const handleMouseUp = () => {
    setState(STATES.UP);
    initGameCB();
  };

  return (
    <div 
      className={`smiley ${state}`} 
      onMouseDown={handleMouseDown} 
      onMouseUp={handleMouseUp}
    />
  );
};

export default Smiley;

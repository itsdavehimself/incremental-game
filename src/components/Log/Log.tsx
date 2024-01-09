import { GameState } from '../../App';
import styles from './Log.module.scss';
import { useEffect, useRef } from 'react';

interface LogProps {
  gameState: GameState;
}

const Log: React.FC<LogProps> = ({ gameState }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollToBottom = () => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  };
  useEffect(() => {
    scrollToBottom();
  }, [gameState.logMessages]);
  return (
    <div ref={containerRef} className={styles['log-container']}>
      {gameState.logMessages.map((message, index) => (
        <p key={index}>{message}</p>
      ))}
    </div>
  );
};

export default Log;

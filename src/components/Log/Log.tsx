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
    <div className={styles['log-container']}>
      <div className={styles['log-header']}>LOG</div>
      <div ref={containerRef} className={styles['log-messages']}>
        {gameState.logMessages.map((message, index) => (
          <p key={index}>{message.toUpperCase()}</p>
        ))}
      </div>
    </div>
  );
};

export default Log;

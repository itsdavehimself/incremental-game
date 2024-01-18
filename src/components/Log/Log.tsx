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

  const shouldHide = gameState.algorithms < 1;

  return (
    <div
      className={`${styles['log-container']} ${
        shouldHide ? styles['hidden'] : ''
      }`}
    >
      <div className={styles['log-header']}>
        <h5>LOG</h5>
        <div className={styles.square}></div>
      </div>
      <div ref={containerRef} className={styles['log-messages']}>
        <ul
          className={`${styles['log-list']} ${
            shouldHide ? styles['visible'] : ''
          }`}
        >
          {gameState.logMessages.map((message, index) => (
            <li key={index}>{message}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Log;

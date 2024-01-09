import { GameState } from '../../App';
import styles from './Log.module.scss';

interface LogProps {
  gameState: GameState;
}

const Log: React.FC<LogProps> = ({ gameState }) => {
  return (
    <div className={styles['log-container']}>
      {gameState.logMessages.map((message) => (
        <p>{message}</p>
      ))}
    </div>
  );
};

export default Log;

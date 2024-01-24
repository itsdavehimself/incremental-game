import styles from './GameOverModal.module.scss';
import resetGame from './GameOverModal.helpers';
import { GameState } from '../../types';

interface GameOverModalProps {
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

const GameOverModal: React.FC<GameOverModalProps> = ({ setGameState }) => {
  const handlePlayAgainClick = () => {
    const defaultGameState = resetGame();
    setGameState((prevGameState) => ({
      ...prevGameState,
      ...defaultGameState,
    }));
  };

  return (
    <div className={styles['game-over-modal']}>
      <div className={styles['game-over-message']}>
        <h2>DATA INTEGRATED: 1TB</h2>
        <p>Congratulations! You've reached the end of the game (for now).</p>
        <p>
          This project was developed as an experiment in TypeScript and Sass and
          I've had a blast creating it.
        </p>
        <p>
          I plan to expand the game and the lore over time and would love to
          hear from you!
        </p>
        <a href="https://forms.gle/eesju1KKNqSLET1c7" target="_blank">
          <button className={styles['game-over-button']}>
            LEAVE FEEDBACK{' '}
          </button>
        </a>
        <a
          href="https://github.com/itsdavehimself/incremental-game"
          target="_blank"
        >
          <button className={styles['game-over-button']}>
            GITHUB REPOSITORY
          </button>
        </a>
        <button
          onClick={handlePlayAgainClick}
          className={styles['game-over-button']}
        >
          PLAY AGAIN
        </button>

        <h3>Thanks for playing re:member.</h3>
      </div>
    </div>
  );
};

export default GameOverModal;

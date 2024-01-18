import styles from './GameOverModal.module.scss';

interface GameOverModalProps {}

const GameOverModal: React.FC<GameOverModalProps> = () => {
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
        <h3>Thanks for playing re:member.</h3>
      </div>
    </div>
  );
};

export default GameOverModal;

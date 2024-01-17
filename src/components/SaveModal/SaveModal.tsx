import styles from './SaveModal.module.scss';
import { saveGameState } from '../../helpers/saveGameHelpers';
import { handleLoadButtonClick } from '../../utility/utilityFunctions';
import { GameState } from '../../App';
import CloseIcon from '../icons/CloseIcon';
import { useState, useRef } from 'react';

interface SaveModalProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  setIsSaveModalShowing: React.Dispatch<React.SetStateAction<boolean>>;
}

const SaveModal: React.FC<SaveModalProps> = ({
  gameState,
  setGameState,
  setIsSaveModalShowing,
}) => {
  const [inputCode, setInputCode] = useState<string>('');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [copyButtonText, setCopyButtonText] = useState<string>('COPY CODE');
  const [isInvalidCodeShowing, setIsInvalidCodeShowing] = useState(false);
  const codeRef = useRef<HTMLPreElement>(null);

  const handleLoadInputChange = (
    event: React.ChangeEvent<HTMLTextAreaElement>,
  ) => {
    setInputCode(event.target.value);
  };

  const handleCopyClick = () => {
    if (codeRef.current) {
      navigator.clipboard.writeText(generatedCode);
      setCopyButtonText('COPIED');

      setTimeout(() => {
        setCopyButtonText('COPY CODE');
      }, 4000);
    }
  };

  return (
    <div className={styles['save-modal']}>
      {isInvalidCodeShowing && (
        <div className={styles.opaque}>
          <div className={styles['invalid-code']}>INVALID CODE</div>
        </div>
      )}
      <div className={styles['modal-nav']}>
        <button
          className={styles['close-modal']}
          onClick={() => setIsSaveModalShowing(false)}
        >
          <CloseIcon />
        </button>
      </div>
      <div className={styles['save-load-container']}>
        <div className={styles['save-container']}>
          <button
            className={styles['save-button']}
            onClick={() => saveGameState(gameState, setGeneratedCode)}
          >
            <div className={styles['btn-text']}>
              <h4>SAVE GAME</h4>
            </div>
          </button>
          <div className={styles['generated-container']}>
            <h3 className={styles['generated-header']}>
              GENERATED CODE{' '}
              <button
                className={styles['copy-button']}
                onClick={handleCopyClick}
              >
                {copyButtonText}
              </button>
            </h3>
            <p className={styles['generated-code']}>
              <code ref={codeRef}>{generatedCode}</code>
            </p>
          </div>
        </div>
        <div className={styles['load-container']}>
          <textarea
            value={inputCode}
            onChange={handleLoadInputChange}
            placeholder="Enter game state code here..."
            className={styles['load-input']}
          />
          <button
            onClick={() =>
              handleLoadButtonClick(
                inputCode,
                setGameState,
                setIsSaveModalShowing,
                setIsInvalidCodeShowing,
              )
            }
            className={styles['save-button']}
          >
            <div className={styles['btn-text']}>
              <h4>LOAD GAME</h4>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default SaveModal;

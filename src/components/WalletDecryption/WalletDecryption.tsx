import styles from './WalletDecryption.module.scss';
import { useState, useEffect } from 'react';
import { GameState } from '../../App';
import { BtnColors } from './walletHelpers';
import DecryptionButton from '../DecryptionButton/DecryptionButton';
import * as utilityFunctions from './walletUtilityFunctions';

interface WalletDecryptionProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  incrementWallets: (
    decrypted: boolean,
    setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  ) => void;
  receiveCognitumPrize: (
    prize: number,
    setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  ) => void;
  receiveMemoryShardsPrize: (
    prize: number,
    setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  ) => void;
}

const WalletDecryption: React.FC<WalletDecryptionProps> = ({
  gameState,
  setGameState,
  incrementWallets,
  receiveCognitumPrize,
  receiveMemoryShardsPrize,
}) => {
  const [gameSequence, setGameSequence] = useState<string[]>([]);
  const [playerSequence, setPlayerSequence] = useState<string[]>([]);
  const [btnColors, setBtnColors] = useState<BtnColors>(() => {
    const baseColors = {
      btnOne: {
        highlighted: false,
      },
      btnTwo: {
        highlighted: false,
      },
      btnThree: {
        highlighted: false,
      },
      btnFour: {
        highlighted: false,
      },
    };
    return baseColors;
  });

  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);
  const [isShowingSequence, setIsShowingSequence] = useState<boolean>(false);
  const [isShowingPrize, setIsShowingPrize] = useState(false);
  const [cognitumPrize, setCognitumPrize] = useState<number>(0);
  const [memoryShardsPrize, setMemoryShardsPrize] = useState<number>(0);
  const [isShowingSolution, setIsShowingSolution] = useState(false);

  const handleStartButtonClick = utilityFunctions.handleStartButtonClick;
  const handleDecryptionButtonClick =
    utilityFunctions.handleDecryptionButtonClick;
  const handleReplayButtonClick = utilityFunctions.handleReplayButtonClick;

  const ButtonMapping: Record<string, number> = {
    btnOne: 1,
    btnTwo: 2,
    btnThree: 3,
    btnFour: 4,
  };

  useEffect(() => {
    const checkSequence = () => {
      for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== gameSequence[i]) {
          setPlayerSequence([]);
          incrementWallets(false, setGameState);
          setIsGameRunning(false);
          return;
        }
      }

      if (
        playerSequence.length === gameSequence.length &&
        playerSequence.length > 0 &&
        !isShowingPrize
      ) {
        setIsShowingPrize(true);
        incrementWallets(true, setGameState);
        setPlayerSequence([]);
        receiveCognitumPrize(cognitumPrize, setGameState);
        receiveMemoryShardsPrize(memoryShardsPrize, setGameState);
        setTimeout(() => {
          setIsShowingPrize(false);
        }, 3000);
        setTimeout(() => {
          setIsGameRunning(false);
        }, 3500);
      }
    };

    checkSequence();
  }, [playerSequence]);

  return (
    <div>
      <h3>Dead Wallet Decryption</h3>
      <div> Wallets Decrypted: {gameState.walletsDecrypted}</div>
      <div> Wallets Bricked: {gameState.walletsBricked}</div>
      {gameState.walletsDecrypted >= 15 && (
        <div>
          Fractional Memory Shards:{' '}
          {gameState.fractionalMemoryShards.toFixed(1)}
        </div>
      )}
      <DecryptionButton
        onClick={() =>
          handleDecryptionButtonClick(
            'btnOne',
            isShowingSequence,
            isGameRunning,
            setPlayerSequence,
          )
        }
        className={btnColors.btnOne.highlighted ? styles.highlighted : ''}
      />{' '}
      <DecryptionButton
        onClick={() =>
          handleDecryptionButtonClick(
            'btnTwo',
            isShowingSequence,
            isGameRunning,
            setPlayerSequence,
          )
        }
        className={btnColors.btnTwo.highlighted ? styles.highlighted : ''}
      />{' '}
      <DecryptionButton
        onClick={() =>
          handleDecryptionButtonClick(
            'btnThree',
            isShowingSequence,
            isGameRunning,
            setPlayerSequence,
          )
        }
        className={btnColors.btnThree.highlighted ? styles.highlighted : ''}
      />{' '}
      <DecryptionButton
        onClick={() =>
          handleDecryptionButtonClick(
            'btnFour',
            isShowingSequence,
            isGameRunning,
            setPlayerSequence,
          )
        }
        className={btnColors.btnFour.highlighted ? styles.highlighted : ''}
      />{' '}
      <div>
        {isShowingSolution && gameState.walletDecryptionIndex === 3 && (
          <div>
            {gameSequence.map((btn, index) => (
              <span key={index}>{ButtonMapping[btn]} </span>
            ))}
          </div>
        )}
      </div>
      <div>
        <button
          onClick={() =>
            handleStartButtonClick(
              gameState,
              isGameRunning,
              setIsGameRunning,
              setIsShowingSolution,
              setCognitumPrize,
              setMemoryShardsPrize,
              setGameState,
              setGameSequence,
              setBtnColors,
              setIsShowingSequence,
              setPlayerSequence,
            )
          }
          disabled={
            gameState.walletDecryptionCost > gameState.nodesCurrent ||
            isGameRunning
          }
        >
          Start Decryption ({gameState.walletDecryptionCost.toLocaleString()}{' '}
          Nodes)
        </button>
      </div>
      {gameState.walletDecryptionIndex >= 2 && (
        <button
          onClick={() =>
            handleReplayButtonClick(
              gameState,
              gameSequence,
              setIsShowingSolution,
              setBtnColors,
              setIsShowingSequence,
            )
          }
          disabled={!isGameRunning}
        >
          Replay Sequence
        </button>
      )}
      {isShowingPrize && (
        <>
          <div>Recovered {cognitumPrize} cognitum</div>
          {gameState.walletsDecrypted > 14 && (
            <div>
              Recovered {memoryShardsPrize.toFixed(1)} fractional memory shards
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WalletDecryption;

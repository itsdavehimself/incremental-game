import styles from './WalletDecryption.module.scss';
import { useState, useEffect } from 'react';
import { GameState } from '../../App';
import * as walletHelpers from './walletHelpers';
import { BtnColors } from './walletHelpers';

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
  purchaseWalletDecryption: (
    setGameState: React.Dispatch<React.SetStateAction<GameState>>,
    gameState: GameState,
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
  purchaseWalletDecryption,
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

  const generatePrize = walletHelpers.generatePrize;
  const createSequence = walletHelpers.createSequence;
  const generateMemoryShards = walletHelpers.generateMemoryShards;
  const playSequence = walletHelpers.playSequence;
  const autoDecryption = walletHelpers.autoDecryption;

  const ButtonMapping: Record<string, number> = {
    btnOne: 1,
    btnTwo: 2,
    btnThree: 3,
    btnFour: 4,
  };

  const startRound = () => {
    if (isGameRunning) {
      return;
    }
    setIsGameRunning(true);
    setIsShowingSolution(false);
    setCognitumPrize(
      generatePrize(gameState.walletsDecrypted, gameState.walletsBricked),
    );
    if (gameState.walletsDecrypted > 14) {
      generateMemoryShards(gameState, setMemoryShardsPrize);
    }
    purchaseWalletDecryption(setGameState, gameState);
    const randomSequence = createSequence(gameState, setGameSequence);
    playSequence(
      true,
      randomSequence,
      setBtnColors,
      setIsShowingSequence,
      gameState,
      setIsShowingSolution,
    );
  };

  const handleButtonClick = (btnName: string) => {
    if (isShowingSequence || !isGameRunning) {
      return;
    }
    setPlayerSequence((prevSequence) => [...prevSequence, btnName]);
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
      <button
        onClick={() => handleButtonClick('btnOne')}
        className={`${styles['btn']} ${styles.white} ${
          btnColors.btnOne.highlighted ? styles.highlighted : ''
        }`}
      ></button>{' '}
      <button
        onClick={() => handleButtonClick('btnTwo')}
        className={`${styles['btn']} ${styles.white} ${
          btnColors.btnTwo.highlighted ? styles.highlighted : ''
        }`}
      ></button>{' '}
      <button
        onClick={() => handleButtonClick('btnThree')}
        className={`${styles['btn']} ${styles.white} ${
          btnColors.btnThree.highlighted ? styles.highlighted : ''
        }`}
      ></button>{' '}
      <button
        onClick={() => handleButtonClick('btnFour')}
        className={`${styles['btn']} ${styles.white} ${
          btnColors.btnFour.highlighted ? styles.highlighted : ''
        }`}
      ></button>{' '}
      <div>
        {gameState.walletDecryptionIndex === 3 && (
          <>
            {isShowingSolution && (
              <div>
                {gameSequence.map((btn, index) => (
                  <span key={index}>{ButtonMapping[btn]} </span>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <div>
        <button
          onClick={() => {
            if (gameState.walletDecryptionIndex >= 4) {
              autoDecryption(setPlayerSequence, gameState, setGameSequence);
            } else {
              startRound();
            }
          }}
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
            playSequence(
              false,
              gameSequence,
              setBtnColors,
              setIsShowingSequence,
              gameState,
              setIsShowingSolution,
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

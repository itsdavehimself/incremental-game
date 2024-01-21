import styles from './WalletDecryption.module.scss';
import { useState, useEffect } from 'react';
import { GameState } from '../../types';
import { BtnColors, logWinnings } from './WalletDecryption.helpers';
import DecryptionButton from '../../components/DecryptionButton/DecryptionButton';
import * as utilityFunctions from './WalletDecryption.utility';
import Button from '../../components/Button/Button';

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
        playerSequence.length > 0
      ) {
        incrementWallets(true, setGameState);
        setPlayerSequence([]);
        receiveCognitumPrize(cognitumPrize, setGameState);
        receiveMemoryShardsPrize(memoryShardsPrize, setGameState);
        logWinnings(cognitumPrize, memoryShardsPrize, gameState, setGameState);
        setIsGameRunning(false);
      }
    };

    checkSequence();
  }, [playerSequence]);

  return (
    <>
      <div className={styles['wallet-container']}>
        <div className={styles['wallet-header']}>
          <h3>DEAD WALLET DECRYPTION</h3>
          <div className={styles.square}></div>
        </div>
        <div className={styles['wallet-data']}>
          <div className={styles['data-block']}>
            <div className={styles.rectangle}></div>
            <div className={styles['data-pair']}>
              <h3>WALLETS DECRYPTED</h3>
              <p>{gameState.walletsDecrypted}</p>
            </div>
          </div>
          <div className={styles['data-block']}>
            <div className={styles.rectangle}></div>
            <div className={styles['data-pair']}>
              <h3>WALLETS BRICKED</h3>
              <p>{gameState.walletsBricked}</p>
            </div>
          </div>
          {gameState.walletsDecrypted >= 15 && (
            <div className={styles['data-block']}>
              <div className={styles.rectangle}></div>
              <div className={styles['data-pair']}>
                <h3>FRACTIONAL MEMORY SHARDS</h3>
                <p>{gameState.fractionalMemoryShards.toFixed(1)}</p>
              </div>
            </div>
          )}
        </div>
      </div>
      {gameState.walletDecryptionIndex === 3 && (
        <div className={styles['solution-container']}>
          {isShowingSolution && (
            <div className={styles['solution']}>
              {gameSequence.map((btn, index) => (
                <span key={index}>{ButtonMapping[btn]} </span>
              ))}
            </div>
          )}
        </div>
      )}
      <div className={styles['wallet-buttons']}>
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
        />
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
        />
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
        />
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
        />
      </div>
      <div className={styles['wallet-controls']}>
        <Button
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
          upgradeName="START DECRYPTION"
          upgradeCost={`${gameState.walletDecryptionCost.toLocaleString()} Nodes`}
          disabled={
            gameState.walletDecryptionCost > gameState.nodesCurrent ||
            isGameRunning
          }
        ></Button>
        {gameState.walletDecryptionIndex >= 2 && (
          <Button
            onClick={() =>
              handleReplayButtonClick(
                gameState,
                gameSequence,
                setIsShowingSolution,
                setBtnColors,
                setIsShowingSequence,
              )
            }
            upgradeName="REPLAY SEQUENCE"
            upgradeCost=""
            disabled={!isGameRunning || isShowingSequence}
          ></Button>
        )}
      </div>
    </>
  );
};

export default WalletDecryption;

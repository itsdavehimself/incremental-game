import styles from './WalletDecryption.module.scss';
import { useState, useEffect } from 'react';

interface WalletDecryptionProps {
  gameState: {
    nodesCurrent: number;
    walletsDecrypted: number;
    walletsBricked: number;
    walletDecryptionCost: number;
    walletDecryptionIndex: number;
    fractionalMemoryShards: number;
    memoryShardsProbability: number;
  };
  incrementWallets: (decrypted: boolean) => void;
  receiveCognitumPrize: (prize: number) => void;
  receiveMemoryShardsPrize: (prize: number) => void;
  purchaseWalletDecryption: () => void;
}

interface BtnInfo {
  highlighted: boolean;
}

interface BtnColors {
  [key: string]: BtnInfo;
  btnOne: BtnInfo;
  btnTwo: BtnInfo;
  btnThree: BtnInfo;
  btnFour: BtnInfo;
}

const WalletDecryption: React.FC<WalletDecryptionProps> = ({
  gameState,
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

  const createSequence = () => {
    const btns = ['btnOne', 'btnTwo', 'btnThree', 'btnFour'];
    const randomSequence = Array.from(
      { length: Math.floor(4 + gameState.walletsDecrypted / 3) },
      () => btns[Math.floor(Math.random() * btns.length)],
    );
    setGameSequence([...randomSequence]);
  };

  const generatePrize = (decrypted: number, bricked: number) => {
    const randomInteger = Math.floor(Math.random() * (31 + decrypted / 1.3));

    const basePrize = randomInteger + 10 + decrypted / 2;

    const brickPenalty = bricked;

    const finalPrize = Math.ceil(Math.max(1, basePrize - brickPenalty));

    return finalPrize;
  };

  const calculateMemoryShards = (decrypted: number) => {
    const baseShardsAmount = Math.round((Math.random() * decrypted) / 3) / 10;
    const shardsPrize =
      Math.round((baseShardsAmount + decrypted / 45) * 10) / 10;
    setMemoryShardsPrize(shardsPrize);

    return shardsPrize;
  };

  const generateMemoryShards = () => {
    const randomNumber = Math.random();
    if (randomNumber < gameState.memoryShardsProbability) {
      calculateMemoryShards(gameState.walletsDecrypted);
    } else {
      return;
    }
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
      generateMemoryShards();
    }
    purchaseWalletDecryption();
    createSequence();
  };

  const handleButtonClick = (btnName: string) => {
    if (isShowingSequence || !isGameRunning) {
      return;
    }
    setPlayerSequence((prevSequence) => [...prevSequence, btnName]);
  };

  const ButtonMapping: Record<string, number> = {
    btnOne: 1,
    btnTwo: 2,
    btnThree: 3,
    btnFour: 4,
  };

  const showSolution = () => {
    setIsShowingSolution(true);
    setTimeout(
      () => setIsShowingSolution(false),
      350 * gameState.walletsDecrypted,
    );
  };

  const autoDecryption = (sequence: Array<string>) => {
    setTimeout(() => setPlayerSequence(sequence), 2000);
  };

  const playSequence = (shouldShowSolution: boolean = true) => {
    setIsShowingSequence(true);

    let i = 0;
    const interval = setInterval(() => {
      const currentButton = gameSequence[i];

      setBtnColors((prevColors) => {
        const updatedColors: BtnColors = {
          ...prevColors,
          [currentButton]: {
            highlighted: true,
          },
        };
        return updatedColors;
      });

      setTimeout(() => {
        setBtnColors((prevColors) => {
          const updatedColors: BtnColors = {
            ...prevColors,
            [currentButton]: {
              highlighted: false,
            },
          };
          return updatedColors;
        });
      }, 500);

      i++;
      if (i >= gameSequence.length) {
        setTimeout(() => {
          clearInterval(interval);
          setIsShowingSequence(false);
          if (shouldShowSolution) {
            showSolution();
          }
          if (gameState.walletDecryptionIndex >= 4) {
            autoDecryption(gameSequence);
          }
        }, 1000);
      }
    }, 1000);
  };

  useEffect(() => {
    const checkSequence = () => {
      for (let i = 0; i < playerSequence.length; i++) {
        if (playerSequence[i] !== gameSequence[i]) {
          setPlayerSequence([]);
          incrementWallets(false);
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
        incrementWallets(true);
        console.log('yo this is triggering me');
        setPlayerSequence([]);
        receiveCognitumPrize(cognitumPrize);
        receiveMemoryShardsPrize(memoryShardsPrize);
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

  useEffect(() => {
    if (isGameRunning) {
      playSequence();
    }
  }, [gameSequence, isGameRunning]);

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
          onClick={startRound}
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
        <button onClick={() => playSequence(false)}>Replay Sequence</button>
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

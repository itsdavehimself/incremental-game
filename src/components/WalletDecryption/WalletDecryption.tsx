import styles from './WalletDecryption.module.scss';
import { useState, useEffect } from 'react';

interface WalletDecryptionProps {
  gameState: {
    nodesCurrent: number;
    walletsDecrypted: number;
    walletsBricked: number;
    walletDecryptionCost: number;
    walletDecryptionIndex: number;
  };
  incrementWallets: (decrypted: boolean) => void;
  receiveCognitumPrize: (prize: number) => void;
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

  const startRound = () => {
    if (isGameRunning) {
      return;
    }
    setIsGameRunning(true);
    setCognitumPrize(
      generatePrize(gameState.walletsDecrypted, gameState.walletsBricked),
    );
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
      500 * gameState.walletsDecrypted,
    );
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
        playerSequence.length > 0
      ) {
        setIsShowingPrize(true);
        incrementWallets(true);
        setPlayerSequence([]);
        receiveCognitumPrize(cognitumPrize);
        setIsGameRunning(false);
        setTimeout(() => setIsShowingPrize(false), 3000);
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
        {gameState.walletDecryptionIndex >= 3 && (
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
          disabled={gameState.walletDecryptionCost > gameState.nodesCurrent}
        >
          Start Decryption ({gameState.walletDecryptionCost.toLocaleString()}{' '}
          Nodes)
        </button>
      </div>
      {gameState.walletDecryptionIndex >= 2 && (
        <button onClick={() => playSequence(false)}>Replay Sequence</button>
      )}
      {isShowingPrize && <div>Recovered {cognitumPrize} cognitum</div>}
    </div>
  );
};

export default WalletDecryption;

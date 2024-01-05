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
  color: string;
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
        color: 'white',
        highlighted: false,
      },
      btnTwo: {
        color: 'white',
        highlighted: false,
      },
      btnThree: {
        color: 'white',
        highlighted: false,
      },
      btnFour: {
        color: 'white',
        highlighted: false,
      },
    };

    if (gameState.walletDecryptionIndex === 2) {
      baseColors.btnOne.color = 'purple';
      baseColors.btnTwo.color = 'yellow';
      baseColors.btnThree.color = 'blue';
      baseColors.btnFour.color = 'pink';
    }

    return baseColors;
  });

  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);
  const [isShowingSequence, setIsShowingSequence] = useState<boolean>(false);
  const [isShowingPrize, setIsShowingPrize] = useState(false);
  const [cognitumPrize, setCognitumPrize] = useState<number>(0);

  const createSequence = () => {
    const btns = ['btnOne', 'btnTwo', 'btnThree', 'btnFour'];
    const randomSequence = Array.from(
      { length: Math.floor(4 + gameState.walletsDecrypted / 3) },
      () => btns[Math.floor(Math.random() * btns.length)],
    );
    setGameSequence([...randomSequence]);
  };

  const generatePrize = (decrypted: number, bricked: number) => {
    const randomInteger = Math.floor(Math.random() * (21 + decrypted / 2));

    const basePrize = randomInteger + 5;

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
    const playSequence = () => {
      setIsShowingSequence(true);

      let i = 0;
      const interval = setInterval(() => {
        const currentButton = gameSequence[i];

        setBtnColors((prevColors) => {
          const updatedColors: BtnColors = {
            ...prevColors,
            [currentButton]: {
              ...prevColors[currentButton],
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
                ...prevColors[currentButton],
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
          }, 1000);
        }
      }, 1000);
    };

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
        className={`${styles['btn']} ${styles[`${btnColors.btnOne.color}`]} ${
          btnColors.btnOne.highlighted ? styles.highlighted : ''
        }`}
      ></button>{' '}
      <button
        onClick={() => handleButtonClick('btnTwo')}
        className={`${styles['btn']} ${styles[`${btnColors.btnTwo.color}`]} ${
          btnColors.btnTwo.highlighted ? styles.highlighted : ''
        }`}
      ></button>{' '}
      <button
        onClick={() => handleButtonClick('btnThree')}
        className={`${styles['btn']} ${styles[`${btnColors.btnThree.color}`]} ${
          btnColors.btnThree.highlighted ? styles.highlighted : ''
        }`}
      ></button>{' '}
      <button
        onClick={() => handleButtonClick('btnFour')}
        className={`${styles['btn']} ${styles[`${btnColors.btnFour.color}`]} ${
          btnColors.btnFour.highlighted ? styles.highlighted : ''
        }`}
      ></button>{' '}
      <div>
        <button
          onClick={startRound}
          disabled={gameState.walletDecryptionCost > gameState.nodesCurrent}
        >
          Start Decryption ({gameState.walletDecryptionCost.toLocaleString()}{' '}
          Nodes)
        </button>
      </div>
      {isShowingPrize && <div>Recovered {cognitumPrize} cognitum</div>}
    </div>
  );
};

export default WalletDecryption;

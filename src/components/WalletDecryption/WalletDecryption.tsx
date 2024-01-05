import styles from './WalletDecryption.module.scss';
import { useState, useEffect } from 'react';

interface WalletDecryptionProps {
  gameState: {
    walletsDecrypted: number;
    walletsBricked: number;
  };
  incrementWallets: (decrypted: boolean) => void;
  receiveCognitumPrize: (prize: number) => void;
}

interface BtnColors {
  btnOne: string;
  btnTwo: string;
  btnThree: string;
  btnFour: string;
}

const WalletDecryption: React.FC<WalletDecryptionProps> = ({
  gameState,
  incrementWallets,
  receiveCognitumPrize,
}) => {
  const [gameSequence, setGameSequence] = useState<string[]>([]);
  const [playerSequence, setPlayerSequence] = useState<string[]>([]);
  const [btnColors, setBtnColors] = useState<BtnColors>({
    btnOne: 'white',
    btnTwo: 'white',
    btnThree: 'white',
    btnFour: 'white',
  });
  const [isGameRunning, setIsGameRunning] = useState<boolean>(false);
  const [isShowingSequence, setIsShowingSequence] = useState<boolean>(false);
  const [cognitumPrize, setCognitumPrize] = useState<number>(0);

  const createSequence = () => {
    const btns = ['btnOne', 'btnTwo', 'btnThree', 'btnFour'];
    const randomSequence = Array.from(
      { length: Math.floor(4 + gameState.walletsDecrypted / 3) },
      () => btns[Math.floor(Math.random() * btns.length)],
    );
    console.log(randomSequence);
    setGameSequence([...randomSequence]);
  };

  const generatePrize = (decrypted: number, bricked: number) => {
    const basePrize = Math.floor(Math.random() * 5);

    const decryptionBonus = 1 + decrypted;

    const brickPenalty = bricked / 7;

    const finalPrize = Math.ceil(
      Math.max(1, basePrize + decryptionBonus - brickPenalty),
    );

    return finalPrize;
  };

  const startRound = () => {
    setIsGameRunning(true);
    setCognitumPrize(
      generatePrize(gameState.walletsDecrypted, gameState.walletsBricked),
    );
    createSequence();
  };

  const showSequence = (btn: string) => {
    console.log(btn);
  };

  const handleButtonClick = (btnName: string) => {
    if (isShowingSequence || !isGameRunning) {
      return;
    }
    setPlayerSequence((prevSequence) => [...prevSequence, btnName]);
    console.log(btnName);
    console.log(playerSequence);
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
        incrementWallets(true);
        setPlayerSequence([]);
        receiveCognitumPrize(cognitumPrize);
        setIsGameRunning(false);
      }
    };

    checkSequence();
  }, [playerSequence]);

  useEffect(() => {
    const playSequence = () => {
      setIsShowingSequence(true);

      let i = 0;
      const interval = setInterval(() => {
        showSequence(gameSequence[i]);
        i++;
        if (i >= gameSequence.length) {
          clearInterval(interval);
          setIsShowingSequence(false);
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
        className={`${styles['btn']} ${styles[`${btnColors.btnOne}`]}`}
      ></button>{' '}
      <button
        onClick={() => handleButtonClick('btnTwo')}
        className={`${styles['btn']} ${styles[`${btnColors.btnTwo}`]}`}
      ></button>{' '}
      <button
        onClick={() => handleButtonClick('btnThree')}
        className={`${styles['btn']} ${styles[`${btnColors.btnThree}`]}`}
      ></button>{' '}
      <button
        onClick={() => handleButtonClick('btnFour')}
        className={`${styles['btn']} ${styles[`${btnColors.btnFour}`]}`}
      ></button>{' '}
      <div>
        <button onClick={startRound}>Start Decryption</button>
      </div>
    </div>
  );
};

export default WalletDecryption;

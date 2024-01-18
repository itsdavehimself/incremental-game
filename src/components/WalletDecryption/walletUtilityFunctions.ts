import { GameState } from '../../App';
import { BtnColors } from './walletHelpers';
import {
  createSequence,
  generatePrize,
  generateMemoryShards,
  playSequence,
  autoDecryption,
} from './walletHelpers';
import { purchaseWalletDecryption } from '../../helpers/walletDecryptionHelpers';

const startRound = (
  gameState: GameState,
  isGameRunning: boolean,
  setIsGameRunning: React.Dispatch<React.SetStateAction<boolean>>,
  setIsShowingSolution: React.Dispatch<React.SetStateAction<boolean>>,
  setCognitumPrize: React.Dispatch<React.SetStateAction<number>>,
  setMemoryShardsPrize: React.Dispatch<React.SetStateAction<number>>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  setGameSequence: React.Dispatch<React.SetStateAction<string[]>>,
  setBtnColors: React.Dispatch<React.SetStateAction<BtnColors>>,
  setIsShowingSequence: React.Dispatch<React.SetStateAction<boolean>>,
) => {
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

const handleStartButtonClick = (
  gameState: GameState,
  isGameRunning: boolean,
  setIsGameRunning: React.Dispatch<React.SetStateAction<boolean>>,
  setIsShowingSolution: React.Dispatch<React.SetStateAction<boolean>>,
  setCognitumPrize: React.Dispatch<React.SetStateAction<number>>,
  setMemoryShardsPrize: React.Dispatch<React.SetStateAction<number>>,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  setGameSequence: React.Dispatch<React.SetStateAction<string[]>>,
  setBtnColors: React.Dispatch<React.SetStateAction<BtnColors>>,
  setIsShowingSequence: React.Dispatch<React.SetStateAction<boolean>>,
  setPlayerSequence: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  if (gameState.walletDecryptionIndex >= 4) {
    setIsGameRunning(true);
    setCognitumPrize(
      generatePrize(gameState.walletsDecrypted, gameState.walletsBricked),
    );
    if (gameState.walletsDecrypted > 14) {
      generateMemoryShards(gameState, setMemoryShardsPrize);
    }
    autoDecryption(setPlayerSequence, gameState, setGameSequence);
  } else {
    startRound(
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
    );
  }
};

const handleDecryptionButtonClick = (
  btnName: string,
  isShowingSequence: boolean,
  isGameRunning: boolean,
  setPlayerSequence: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  if (isShowingSequence || !isGameRunning) {
    return;
  }
  setPlayerSequence((prevSequence) => [...prevSequence, btnName]);
};

const handleReplayButtonClick = (
  gameState: GameState,
  gameSequence: string[],
  setIsShowingSolution: React.Dispatch<React.SetStateAction<boolean>>,
  setBtnColors: React.Dispatch<React.SetStateAction<BtnColors>>,
  setIsShowingSequence: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  playSequence(
    false,
    gameSequence,
    setBtnColors,
    setIsShowingSequence,
    gameState,
    setIsShowingSolution,
  );
};

export {
  startRound,
  handleStartButtonClick,
  handleDecryptionButtonClick,
  handleReplayButtonClick,
};

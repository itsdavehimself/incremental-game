import { GameState } from '../../App';

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

const generatePrize = (decrypted: number, bricked: number) => {
  const randomInteger = Math.floor(Math.random() * (31 + decrypted / 1.3));

  const basePrize = randomInteger + 10 + decrypted / 2;

  const brickPenalty = bricked;

  const finalPrize = Math.ceil(Math.max(1, basePrize - brickPenalty));

  return finalPrize;
};

const createSequence = (
  gameState: GameState,
  setGameSequence: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  const btns = ['btnOne', 'btnTwo', 'btnThree', 'btnFour'];
  const randomSequence = Array.from(
    { length: Math.floor(4 + gameState.walletsDecrypted / 3) },
    () => btns[Math.floor(Math.random() * btns.length)],
  );
  setGameSequence([...randomSequence]);
  return randomSequence;
};

const calculateMemoryShards = (
  decrypted: number,
  setMemoryShardsPrize: React.Dispatch<React.SetStateAction<number>>,
) => {
  const baseShardsAmount = Math.round((Math.random() * decrypted) / 3) / 10;
  const shardsPrize = Math.round((baseShardsAmount + decrypted / 45) * 10) / 10;
  setMemoryShardsPrize(shardsPrize);

  return shardsPrize;
};

const generateMemoryShards = (
  gameState: GameState,
  setMemoryShardsPrize: React.Dispatch<React.SetStateAction<number>>,
) => {
  const randomNumber = Math.random();
  if (randomNumber < gameState.memoryShardsProbability) {
    calculateMemoryShards(gameState.walletsDecrypted, setMemoryShardsPrize);
  } else {
    return;
  }
};

const showSolution = (
  gameState: GameState,
  setIsShowingSolution: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setIsShowingSolution(true);
  setTimeout(
    () => setIsShowingSolution(false),
    350 * gameState.walletsDecrypted,
  );
};

const updateButtonColors = (
  currentButton: string,
  highlighted: boolean,
  setBtnColors: React.Dispatch<React.SetStateAction<BtnColors>>,
) => {
  setBtnColors((prevColors) => {
    const updatedColors: BtnColors = {
      ...prevColors,
      [currentButton]: {
        highlighted,
      },
    };
    return updatedColors;
  });
};

const playSequence = (
  shouldShowSolution: boolean = true,
  gameSequence: string[],
  setBtnColors: React.Dispatch<React.SetStateAction<BtnColors>>,
  setIsShowingSequence: React.Dispatch<React.SetStateAction<boolean>>,
  gameState: GameState,
  setIsShowingSolution: React.Dispatch<React.SetStateAction<boolean>>,
) => {
  setIsShowingSequence(true);

  let i = 0;
  const interval = setInterval(() => {
    const currentButton = gameSequence[i];

    updateButtonColors(currentButton, true, setBtnColors);

    setTimeout(() => {
      updateButtonColors(currentButton, false, setBtnColors);
      i += 1;
      if (i >= gameSequence.length) {
        clearInterval(interval);
        setIsShowingSequence(false);

        if (shouldShowSolution) {
          showSolution(gameState, setIsShowingSolution);
        }
      }
    }, 500);
  }, 1000);
};

const autoDecryption = (
  setPlayerSequence: React.Dispatch<React.SetStateAction<string[]>>,
  gameState: GameState,
  setGameSequence: React.Dispatch<React.SetStateAction<string[]>>,
) => {
  setTimeout(
    () => setPlayerSequence(createSequence(gameState, setGameSequence)),
    2000,
  );
};

const logWinnings = (
  cognitumWinnings: number,
  memoryShardsWinnings: number,
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
) => {
  setGameState((prevGameState) => {
    if (gameState.walletsDecrypted > 14) {
      return {
        ...prevGameState,
        logMessages: [
          ...prevGameState.logMessages,
          `Wallet Decryption Successful: ${cognitumWinnings} cognitum & ${memoryShardsWinnings} memory shards recovered`,
        ],
      };
    } else {
      return {
        ...prevGameState,
        logMessages: [
          ...prevGameState.logMessages,
          `Wallet Decryption Successful: ${cognitumWinnings} Cognitum Recovered`,
        ],
      };
    }
  });
};

export {
  generatePrize,
  createSequence,
  calculateMemoryShards,
  generateMemoryShards,
  showSolution,
  updateButtonColors,
  playSequence,
  autoDecryption,
  logWinnings,
};

export type { BtnColors };

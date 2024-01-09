import { GameState } from '../App';

const createFileLogMessages = (
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
) => {
  setGameState((prevGameState) => {
    return {
      ...prevGameState,
      logMessages: [
        ...prevGameState.logMessages,
        'New files revealed in explorer',
      ],
    };
  });
};

const checkDecryptedFileMilestones = (
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  gameState: GameState,
) => {
  setGameState((prevGameState) => {
    const currentTotalData = prevGameState.totalData;

    if (currentTotalData > 1024 * 15 && !prevGameState.filesActivated) {
      createFileLogMessages(setGameState);
      return {
        ...prevGameState,
        filesActivated: true,
        filesIndex: 1,
      };
    }

    if (
      currentTotalData >= gameState.filesMilestones[prevGameState.filesIndex]
    ) {
      return {
        ...prevGameState,
        filesIndex: prevGameState.filesIndex + 1,
      };
    } else {
      return {
        ...prevGameState,
      };
    }
  });
};

export { checkDecryptedFileMilestones };

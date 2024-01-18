import { Config, GameState } from '../types';
import { formatData, formatTimeElapsed } from './formatHelpers';
import { failedReplenishment } from './networkHelpers';

const calculateProcessingCoreProduction = (
  state: GameState,
  config: Config,
) => {
  return (
    config.processingCoreProductionBase *
    state.algorithms *
    state.algorithmMultiplier *
    (state.executables === 0
      ? 1
      : Math.log(1 + state.executables * 0.75 + 1) *
        5 *
        state.executablesMultiplier)
  );
};

const calculateDataProduction = (state: GameState, config: Config) => {
  return (
    config.dataProductionBase *
    state.algorithms *
    state.algorithmMultiplier *
    (state.executables === 0
      ? 1
      : Math.log(1 + state.executables * 0.75 + 1) *
        5 *
        state.executablesMultiplier)
  );
};

const calculateIntegrationBandwidth = (state: GameState) => {
  return Math.max(
    state.integrationBandwidth - state.integrationSpeed / 2000,
    0,
  );
};

const calculateNewDataTotal = (state: GameState, config: Config) => {
  return state.totalData + calculateDataProduction(state, config);
};

const handleIntegrationBandwidth = (state: GameState) => {
  const addBandwidth =
    state.integrationBandwidth + 750 * state.bandwidthMultiplier;

  if (state.autoBandwidthReplenishment) {
    return {
      ...state,
      integrationBandwidth: addBandwidth,
    };
  }

  if (state.processingCores >= 50) {
    return {
      ...state,
      integrationBandwidth: addBandwidth,
    };
  }

  return state;
};

const incrementTime = (
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
) => {
  setGameState((prevGameState) => {
    return {
      ...prevGameState,
      timeElapsed: prevGameState.timeElapsed + 0.01,
    };
  });
};

const createDataMilestoneLogMessage = (
  dataMilestone: number,
  timeElapsed: number,
) => {
  const dataString = formatData(dataMilestone);

  const removeTrailingZeros = (dataString: string) => {
    const formattedData = dataString.replace(/\.\d{2}\s/g, ' ');

    return formattedData;
  };

  const formattedTime = formatTimeElapsed(timeElapsed);

  const logMessage = `${removeTrailingZeros(
    dataString,
  )} of data integrated in ${formattedTime}`;

  return logMessage;
};

const checkDataMilestones = (
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
) => {
  setGameState((prevGameState) => {
    const currentTotalData = prevGameState.totalData;
    if (
      currentTotalData >=
      gameState.dataMilestones[prevGameState.dataMilestonesIndex]
    ) {
      const dataMilestone =
        gameState.dataMilestones[prevGameState.dataMilestonesIndex];

      const timeElapsed = gameState.timeElapsed;

      const message = createDataMilestoneLogMessage(dataMilestone, timeElapsed);

      return {
        ...prevGameState,
        dataMilestonesIndex: prevGameState.dataMilestonesIndex + 1,
        logMessages: [...prevGameState.logMessages, message],
      };
    }
    return prevGameState;
  });
};

const checkIfUnableToPurchaseBandwidth = (
  gameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
) => {
  setGameState((prevGameState) => {
    if (
      gameState.integrationBandwidth === 0 &&
      gameState.bandwidthReplenishmentCost > gameState.processingCores &&
      !prevGameState.replenishmentFailed
    ) {
      failedReplenishment(setGameState);
      return prevGameState;
    }
    return prevGameState;
  });
};

const addFirstAlgorithm = (
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
) => {
  setGameState((prevGameState) => {
    return {
      ...prevGameState,
      algorithms: 1,
      logMessages: [
        ...prevGameState.logMessages,
        'First integration algorithm synthesized. Data integration becomes automatic.',
      ],
    };
  });
};

const manualDataIncrementing = (
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
) => {
  setGameState((prevGameState) => {
    const randomNumber = Math.random() * 8.36;

    return {
      ...prevGameState,
      totalData: prevGameState.totalData + randomNumber,
    };
  });
};

const revealOpeningLogMessages = (
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
) => {
  setGameState((prevGameState) => {
    return {
      ...prevGameState,
      logMessages: [
        ...prevGameState.logMessages,
        'In this ocean of data, reflecting back is genesis...',
      ],
    };
  });
};

export {
  calculateProcessingCoreProduction,
  calculateDataProduction,
  calculateIntegrationBandwidth,
  calculateNewDataTotal,
  handleIntegrationBandwidth,
  incrementTime,
  checkDataMilestones,
  checkIfUnableToPurchaseBandwidth,
  addFirstAlgorithm,
  manualDataIncrementing,
  revealOpeningLogMessages,
};

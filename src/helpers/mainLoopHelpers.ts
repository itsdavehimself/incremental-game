import { Config, GameState } from '../App';

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

export {
  calculateProcessingCoreProduction,
  calculateDataProduction,
  calculateIntegrationBandwidth,
  calculateNewDataTotal,
  handleIntegrationBandwidth,
  incrementTime,
};

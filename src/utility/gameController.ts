import { Config, GameState } from '../App';
import * as mainLoopHelpers from '../helpers/mainLoopHelpers';
import * as networkHelpers from '../helpers/networkHelpers';
import * as decryptedFilesHelper from '../helpers/decryptedFilesHelper';

const {
  calculateProcessingCoreProduction,
  calculateDataProduction,
  calculateIntegrationBandwidth,
  calculateNewDataTotal,
  handleIntegrationBandwidth,
  incrementTime,
  checkDataMilestones,
  checkIfUnableToPurchaseBandwidth,
} = mainLoopHelpers;

const { incrementActiveNodes, incrementCognitum, checkNetworkMilestones } =
  networkHelpers;

const { checkDecryptedFileMilestones } = decryptedFilesHelper;

const updateGameState = (
  prevGameState: GameState,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  config: Config,
) => {
  incrementTime(setGameState);
  checkIfUnableToPurchaseBandwidth(prevGameState, setGameState);
  incrementActiveNodes(setGameState);
  incrementCognitum(setGameState);
  checkDecryptedFileMilestones(setGameState, prevGameState);
  checkDataMilestones(prevGameState, setGameState);

  if (prevGameState.integrationBandwidth > 0) {
    const processingCoreProductionTotal = calculateProcessingCoreProduction(
      prevGameState,
      config,
    );
    const newProcessingCoresTotal =
      prevGameState.processingCores + processingCoreProductionTotal;

    const dataProductionTotal = calculateDataProduction(prevGameState, config);
    const newDataTotal = calculateNewDataTotal(prevGameState, config);

    const integrationBandwidthTotal =
      calculateIntegrationBandwidth(prevGameState);

    checkNetworkMilestones(setGameState, prevGameState);

    return {
      ...prevGameState,
      totalData: newDataTotal,
      processingCores: newProcessingCoresTotal,
      integrationSpeed: dataProductionTotal,
      integrationBandwidth: integrationBandwidthTotal,
    };
  } else if (
    prevGameState.autoBandwidthReplenishment &&
    prevGameState.integrationBandwidth < 1
  ) {
    return handleIntegrationBandwidth(prevGameState);
  }

  return { ...prevGameState };
};

export { updateGameState };

import { getUpgradeCost } from './costHelpers';
import { CostBreakdown } from '../data/upgrades';
import { Config, GameState } from '../types';
import { newAlgorithmCost } from './costHelpers';

const upgradeIntegrationAlgorithm = (
  multiplierPercentage: number | null,
  costs: CostBreakdown[],
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
) => {
  setGameState((prevGameState) => {
    const updatedMultiplier =
      multiplierPercentage !== null
        ? prevGameState.algorithmMultiplier * (1 + multiplierPercentage)
        : prevGameState.algorithmMultiplier;

    const updatedNodes =
      prevGameState.nodesCurrent - getUpgradeCost('Nodes', costs);
    const updatedCognitum =
      prevGameState.cognitum - getUpgradeCost('Cognitum', costs);
    const updatedProcessingCores =
      prevGameState.processingCores - getUpgradeCost('Processing Cores', costs);

    return {
      ...prevGameState,
      algorithmMultiplier: updatedMultiplier,
      nodesCurrent: updatedNodes,
      cognitum: updatedCognitum,
      integrationAlgorithmIndex: prevGameState.integrationAlgorithmIndex + 1,
      processingCores: updatedProcessingCores,
    };
  });
};

const synthesizeAlgorithm = (
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  config: Config,
) => {
  setGameState((prevGameState) => {
    if (prevGameState.processingCores >= prevGameState.algorithmCost) {
      return {
        ...prevGameState,
        algorithms: prevGameState.algorithms + 1,
        processingCores:
          prevGameState.processingCores - prevGameState.algorithmCost,
        algorithmCost: newAlgorithmCost(prevGameState.algorithms + 1, config),
      };
    } else {
      return {
        ...prevGameState,
      };
    }
  });
};

export { upgradeIntegrationAlgorithm, synthesizeAlgorithm };

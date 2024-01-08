import { getUpgradeCost } from './costHelpers';
import { CostBreakdown } from '../data/upgrades';
import { Config, GameState } from '../App';

const upgradeBandwidthReplenishment = (
  multiplierPercentage: number | null,
  costs: CostBreakdown[],
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
) => {
  setGameState((prevGameState) => {
    const updatedMultiplier =
      multiplierPercentage !== null
        ? prevGameState.bandwidthMultiplier * (1 + multiplierPercentage)
        : prevGameState.bandwidthMultiplier;

    const updatedNodes =
      prevGameState.nodesCurrent - getUpgradeCost('Nodes', costs);
    const updatedCognitum =
      prevGameState.cognitum - getUpgradeCost('Cognitum', costs);

    return {
      ...prevGameState,
      bandwidthMultiplier: updatedMultiplier,
      nodesCurrent: updatedNodes,
      cognitum: updatedCognitum,
      bandwidthIndex: prevGameState.bandwidthIndex + 1,
      autoBandwidthReplenishment: multiplierPercentage === null,
    };
  });
};

const replenishBandwidth = (
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  config: Config,
) => {
  setGameState((prevGameState) => {
    const addBandwidth =
      prevGameState.integrationBandwidth +
      750 * prevGameState.bandwidthMultiplier;
    if (prevGameState.processingCores >= config.bandwidthReplenishmentCost) {
      return {
        ...prevGameState,
        integrationBandwidth: addBandwidth,
        processingCores:
          prevGameState.processingCores - config.bandwidthReplenishmentCost,
      };
    } else {
      return {
        ...prevGameState,
      };
    }
  });
};

export { upgradeBandwidthReplenishment, replenishBandwidth };

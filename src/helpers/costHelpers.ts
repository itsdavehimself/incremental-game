import { CostBreakdown } from '../data/upgrades';
import { Config } from '../App';
import { GameState } from '../App';

const getUpgradeCost = (currency: string, costs: CostBreakdown[]) => {
  const costObject = costs.find((cost) => cost.currency === currency);
  return costObject ? costObject.amount : 0;
};

const newAlgorithmCost = (currentNumberAlgorithms: number, config: Config) => {
  const newCost =
    config.algorithmCostBase *
    config.algorithmCostRateGrowth ** currentNumberAlgorithms;
  return Math.ceil(newCost);
};

const bandwidthReplenishmentCost = (gameState: GameState) => {
  const newCost =
    gameState.bandwidthIndex <= 1
      ? 50
      : 50 + 50 * (gameState.bandwidthIndex - 1);

  return newCost;
};

export { getUpgradeCost, newAlgorithmCost, bandwidthReplenishmentCost };

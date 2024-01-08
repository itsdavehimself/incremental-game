import { CostBreakdown } from '../data/upgrades';
import { Config } from '../App';

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

export { getUpgradeCost, newAlgorithmCost };

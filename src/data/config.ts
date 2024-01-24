import { Config } from '../types';

const config = <Config>{
  algorithmCostBase: 6,
  algorithmCostRateGrowth: 1.07,
  executablesCostBase: 10000,
  processingCoreProductionBase: 1.2 / 750,
  dataProductionBase: 1691 / 100,
};

export default config;

export interface GameState {
  totalData: number;
  dataMilestones: Array<number>;
  dataMilestonesIndex: number;
  processingCores: number;
  integrationSpeed: number;
  integrationBandwidth: number;
  replenishmentFailed: boolean;
  replenishmentFailureIndex: number;
  algorithms: number;
  executables: number;
  executablesCost: number;
  executablesMultiplier: number;
  algorithmCost: number;
  algorithmMultiplier: number;
  bandwidthReplenishmentCost: number;
  bandwidthMultiplier: number;
  autoBandwidthReplenishment: boolean;
  networksActivated: boolean;
  networks: number;
  networksAvailable: number;
  GPUFarms: number;
  storageFacilities: number;
  nodesCurrent: number;
  nodesTotal: number;
  cognitum: number;
  networkMilestones: Array<number>;
  networkMilestonesIndex: number;
  upgrades: object;
  integrationAlgorithmIndex: number;
  bandwidthIndex: number;
  networksIndex: number;
  executablesIndex: number;
  filesActivated: boolean;
  filesIndex: number;
  filesMilestones: Array<number>;
  walletDecryptionActivated: boolean;
  walletsDecrypted: number;
  walletsBricked: number;
  walletDecryptionCost: number;
  walletDecryptionIndex: number;
  fractionalMemoryShards: number;
  memoryShardsProbability: number;
  memoryShardIndex: number;
  timeElapsed: number;
  logMessages: Array<string>;
  gameOver: boolean;
}

export interface Config {
  algorithmCostBase: number;
  algorithmCostRateGrowth: number;
  executablesCostBase: number;
  processingCoreProductionBase: number;
  dataProductionBase: number;
}

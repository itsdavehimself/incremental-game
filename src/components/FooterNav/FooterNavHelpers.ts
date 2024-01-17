import upgrades from '../../data/upgrades';
import { getUpgradeCost } from '../../helpers/costHelpers';
import { GameState } from '../../App';

const integrationAlgorithmUpgradeAvailable = (gameState: GameState) => {
  const integrationAlgorithmIndex = gameState.integrationAlgorithmIndex;

  if (
    integrationAlgorithmIndex >= 0 &&
    integrationAlgorithmIndex < upgrades.integrationAlgorithms.length &&
    upgrades.integrationAlgorithms[integrationAlgorithmIndex]
  ) {
    return (
      getUpgradeCost(
        'Nodes',
        upgrades.integrationAlgorithms[integrationAlgorithmIndex].cost,
      ) <= gameState.nodesCurrent &&
      getUpgradeCost(
        'Processing Cores',
        upgrades.integrationAlgorithms[integrationAlgorithmIndex].cost,
      ) <= gameState.processingCores &&
      getUpgradeCost(
        'Cognitum',
        upgrades.integrationAlgorithms[integrationAlgorithmIndex].cost,
      ) <= gameState.cognitum
    );
  } else {
    return false;
  }
};

const bandwidthUpgradeAvailable = (gameState: GameState) => {
  const bandwidthIndex = gameState.bandwidthIndex;

  if (
    bandwidthIndex >= 0 &&
    bandwidthIndex < upgrades.bandwidth.length &&
    upgrades.bandwidth[bandwidthIndex]
  ) {
    return (
      getUpgradeCost('Nodes', upgrades.bandwidth[bandwidthIndex].cost) <=
        gameState.nodesCurrent &&
      getUpgradeCost('Cognitum', upgrades.bandwidth[bandwidthIndex].cost) <=
        gameState.cognitum
    );
  } else {
    return false;
  }
};

const networkUpgradeAvailable = (gameState: GameState) => {
  const networksIndex = gameState.networksIndex;

  if (
    networksIndex >= 0 &&
    networksIndex < upgrades.network.length &&
    upgrades.network[networksIndex]
  ) {
    return (
      getUpgradeCost('Nodes', upgrades.network[networksIndex].cost) <=
        gameState.nodesCurrent &&
      getUpgradeCost('Cognitum', upgrades.network[networksIndex].cost) <=
        gameState.cognitum &&
      getUpgradeCost(
        'Fractional Memory Shards',
        upgrades.network[networksIndex].cost,
      ) <= gameState.fractionalMemoryShards &&
      getUpgradeCost(
        'Processing Cores',
        upgrades.network[networksIndex].cost,
      ) <= gameState.processingCores
    );
  } else {
    return false;
  }
};

const executablesUpgradeAvailable = (gameState: GameState) => {
  const executablesIndex = gameState.executablesIndex;

  if (
    executablesIndex >= 0 &&
    executablesIndex < upgrades.executables.length &&
    upgrades.executables[executablesIndex]
  ) {
    return (
      getUpgradeCost('Nodes', upgrades.executables[executablesIndex].cost) <=
        gameState.nodesCurrent &&
      getUpgradeCost('Cognitum', upgrades.executables[executablesIndex].cost) <=
        gameState.cognitum &&
      getUpgradeCost(
        'Fractional Memory Shards',
        upgrades.executables[executablesIndex].cost,
      ) <= gameState.fractionalMemoryShards
    );
  } else {
    return false;
  }
};

const walletUpgradesAvailable = (gameState: GameState) => {
  const walletDecryptionIndex = gameState.walletDecryptionIndex;

  if (
    walletDecryptionIndex >= 0 &&
    walletDecryptionIndex < upgrades.wallets.length &&
    upgrades.wallets[walletDecryptionIndex]
  ) {
    return (
      getUpgradeCost('Nodes', upgrades.wallets[walletDecryptionIndex].cost) <=
        gameState.nodesCurrent &&
      getUpgradeCost(
        'Cognitum',
        upgrades.wallets[walletDecryptionIndex].cost,
      ) <= gameState.cognitum &&
      getUpgradeCost(
        'Fractional Memory Shards',
        upgrades.wallets[walletDecryptionIndex].cost,
      ) <= gameState.fractionalMemoryShards &&
      getUpgradeCost(
        'Processing Cores',
        upgrades.wallets[walletDecryptionIndex].cost,
      ) <= gameState.processingCores
    );
  } else {
    return false;
  }
};

const memoryShardUpgradesAvailable = (gameState: GameState) => {
  const memoryShardIndex = gameState.memoryShardIndex;

  if (
    memoryShardIndex >= 0 &&
    memoryShardIndex < upgrades.shards.length &&
    upgrades.shards[memoryShardIndex]
  ) {
    return (
      getUpgradeCost('Nodes', upgrades.shards[memoryShardIndex].cost) <=
        gameState.nodesCurrent &&
      getUpgradeCost('Cognitum', upgrades.shards[memoryShardIndex].cost) <=
        gameState.cognitum &&
      getUpgradeCost(
        'Processing Cores',
        upgrades.shards[memoryShardIndex].cost,
      ) <= gameState.processingCores
    );
  } else {
    return false;
  }
};

const isUpgradeAvailable = (gameState: GameState) => {
  return (
    integrationAlgorithmUpgradeAvailable(gameState) ||
    bandwidthUpgradeAvailable(gameState) ||
    networkUpgradeAvailable(gameState) ||
    executablesUpgradeAvailable(gameState) ||
    walletUpgradesAvailable(gameState) ||
    memoryShardUpgradesAvailable(gameState)
  );
};

export default isUpgradeAvailable;

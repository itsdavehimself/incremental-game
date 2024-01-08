import { GameState } from '../App';
import { CostBreakdown } from '../data/upgrades';
import { getUpgradeCost } from './costHelpers';

const purchaseWalletDecryption = (
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  gameState: GameState,
) => {
  setGameState((prevGameState) => {
    return {
      ...prevGameState,
      nodesCurrent: prevGameState.nodesCurrent - gameState.walletDecryptionCost,
    };
  });
};

const upgradeWalletDecryption = (
  costs: CostBreakdown[],
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
) => {
  setGameState((prevGameState) => {
    const updatedNodes =
      prevGameState.nodesCurrent - getUpgradeCost('Nodes', costs);
    const updatedCognitum =
      prevGameState.cognitum - getUpgradeCost('Cognitum', costs);
    const updatedMemoryShards =
      prevGameState.fractionalMemoryShards -
      getUpgradeCost('Fractional Memory Shards', costs);
    const updatedProcessingCores =
      prevGameState.processingCores - getUpgradeCost('Processing Cores', costs);
    return {
      ...prevGameState,
      walletDecryptionActivated: true,
      nodesCurrent: updatedNodes,
      cognitum: updatedCognitum,
      fractionalMemoryShards: updatedMemoryShards,
      processingCores: updatedProcessingCores,
      walletDecryptionIndex: prevGameState.walletDecryptionIndex + 1,
    };
  });
};

const upgradeMemoryShardsProbability = (
  newProbability: number | null,
  costs: CostBreakdown[],
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
) => {
  setGameState((prevGameState) => {
    const updatedProbability =
      newProbability !== null
        ? newProbability
        : prevGameState.memoryShardsProbability;
    const updatedNodes =
      prevGameState.nodesCurrent - getUpgradeCost('Nodes', costs);
    const updatedCognitum =
      prevGameState.cognitum - getUpgradeCost('Cognitum', costs);
    const updatedProcessingCores =
      prevGameState.processingCores - getUpgradeCost('Processing Cores', costs);
    return {
      ...prevGameState,
      nodesCurrent: updatedNodes,
      cognitum: updatedCognitum,
      processingCores: updatedProcessingCores,
      memoryShardsProbability: updatedProbability,
      memoryShardIndex: prevGameState.memoryShardIndex + 1,
    };
  });
};

const incrementWallets = (
  decrypted: boolean,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
) => {
  setGameState((prevGameState) => {
    const updatedDecryptionCost = Math.min(
      5000,
      prevGameState.walletDecryptionCost + 250,
    );
    if (decrypted) {
      return {
        ...prevGameState,
        walletsDecrypted: prevGameState.walletsDecrypted + 1,
        walletDecryptionCost: updatedDecryptionCost,
      };
    } else {
      return {
        ...prevGameState,
        walletsBricked: prevGameState.walletsBricked + 1,
      };
    }
  });
};

const receiveCognitumPrize = (
  prize: number,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
) => {
  setGameState((prevGameState) => {
    return {
      ...prevGameState,
      cognitum: prevGameState.cognitum + prize,
    };
  });
};

const receiveMemoryShardsPrize = (
  prize: number,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
) => {
  setGameState((prevGameState) => {
    return {
      ...prevGameState,
      fractionalMemoryShards: prevGameState.fractionalMemoryShards + prize,
    };
  });
};

export {
  purchaseWalletDecryption,
  upgradeWalletDecryption,
  upgradeMemoryShardsProbability,
  incrementWallets,
  receiveCognitumPrize,
  receiveMemoryShardsPrize,
};

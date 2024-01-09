import { getUpgradeCost } from './costHelpers';
import { CostBreakdown } from '../data/upgrades';
import { GameState } from '../App';

const buyNetwork = (
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
      networksAvailable: prevGameState.networksAvailable + 1,
      cognitum: updatedCognitum,
      nodesCurrent: updatedNodes,
      networksIndex: prevGameState.networksIndex + 1,
      fractionalMemoryShards: updatedMemoryShards,
      processingCores: updatedProcessingCores,
      logMessages: [
        ...prevGameState.logMessages,
        'Network expansion continues. A new network has been added to your aresenal. Ready for allocation.',
      ],
    };
  });
};

const activateNetworks = (
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
) => {
  setGameState((prevGameState) => {
    return {
      ...prevGameState,
      networksActivated: true,
      networks: 2,
      nodesTotal: 1000,
      GPUFarms: 1,
      storageFacilities: 1,
      logMessages: [
        ...prevGameState.logMessages,
        'Network expansion initiated. Mining nodes begin firing up.',
      ],
    };
  });
};

const earnNetworks = (
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
) => {
  setGameState((prevGameState) => ({
    ...prevGameState,
    networks: prevGameState.networks + 1,
    networksAvailable: prevGameState.networksAvailable + 1,
    logMessages: [
      ...prevGameState.logMessages,
      'A new network has been assimilated and is ready to be allocated.',
    ],
  }));
};

const checkNetworkMilestones = (
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  gameState: GameState,
) => {
  setGameState((prevGameState) => {
    const currentTotalData = prevGameState.totalData;

    if (currentTotalData >= 2.097152e6 && !prevGameState.networksActivated) {
      activateNetworks(setGameState);
    }

    if (
      currentTotalData >=
      gameState.networkMilestones[prevGameState.networkMilestonesIndex]
    ) {
      earnNetworks(setGameState);
      return {
        ...prevGameState,
        networkMilestonesIndex: prevGameState.networkMilestonesIndex + 1,
      };
    }

    return prevGameState;
  });
};

const allocateToGPU = (
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
) => {
  setGameState((prevGameState) => {
    if (prevGameState.networksAvailable > 0) {
      return {
        ...prevGameState,
        networksAvailable: prevGameState.networksAvailable - 1,
        GPUFarms: prevGameState.GPUFarms + 1,
      };
    } else {
      return {
        ...prevGameState,
      };
    }
  });
};

const allocateToStorage = (
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
) => {
  setGameState((prevGameState) => {
    if (prevGameState.networksAvailable > 0) {
      return {
        ...prevGameState,
        networksAvailable: prevGameState.networksAvailable - 1,
        storageFacilities: prevGameState.storageFacilities + 1,
        nodesTotal: prevGameState.nodesTotal + 1000,
      };
    } else {
      return {
        ...prevGameState,
      };
    }
  });
};

const incrementActiveNodes = (
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
) => {
  setGameState((prevGameState) => {
    if (
      prevGameState.networksActivated &&
      prevGameState.nodesCurrent < prevGameState.nodesTotal
    ) {
      const incrementedNodes =
        prevGameState.nodesCurrent + (1 / 5) * prevGameState.GPUFarms;
      const updatedNodesCurrent = Math.min(
        incrementedNodes,
        prevGameState.nodesTotal,
      );

      return {
        ...prevGameState,
        nodesCurrent: updatedNodesCurrent,
      };
    } else {
      return {
        ...prevGameState,
      };
    }
  });
};

const incrementCognitum = (
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
) => {
  setGameState((prevGameState) => {
    if (
      prevGameState.networksActivated &&
      prevGameState.nodesCurrent === prevGameState.nodesTotal
    ) {
      const incrementedCognitum = prevGameState.cognitum + 1 / 500;

      return {
        ...prevGameState,
        cognitum: incrementedCognitum,
      };
    } else {
      return {
        ...prevGameState,
      };
    }
  });
};

export {
  buyNetwork,
  checkNetworkMilestones,
  allocateToGPU,
  allocateToStorage,
  incrementActiveNodes,
  incrementCognitum,
};

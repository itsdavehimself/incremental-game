import { useState, useEffect } from 'react';
import GameUI from './containers/GameUI/GameUI';
import './app.scss';

interface GameState {
  totalData: number;
  processingCores: number;
  integrationSpeed: number;
  integrationBandwidth: number;
  algorithms: number;
  executables: number;
  algorithmCost: number;
  algorithmMultiplier: number;
  algorithmMultiplierIndex: number;
  algorithMultiplierPercentage: Array<number>;
  bandwidthMultiplier: number;
  bandwidthMultiplierIndex: number;
  bandwidthMultiplierPercentage: Array<number>;
  autoBandwidthReplenishment: boolean;
  networksActivated: boolean;
  networks: number;
  networksAvailable: number;
  GPUFarms: number;
  storageFacilities: number;
  nodesCurrent: number;
  nodesTotal: number;
  cognitum: number;
  networkMilestonesIndex: number;
}

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    totalData: 0,
    processingCores: 0,
    integrationSpeed: 0,
    integrationBandwidth: 1000,
    algorithms: 1,
    executables: 0,
    algorithmCost: 6,
    algorithmMultiplier: 1,
    algorithmMultiplierIndex: 0,
    algorithMultiplierPercentage: [0.25, 0.5, 0.75, 1, 2, 4, 8, 16],
    bandwidthMultiplier: 1,
    bandwidthMultiplierIndex: 0,
    bandwidthMultiplierPercentage: [0.25, 0.5, 1],
    autoBandwidthReplenishment: false,
    networksActivated: false,
    networks: 0,
    networksAvailable: 0,
    GPUFarms: 0,
    storageFacilities: 0,
    nodesCurrent: 0,
    nodesTotal: 0,
    cognitum: 0,
    networkMilestonesIndex: 0,
  });

  const config = {
    algorithmCostBase: 6,
    algorithmCostRateGrowth: 1.07,
    processingCoreProductionBase: 1.2 / 750,
    dataProductionBase: 1038 / 100,
  };

  const newAlgorithmCost = (currentNumberAlgorithms: number) => {
    const newCost =
      config.algorithmCostBase *
      config.algorithmCostRateGrowth ** currentNumberAlgorithms;
    return Math.ceil(newCost);
  };

  const synthesizeAlgorithm = () => {
    setGameState((prevGameState) => {
      if (prevGameState.processingCores >= prevGameState.algorithmCost) {
        return {
          ...prevGameState,
          algorithms: prevGameState.algorithms + 1,
          processingCores:
            prevGameState.processingCores - prevGameState.algorithmCost,
          algorithmCost: newAlgorithmCost(prevGameState.algorithms + 1),
        };
      } else {
        return {
          ...prevGameState,
        };
      }
    });
  };

  const activateMultiplier = () => {
    setGameState((prevGameState) => {
      const updatedMultiplier =
        prevGameState.algorithmMultiplier *
        (1 +
          prevGameState.algorithMultiplierPercentage[
            prevGameState.algorithmMultiplierIndex
          ]);
      return {
        ...prevGameState,
        algorithmMultiplier: updatedMultiplier,
        algorithmMultiplierIndex: prevGameState.algorithmMultiplierIndex + 1,
      };
    });
  };

  const replenishBandwidth = () => {
    setGameState((prevGameState) => {
      const addBandwidth =
        prevGameState.integrationBandwidth +
        1000 * prevGameState.bandwidthMultiplier;
      if (prevGameState.processingCores >= 50) {
        return {
          ...prevGameState,
          integrationBandwidth: addBandwidth,
          processingCores: prevGameState.processingCores - 50,
        };
      } else {
        return {
          ...prevGameState,
        };
      }
    });
  };

  const upgradeBandwidthReplenishment = () => {
    setGameState((prevGameState) => {
      const updatedBandwidthMultiplier =
        prevGameState.bandwidthMultiplier *
        (1 +
          prevGameState.bandwidthMultiplierPercentage[
            prevGameState.bandwidthMultiplierIndex
          ]);
      return {
        ...prevGameState,
        bandwidthMultiplier: updatedBandwidthMultiplier,
        bandwidthMultiplierIndex: prevGameState.bandwidthMultiplierIndex + 1,
      };
    });
  };

  const activateNetworks = () => {
    setGameState((prevGameState) => {
      return {
        ...prevGameState,
        networksActivated: true,
        networks: 2,
        nodesTotal: 1000,
        GPUFarms: 1,
        storageFacilities: 1,
      };
    });
  };

  const earnNetworks = () => {
    setGameState((prevGameState) => ({
      ...prevGameState,
      networks: prevGameState.networks + 1,
      networksAvailable: prevGameState.networksAvailable + 1,
    }));
  };

  const checkNetworkMilestones = () => {
    setGameState((prevGameState) => {
      const currentTotalData = prevGameState.totalData;

      if (currentTotalData >= 2e6 && !prevGameState.networksActivated) {
        activateNetworks();
      }

      const milestones = [
        5e6, 8e6, 1.3e7, 2.1e7, 3.4e7, 5.5e7, 8.9e7, 1.4e8, 2.3e8, 3.7e8, 6e8,
        9.7e8, 1.6e9, 2.6e9, 4.2e9, 6.8e9, 1.1e10, 1.8e10, 2.9e10, 4.7e10,
        7.6e10, 1.2e11, 1.9e11, 3.1e11, 5e11, 8.1e11, 1.3e12, 2.1e12, 3.4e12,
        5.5e12, 8.9e12, 1.4e13, 2.3e13, 3.7e13, 6e13, 9.7e13, 1.6e14, 2.6e14,
      ];

      if (
        currentTotalData >= milestones[prevGameState.networkMilestonesIndex]
      ) {
        earnNetworks();
        return {
          ...prevGameState,
          networkMilestonesIndex: prevGameState.networkMilestonesIndex + 1,
        };
      }

      return prevGameState;
    });
  };

  const allocateToGPU = () => {
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

  const allocateToStorage = () => {
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

  const incrementActiveNodes = () => {
    setGameState((prevGameState) => {
      if (
        prevGameState.networksActivated &&
        prevGameState.nodesCurrent < prevGameState.nodesTotal
      ) {
        const incrementedNodes =
          prevGameState.nodesCurrent + (1 / 25) * prevGameState.GPUFarms;
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

  const incrementCognitum = () => {
    setGameState((prevGameState) => {
      if (
        prevGameState.networksActivated &&
        prevGameState.nodesCurrent === prevGameState.nodesTotal
      ) {
        const incrementedCognitum = prevGameState.cognitum + 1 / 250;

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

  useEffect(() => {
    const intervalID = setInterval(() => {
      setGameState((prevGameState) => {
        incrementActiveNodes();
        incrementCognitum();
        if (prevGameState.integrationBandwidth > 0) {
          const processingCoreProductionTotal =
            config.processingCoreProductionBase *
            prevGameState.algorithms *
            prevGameState.algorithmMultiplier;

          const newProcessingCoresTotal =
            prevGameState.processingCores + processingCoreProductionTotal;

          const dataProductionTotal =
            config.dataProductionBase *
            prevGameState.algorithms *
            prevGameState.algorithmMultiplier;

          const newDataTotal = prevGameState.totalData + dataProductionTotal;

          const integrationBandwidthTotal = Math.max(
            prevGameState.integrationBandwidth - dataProductionTotal / 2000,
            0,
          );

          checkNetworkMilestones();

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
          const addBandwidth =
            prevGameState.integrationBandwidth +
            1000 * prevGameState.bandwidthMultiplier;

          const subtractProcessingCores = prevGameState.processingCores - 50;

          if (prevGameState.processingCores >= 50) {
            return {
              ...prevGameState,
              integrationBandwidth: addBandwidth,
              processingCores: subtractProcessingCores,
            };
          }
        }

        return { ...prevGameState };
      });
    }, 10);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="app">
      <GameUI
        gameState={gameState}
        synthesizeAlgorithm={synthesizeAlgorithm}
        replenishBandwidth={replenishBandwidth}
        activateMultiplier={activateMultiplier}
        upgradeBandwidthReplenishment={upgradeBandwidthReplenishment}
        allocateToGPU={allocateToGPU}
        allocateToStorage={allocateToStorage}
      />
    </div>
  );
};

export default App;

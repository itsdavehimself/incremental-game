import { useState, useEffect } from 'react';
import GameUI from './containers/GameUI/GameUI';
import './app.scss';

interface GameState {
  totalData: number;
  processingCores: number;
  integrationSpeed: number;
  integrationStamina: number;
  algorithms: number;
  executables: number;
  algorithmCost: number;
  algorithmMultiplier: number;
  algorithmMultiplierIndex: number;
  algorithMultiplierPercentage: Array<number>;
  staminaMultiplier: number;
  staminaMultiplierIndex: number;
  staminaMultiplierPercentage: Array<number>;
  autoStaminaReplenishment: boolean;
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
    integrationStamina: 1000,
    algorithms: 1,
    executables: 0,
    algorithmCost: 6,
    algorithmMultiplier: 1,
    algorithmMultiplierIndex: 0,
    algorithMultiplierPercentage: [0.25, 0.5, 0.75, 1, 2, 4, 8, 16],
    staminaMultiplier: 1,
    staminaMultiplierIndex: 0,
    staminaMultiplierPercentage: [0.25, 0.5, 1],
    autoStaminaReplenishment: false,
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

  const algorithmCostBase = 6;
  const algorithmCostRateGrowth = 1.07;
  const processingCoreProductionBase = 1.2 / 750;
  const dataProductionBase = 1038 / 100;
  const newAlgorithmCost = (currentNumberAlgorithms: number) => {
    const newCost =
      algorithmCostBase * algorithmCostRateGrowth ** currentNumberAlgorithms;
    return Math.ceil(newCost);
  };

  const synthesizeAlgorithm = () => {
    setGameState((prevGameState) => {
      const incrementAlgorithm = prevGameState.algorithms + 1;
      const subtractProcessingCores =
        prevGameState.processingCores - prevGameState.algorithmCost;
      if (prevGameState.processingCores >= prevGameState.algorithmCost) {
        const updatedAlgorithmCost = newAlgorithmCost(prevGameState.algorithms);
        return {
          ...prevGameState,
          algorithms: incrementAlgorithm,
          processingCores: subtractProcessingCores,
          algorithmCost: updatedAlgorithmCost,
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
      const updatedIndex = prevGameState.algorithmMultiplierIndex + 1;
      return {
        ...prevGameState,
        algorithmMultiplier: updatedMultiplier,
        algorithmMultiplierIndex: updatedIndex,
      };
    });
  };

  const replenishStamina = () => {
    setGameState((prevGameState) => {
      const addStamina =
        prevGameState.integrationStamina +
        1000 * prevGameState.staminaMultiplier;
      const subtractProcessingCores = prevGameState.processingCores - 50;
      if (prevGameState.processingCores >= 50) {
        return {
          ...prevGameState,
          integrationStamina: addStamina,
          processingCores: subtractProcessingCores,
        };
      } else {
        return {
          ...prevGameState,
        };
      }
    });
  };

  const upgradeStaminaReplenishment = () => {
    setGameState((prevGameState) => {
      const updatedStaminamMultiplier =
        prevGameState.staminaMultiplier *
        (1 +
          prevGameState.staminaMultiplierPercentage[
            prevGameState.staminaMultiplierIndex
          ]);
      const updatedIndex = prevGameState.staminaMultiplierIndex + 1;
      return {
        ...prevGameState,
        staminaMultiplier: updatedStaminamMultiplier,
        staminaMultiplierIndex: updatedIndex,
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
        if (prevGameState.integrationStamina > 0) {
          const processingCoreProductionTotal =
            processingCoreProductionBase *
            prevGameState.algorithms *
            prevGameState.algorithmMultiplier;

          const newProcessingCoresTotal =
            prevGameState.processingCores + processingCoreProductionTotal;

          const dataProductionTotal =
            dataProductionBase *
            prevGameState.algorithms *
            prevGameState.algorithmMultiplier;

          const newDataTotal = prevGameState.totalData + dataProductionTotal;

          const integrationStaminaTotal =
            prevGameState.integrationStamina - dataProductionTotal / 2000;

          checkNetworkMilestones();

          return {
            ...prevGameState,
            totalData: newDataTotal,
            processingCores: newProcessingCoresTotal,
            integrationSpeed: dataProductionTotal,
            integrationStamina: integrationStaminaTotal,
          };
        } else if (
          prevGameState.autoStaminaReplenishment &&
          prevGameState.integrationStamina < 1
        ) {
          const addStamina =
            prevGameState.integrationStamina +
            1000 * prevGameState.staminaMultiplier;

          const subtractProcessingCores = prevGameState.processingCores - 50;

          if (prevGameState.processingCores >= 50) {
            return {
              ...prevGameState,
              integrationStamina: addStamina,
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
        replenishStamina={replenishStamina}
        activateMultiplier={activateMultiplier}
        upgradeStaminaReplenishment={upgradeStaminaReplenishment}
        allocateToGPU={allocateToGPU}
        allocateToStorage={allocateToStorage}
      />
    </div>
  );
};

export default App;

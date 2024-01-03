import { useState, useEffect } from 'react';
import GameUI from './containers/GameUI/GameUI';
import './app.scss';
import upgrades, { Upgrade } from './data/upgrades';

interface GameState {
  totalData: number;
  processingCores: number;
  integrationSpeed: number;
  integrationBandwidth: number;
  algorithms: number;
  executables: number;
  algorithmCost: number;
  algorithmMultiplier: number;
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
}

const App: React.FC = () => {
  const [inputCode, setInputCode] = useState<string>('');
  const [generatedCode, setGeneratedCode] = useState<string>('');
  const [gameState, setGameState] = useState<GameState>({
    totalData: 0,
    processingCores: 0,
    integrationSpeed: 0,
    integrationBandwidth: 750,
    algorithms: 1,
    executables: 0,
    algorithmCost: 6,
    algorithmMultiplier: 1,
    bandwidthMultiplier: 1,
    autoBandwidthReplenishment: false,
    networksActivated: false,
    networks: 0,
    networksAvailable: 0,
    GPUFarms: 0,
    storageFacilities: 0,
    nodesCurrent: 0,
    nodesTotal: 0,
    cognitum: 0,
    networkMilestones: [
      5.24288e6, 8.388608e6, 13.631488e6, 21.020096e6, 34.651584e6, 55.67168e6,
      90.323264e6, 145.994944e6, 236.318208e6, 382.313152e6, 618.63136e6,
      1001.944512e6, 1620.575872e6, 2622.520384e6, 4243.496256e6, 6866.01664e6,
      11109.512896e6, 17975.529536e6, 29085.042432e6,
    ],
    networkMilestonesIndex: 0,
    upgrades: upgrades,
    integrationAlgorithmIndex: 0,
    bandwidthIndex: 0,
    networksIndex: 0,
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

  const upgradeIntegrationAlgorithm = (
    multiplierPercentage: number | null,
    cost: number,
  ) => {
    setGameState((prevGameState) => {
      if (multiplierPercentage !== null) {
        const updatedMultiplier =
          prevGameState.algorithmMultiplier * (1 + multiplierPercentage);
        return {
          ...prevGameState,
          algorithmMultiplier: updatedMultiplier,
          nodesCurrent: prevGameState.nodesCurrent - cost,
          integrationAlgorithmIndex:
            prevGameState.integrationAlgorithmIndex + 1,
        };
      } else {
        return {
          ...prevGameState,
          nodesCurrent: prevGameState.nodesCurrent - cost,
          integrationAlgorithmIndex:
            prevGameState.integrationAlgorithmIndex + 1,
        };
      }
    });
  };

  const replenishBandwidth = () => {
    setGameState((prevGameState) => {
      const addBandwidth =
        prevGameState.integrationBandwidth +
        750 * prevGameState.bandwidthMultiplier;
      if (prevGameState.processingCores >= 50) {
        return {
          ...prevGameState,
          integrationBandwidth: addBandwidth,
          processingCores: prevGameState.processingCores - 50,
          bandwidthIndex: prevGameState.bandwidthIndex + 1,
        };
      } else {
        return {
          ...prevGameState,
        };
      }
    });
  };

  const buyNetwork = (cost: number) => {
    setGameState((prevGameState) => {
      if (prevGameState.cognitum >= cost) {
        return {
          ...prevGameState,
          networksAvailable: prevGameState.networksAvailable + 1,
          cognitum: prevGameState.cognitum - cost,
          networksIndex: prevGameState.networksIndex + 1,
        };
      } else {
        return {
          ...prevGameState,
        };
      }
    });
  };

  const upgradeBandwidthReplenishment = (
    multiplierPercentage: number | null,
    cost: number,
  ) => {
    setGameState((prevGameState) => {
      if (multiplierPercentage !== null) {
        const updatedBandwidthMultiplier =
          prevGameState.bandwidthMultiplier * (1 + multiplierPercentage);
        return {
          ...prevGameState,
          bandwidthMultiplier: updatedBandwidthMultiplier,
          nodesCurrent: prevGameState.nodesCurrent - cost,
        };
      } else {
        return {
          ...prevGameState,
          autoBandwidthReplenishment: true,
          nodesCurrent: prevGameState.nodesCurrent - cost,
        };
      }
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

      if (currentTotalData >= 2.097152e6 && !prevGameState.networksActivated) {
        activateNetworks();
      }

      if (
        currentTotalData >=
        gameState.networkMilestones[prevGameState.networkMilestonesIndex]
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

  const handleUpgradeClick = (upgrade: Upgrade, category: string) => {
    if (!upgrade.purchased) {
      upgrade.purchased = true;

      if (category === 'integration') {
        upgradeIntegrationAlgorithm(upgrade.multiplier, upgrade.cost.amount);
      } else if (category === 'bandwidth') {
        upgradeBandwidthReplenishment(upgrade.multiplier, upgrade.cost.amount);
      } else {
        buyNetwork(upgrade.cost.amount);
      }
    }
  };

  const encodeGameState = (state: GameState): string => {
    const jsonString = JSON.stringify(state);
    return btoa(jsonString);
  };

  const decodeGameState = (code: string): GameState | null => {
    try {
      const jsonString = atob(code);
      return JSON.parse(jsonString);
    } catch (error) {
      console.error('Error decoding game state:', error);
      return null;
    }
  };

  const saveGameState = () => {
    const code = encodeGameState(gameState);
    localStorage.setItem('gameStateCode', code);
    setGeneratedCode(code);
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setInputCode(event.target.value);
  };

  const handleLoadButtonClick = () => {
    const loadedState = decodeGameState(inputCode);
    if (loadedState) {
      setGameState(loadedState);
    } else {
      console.error('Invalid game state code');
    }
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
        upgradeIntegrationAlgorithm={upgradeIntegrationAlgorithm}
        upgradeBandwidthReplenishment={upgradeBandwidthReplenishment}
        buyNetwork={buyNetwork}
        allocateToGPU={allocateToGPU}
        allocateToStorage={allocateToStorage}
        handleUpgradeClick={handleUpgradeClick}
      />

      <button onClick={saveGameState}>Save Game</button>

      <div>
        <p>Generated Code:</p>
        <code>{generatedCode}</code>
      </div>
      <div>
        <input
          type="text"
          value={inputCode}
          onChange={handleInputChange}
          placeholder="Enter game state code"
        />
        <button onClick={handleLoadButtonClick}>Load Game</button>
      </div>
    </div>
  );
};

export default App;

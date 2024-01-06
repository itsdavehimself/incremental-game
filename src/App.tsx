import { useState, useEffect } from 'react';
import GameUI from './containers/GameUI/GameUI';
import './app.scss';
import upgrades, { Upgrade, CostBreakdown } from './data/upgrades';

interface GameState {
  totalData: number;
  processingCores: number;
  integrationSpeed: number;
  integrationBandwidth: number;
  algorithms: number;
  executables: number;
  executablesCost: number;
  executablesMultiplier: number;
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
  executablesIndex: number;
  filesActivated: boolean;
  filesIndex: number;
  filesMilestones: Array<number>;
  walletDecryptionActivated: boolean;
  walletsDecrypted: number;
  walletsBricked: number;
  walletDecryptionCost: number;
  walletDecryptionIndex: number;
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
    executablesCost: 100000,
    executablesMultiplier: 1,
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
      11109.512896e6, 17975.529536e6, 29085.042432e6, 47060.571968e6,
      76145.6144e6, 123206.186368e6, 199351.800768e6, 322558.987136e6,
      521910.787904e6, 844470.788096e6, 1363981.576e6, 2208452.3648e6,
      3572434.9408e6, 5780887.3056e6, 9353322.2464e6, 15124210.552e6,
      24477532.7984e6, 39601743.3504e6, 64079276.1488e6, 103881019.4992e6,
      168960295.648e6, 272841315.1488e6, 441801610.7968e6, 714642925.9456e6,
      1159442536.7424e6, 1874085462.7392e6, 3033528007.4816e6,
      4907613470.2208e6, 7941141477.7024e6, 12848794947.9232e6,
      20789936425.9248e6, 33638731373.8496e6, 54428667899.7744e6,
      88067499273.624e6, 142596067173.3984e6, 230663566446.0224e6,
      373259633619.4208e6, 603923200065.4432e6, 977182833684.864e6,
    ],
    networkMilestonesIndex: 0,
    upgrades: upgrades,
    integrationAlgorithmIndex: 0,
    bandwidthIndex: 0,
    networksIndex: 0,
    executablesIndex: 0,
    filesActivated: false,
    filesIndex: 0,
    filesMilestones: [15360, 81920, 102400, 1048576, 1572864, 2097152],
    walletDecryptionActivated: false,
    walletsDecrypted: 0,
    walletsBricked: 0,
    walletDecryptionCost: 2000,
    walletDecryptionIndex: 0,
  });

  const config = {
    algorithmCostBase: 6,
    algorithmCostRateGrowth: 1.07,
    executablesCostBase: 10000,
    processingCoreProductionBase: 1.2 / 750,
    dataProductionBase: 1691 / 100,
    bandwidthReplenishmentCost:
      gameState.bandwidthIndex <= 1
        ? 50
        : 50 + 50 * (gameState.bandwidthIndex - 1),
  };

  const getUpgradeCost = (currency: string, costs: CostBreakdown[]) => {
    const costObject = costs.find((cost) => cost.currency === currency);
    return costObject ? costObject.amount : 0;
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

  const createExecutable = () => {
    setGameState((prevGameState) => {
      if (prevGameState.processingCores >= prevGameState.executablesCost) {
        return {
          ...prevGameState,
          executables: prevGameState.executables + 1,
          processingCores:
            prevGameState.processingCores - prevGameState.executablesCost,
          executablesCost: prevGameState.executablesCost * 2,
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
    costs: CostBreakdown[],
  ) => {
    setGameState((prevGameState) => {
      const updatedMultiplier =
        multiplierPercentage !== null
          ? prevGameState.algorithmMultiplier * (1 + multiplierPercentage)
          : prevGameState.algorithmMultiplier;

      const updatedNodes =
        prevGameState.nodesCurrent - getUpgradeCost('Nodes', costs);
      const updatedCognitum =
        prevGameState.cognitum - getUpgradeCost('Cognitum', costs);

      return {
        ...prevGameState,
        algorithmMultiplier: updatedMultiplier,
        nodesCurrent: updatedNodes,
        cognitum: updatedCognitum,
        integrationAlgorithmIndex: prevGameState.integrationAlgorithmIndex + 1,
      };
    });
  };

  const upgradeBandwidthReplenishment = (
    multiplierPercentage: number | null,
    costs: CostBreakdown[],
  ) => {
    setGameState((prevGameState) => {
      const updatedMultiplier =
        multiplierPercentage !== null
          ? prevGameState.bandwidthMultiplier * (1 + multiplierPercentage)
          : prevGameState.bandwidthMultiplier;

      const updatedNodes =
        prevGameState.nodesCurrent - getUpgradeCost('Nodes', costs);
      const updatedCognitum =
        prevGameState.cognitum - getUpgradeCost('Cognitum', costs);

      return {
        ...prevGameState,
        bandwidthMultiplier: updatedMultiplier,
        nodesCurrent: updatedNodes,
        cognitum: updatedCognitum,
        bandwidthIndex: prevGameState.bandwidthIndex + 1,
        autoBandwidthReplenishment: multiplierPercentage === null,
      };
    });
  };

  const upgradeExecutables = (
    multiplierPercentage: number | null,
    costs: CostBreakdown[],
  ) => {
    setGameState((prevGameState) => {
      const updatedMultiplier =
        multiplierPercentage !== null
          ? prevGameState.executablesMultiplier * (1 + multiplierPercentage)
          : prevGameState.executablesMultiplier;

      const updatedNodes =
        prevGameState.nodesCurrent - getUpgradeCost('Nodes', costs);
      const updatedCognitum =
        prevGameState.cognitum - getUpgradeCost('Cognitum', costs);

      return {
        ...prevGameState,
        executablesMultiplier: updatedMultiplier,
        nodesCurrent: updatedNodes,
        cognitum: updatedCognitum,
        executablesIndex: prevGameState.executablesIndex + 1,
      };
    });
  };

  const replenishBandwidth = () => {
    setGameState((prevGameState) => {
      const addBandwidth =
        prevGameState.integrationBandwidth +
        750 * prevGameState.bandwidthMultiplier;
      if (prevGameState.processingCores >= config.bandwidthReplenishmentCost) {
        return {
          ...prevGameState,
          integrationBandwidth: addBandwidth,
          processingCores:
            prevGameState.processingCores - config.bandwidthReplenishmentCost,
        };
      } else {
        return {
          ...prevGameState,
        };
      }
    });
  };

  const buyNetwork = (costs: CostBreakdown[]) => {
    setGameState((prevGameState) => {
      const updatedNodes =
        prevGameState.nodesCurrent - getUpgradeCost('Nodes', costs);
      const updatedCognitum =
        prevGameState.cognitum - getUpgradeCost('Cognitum', costs);
      return {
        ...prevGameState,
        networksAvailable: prevGameState.networksAvailable + 1,
        cognitum: updatedCognitum,
        nodesCurrent: updatedNodes,
        networksIndex: prevGameState.networksIndex + 1,
      };
    });
  };

  const upgradeWalletDecryption = (costs: CostBreakdown[]) => {
    setGameState((prevGameState) => {
      const updatedNodes =
        prevGameState.nodesCurrent - getUpgradeCost('Nodes', costs);
      const updatedCognitum =
        prevGameState.cognitum - getUpgradeCost('Cognitum', costs);
      return {
        ...prevGameState,
        walletDecryptionActivated: true,
        nodesCurrent: updatedNodes,
        cognitum: updatedCognitum,
        walletDecryptionIndex: prevGameState.walletDecryptionIndex + 1,
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

  const purchaseWalletDecryption = () => {
    setGameState((prevGameState) => {
      return {
        ...prevGameState,
        nodesCurrent:
          prevGameState.nodesCurrent - gameState.walletDecryptionCost,
      };
    });
  };

  const handleUpgradeClick = (upgrade: Upgrade, category: string) => {
    if (!upgrade.purchased) {
      upgrade.purchased = true;

      switch (category) {
        case 'integration':
          upgradeIntegrationAlgorithm(upgrade.multiplier, upgrade.cost);
          break;
        case 'bandwidth':
          upgradeBandwidthReplenishment(upgrade.multiplier, upgrade.cost);
          break;
        case 'networks':
          buyNetwork(upgrade.cost);
          break;
        case 'wallets':
          upgradeWalletDecryption(upgrade.cost);
          break;
        case 'executables':
          upgradeExecutables(upgrade.multiplier, upgrade.cost);
      }
    }
  };

  const checkDecryptedFileMilestones = () => {
    setGameState((prevGameState) => {
      const currentTotalData = prevGameState.totalData;

      if (currentTotalData > 1024 * 15 && !prevGameState.filesActivated) {
        return {
          ...prevGameState,
          filesActivated: true,
          filesIndex: 1,
        };
      }

      if (
        currentTotalData >= gameState.filesMilestones[prevGameState.filesIndex]
      ) {
        return {
          ...prevGameState,
          filesIndex: prevGameState.filesIndex + 1,
        };
      } else {
        return {
          ...prevGameState,
        };
      }
    });
  };

  const incrementWallets = (decrypted: boolean) => {
    setGameState((prevGameState) => {
      const updatedDecryptionCost = Math.min(
        7500,
        prevGameState.walletDecryptionCost + 500,
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

  const receiveCognitumPrize = (prize: number) => {
    setGameState((prevGameState) => {
      return {
        ...prevGameState,
        cognitum: prevGameState.cognitum + prize,
      };
    });
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
        checkDecryptedFileMilestones();
        if (prevGameState.integrationBandwidth > 0) {
          const processingCoreProductionTotal =
            config.processingCoreProductionBase *
            prevGameState.algorithms *
            prevGameState.algorithmMultiplier *
            (prevGameState.executables === 0
              ? 1
              : Math.log(1 + prevGameState.executables * 0.01 + 1) *
                10 *
                prevGameState.executablesMultiplier);

          const newProcessingCoresTotal =
            prevGameState.processingCores + processingCoreProductionTotal;

          const dataProductionTotal =
            config.dataProductionBase *
            prevGameState.algorithms *
            prevGameState.algorithmMultiplier *
            (prevGameState.executables === 0
              ? 1
              : Math.log(1 + prevGameState.executables * 1 + 1) *
                7 *
                prevGameState.executablesMultiplier);

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
            750 * prevGameState.bandwidthMultiplier;
          if (prevGameState.processingCores >= 50) {
            return {
              ...prevGameState,
              integrationBandwidth: addBandwidth,
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
        config={config}
        synthesizeAlgorithm={synthesizeAlgorithm}
        createExecutable={createExecutable}
        replenishBandwidth={replenishBandwidth}
        allocateToGPU={allocateToGPU}
        allocateToStorage={allocateToStorage}
        handleUpgradeClick={handleUpgradeClick}
        incrementWallets={incrementWallets}
        receiveCognitumPrize={receiveCognitumPrize}
        purchaseWalletDecryption={purchaseWalletDecryption}
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

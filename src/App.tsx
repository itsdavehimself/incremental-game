import { useState, useEffect } from 'react';
import GameUI from './containers/GameUI/GameUI';
import './app.scss';
import upgrades, { Upgrade } from './data/upgrades';
import { formatTimeElapsed } from './utility/utilityFunctions';
import * as integrationAlgorithmHelpers from './helpers/integrationAlgorithmHelpers';
import * as bandwidthHelpers from './helpers/bandwidthHelpers';
import * as executablesHelpers from './helpers/executablesHelpers';
import * as networkHelpers from './helpers/networkHelpers';
import * as walletDecryptionHelpers from './helpers/walletDecryptionHelpers';
import * as saveGameHelpers from './helpers/saveGameHelpers';

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
  fractionalMemoryShards: number;
  memoryShardsProbability: number;
  memoryShardIndex: number;
  timeElapsed: number;
  gameOver: boolean;
}

interface Config {
  algorithmCostBase: number;
  algorithmCostRateGrowth: number;
  executablesCostBase: number;
  processingCoreProductionBase: number;
  dataProductionBase: number;
  bandwidthReplenishmentCost: number;
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
    walletDecryptionCost: 1000,
    walletDecryptionIndex: 0,
    fractionalMemoryShards: 0,
    memoryShardsProbability: 0.25,
    memoryShardIndex: 0,
    timeElapsed: 0,
    gameOver: false,
  });

  const config: Config = {
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

  const upgradeIntegrationAlgorithm =
    integrationAlgorithmHelpers.upgradeIntegrationAlgorithm;

  const synthesizeAlgorithm = integrationAlgorithmHelpers.synthesizeAlgorithm;

  const upgradeBandwidthReplenishment =
    bandwidthHelpers.upgradeBandwidthReplenishment;

  const replenishBandwidth = bandwidthHelpers.replenishBandwidth;

  const upgradeExecutables = executablesHelpers.upgradeExecutables;

  const createExecutable = executablesHelpers.createExecutable;

  const buyNetwork = networkHelpers.buyNetwork;

  const checkNetworkMilestones = networkHelpers.checkNetworkMilestones;

  const allocateToGPU = networkHelpers.allocateToGPU;

  const allocateToStorage = networkHelpers.allocateToStorage;

  const incrementActiveNodes = networkHelpers.incrementActiveNodes;

  const incrementCognitum = networkHelpers.incrementCognitum;

  const upgradeWalletDecryption =
    walletDecryptionHelpers.upgradeWalletDecryption;

  const purchaseWalletDecryption =
    walletDecryptionHelpers.purchaseWalletDecryption;

  const upgradeMemoryShardsProbability =
    walletDecryptionHelpers.upgradeMemoryShardsProbability;

  const incrementWallets = walletDecryptionHelpers.incrementWallets;

  const receiveCognitumPrize = walletDecryptionHelpers.receiveCognitumPrize;

  const receiveMemoryShardsPrize =
    walletDecryptionHelpers.receiveMemoryShardsPrize;

  const saveGameState = saveGameHelpers.saveGameState;

  const decodeGameState = saveGameHelpers.decodeGameState;

  const incrementTime = () => {
    setGameState((prevGameState) => {
      return {
        ...prevGameState,
        timeElapsed: prevGameState.timeElapsed + 0.01,
      };
    });
  };

  const handleUpgradeClick = (upgrade: Upgrade, category: string) => {
    if (!upgrade.purchased) {
      upgrade.purchased = true;

      switch (category) {
        case 'integration':
          upgradeIntegrationAlgorithm(
            upgrade.multiplier,
            upgrade.cost,
            setGameState,
          );
          break;
        case 'bandwidth':
          upgradeBandwidthReplenishment(
            upgrade.multiplier,
            upgrade.cost,
            setGameState,
          );
          break;
        case 'networks':
          buyNetwork(upgrade.cost, setGameState);
          break;
        case 'wallets':
          upgradeWalletDecryption(upgrade.cost, setGameState);
          break;
        case 'executables':
          upgradeExecutables(upgrade.multiplier, upgrade.cost, setGameState);
          break;
        case 'shards':
          upgradeMemoryShardsProbability(
            upgrade.multiplier,
            upgrade.cost,
            setGameState,
          );
          break;
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

  const handleLoadInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
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
        incrementTime();
        incrementActiveNodes(setGameState);
        incrementCognitum(setGameState);
        checkDecryptedFileMilestones();
        if (prevGameState.integrationBandwidth > 0) {
          const processingCoreProductionTotal =
            config.processingCoreProductionBase *
            prevGameState.algorithms *
            prevGameState.algorithmMultiplier *
            (prevGameState.executables === 0
              ? 1
              : Math.log(1 + prevGameState.executables * 0.75 + 1) *
                5 *
                prevGameState.executablesMultiplier);

          const newProcessingCoresTotal =
            prevGameState.processingCores + processingCoreProductionTotal;

          const dataProductionTotal =
            config.dataProductionBase *
            prevGameState.algorithms *
            prevGameState.algorithmMultiplier *
            (prevGameState.executables === 0
              ? 1
              : Math.log(1 + prevGameState.executables * 0.75 + 1) *
                5 *
                prevGameState.executablesMultiplier);

          const newDataTotal = prevGameState.totalData + dataProductionTotal;

          const integrationBandwidthTotal = Math.max(
            prevGameState.integrationBandwidth - dataProductionTotal / 2000,
            0,
          );

          checkNetworkMilestones(setGameState, gameState);

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
        setGameState={setGameState}
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
        receiveMemoryShardsPrize={receiveMemoryShardsPrize}
      />

      <button onClick={() => saveGameState(gameState, setGeneratedCode)}>
        Save Game
      </button>
      <div>
        <p>Generated Code:</p>
        <code>{generatedCode}</code>
      </div>
      <div>
        <input
          type="text"
          value={inputCode}
          onChange={handleLoadInputChange}
          placeholder="Enter game state code"
        />
        <button onClick={handleLoadButtonClick}>Load Game</button>
      </div>
      <div>{formatTimeElapsed(gameState.timeElapsed)} elapsed</div>
    </div>
  );
};

export default App;
export type { GameState, Config };

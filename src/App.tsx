import { useState, useEffect } from 'react';
import ResourceDisplay from './components/ResourceDisplay/ResourceDisplay';
import Network from './components/Network/Network';
import Upgrades from './components/Upgrades/Upgrades';
import FileViewer from './components/FileViewer/FileViewer';
import WalletDecryption from './components/WalletDecryption/WalletDecryption';
import Log from './components/Log/Log';
import './app.scss';
import upgrades from './data/upgrades';
import * as networkHelpers from './helpers/networkHelpers';
import * as walletDecryptionHelpers from './helpers/walletDecryptionHelpers';
import * as utilityFunctions from './utility/utilityFunctions';
import { updateGameState } from './utility/gameController';
import { useMemo } from 'react';
import Navbar from './components/Navbar/Navbar';
import FooterNav from './components/FooterNav/FooterNav';
import PurchaseButtons from './components/PurchaseButtons/PurchaseButtons';
import SaveModal from './components/SaveModal/SaveModal';
import GameOverModal from './components/GameOverModal/GameOverModal';

interface GameState {
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

interface Config {
  algorithmCostBase: number;
  algorithmCostRateGrowth: number;
  executablesCostBase: number;
  processingCoreProductionBase: number;
  dataProductionBase: number;
}

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    totalData: 0,
    dataMilestones: [
      1.049e6, 1.049e7, 1.049e8, 1.074e9, 1.074e10, 1.074e11, 1.1e12,
    ],
    dataMilestonesIndex: 0,
    processingCores: 0,
    integrationSpeed: 0,
    integrationBandwidth: 750,
    replenishmentFailed: false,
    replenishmentFailureIndex: 0,
    algorithms: 0,
    executables: 0,
    executablesCost: 100000,
    executablesMultiplier: 1,
    algorithmCost: 6,
    algorithmMultiplier: 1,
    bandwidthReplenishmentCost: 50,
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
    filesMilestones: [15360, 81920, 758291, 1672864, 2097152],
    walletDecryptionActivated: false,
    walletsDecrypted: 0,
    walletsBricked: 0,
    walletDecryptionCost: 1000,
    walletDecryptionIndex: 0,
    fractionalMemoryShards: 0,
    memoryShardsProbability: 0.25,
    memoryShardIndex: 0,
    timeElapsed: 0,
    logMessages: [],
    gameOver: false,
  });

  const [currentView, setCurrentView] = useState<
    'home' | 'files' | 'networks' | 'upgrades' | 'wallet'
  >('home');
  const [revealCount, setRevealCount] = useState(0);
  const [processingCores, setProcessingCores] = useState(0);
  const [isShowingSaveModal, setIsShowingSaveModal] = useState(false);

  const config = useMemo<Config>(
    () => ({
      algorithmCostBase: 6,
      algorithmCostRateGrowth: 1.07,
      executablesCostBase: 10000,
      processingCoreProductionBase: 1.2 / 750,
      dataProductionBase: 1691 / 100,
    }),
    [],
  );

  const allocateToGPU = networkHelpers.allocateToGPU;

  const allocateToStorage = networkHelpers.allocateToStorage;

  const incrementWallets = walletDecryptionHelpers.incrementWallets;

  const receiveCognitumPrize = walletDecryptionHelpers.receiveCognitumPrize;

  const receiveMemoryShardsPrize =
    walletDecryptionHelpers.receiveMemoryShardsPrize;

  const initiateUpgrade = utilityFunctions.initiateUpgrade;

  useEffect(() => {
    const intervalID = setInterval(() => {
      setGameState((prevGameState) =>
        updateGameState(prevGameState, setGameState, config),
      );
    }, 10);

    return () => clearInterval(intervalID);
  }, [config]);

  return (
    <div className="app">
      {gameState.gameOver && <GameOverModal />}
      {isShowingSaveModal && (
        <SaveModal
          gameState={gameState}
          setGameState={setGameState}
          setIsSaveModalShowing={setIsShowingSaveModal}
          setCurrentView={setCurrentView}
        />
      )}
      {gameState.algorithms > 0 && (
        <Navbar
          gameState={gameState}
          currentView={currentView}
          isShowingSaveModal={isShowingSaveModal}
          setIsShowingSaveModal={setIsShowingSaveModal}
        />
      )}
      <div className="main-content">
        <Log gameState={gameState} />
        {currentView === 'home' && (
          <>
            <ResourceDisplay
              gameState={gameState}
              setGameState={setGameState}
              revealCount={revealCount}
              processingCores={processingCores}
            />
            <PurchaseButtons
              gameState={gameState}
              setGameState={setGameState}
              config={config}
              setRevealCount={setRevealCount}
              revealCount={revealCount}
              setProcessingCores={setProcessingCores}
            />
          </>
        )}
        {gameState.filesActivated && (currentView as string) === 'files' && (
          <FileViewer gameState={gameState}></FileViewer>
        )}
        {gameState.networksActivated &&
          (currentView as string) === 'networks' && (
            <Network
              gameState={gameState}
              allocateToGPU={() => allocateToGPU(setGameState)}
              allocateToStorage={() => allocateToStorage(setGameState)}
            />
          )}
        {gameState.networksActivated &&
          (currentView as string) === 'upgrades' && (
            <Upgrades
              gameState={gameState}
              setGameState={setGameState}
              initiateUpgrade={initiateUpgrade}
            />
          )}
        {gameState.walletDecryptionActivated &&
          (currentView as string) === 'wallet' && (
            <WalletDecryption
              gameState={gameState}
              setGameState={setGameState}
              incrementWallets={incrementWallets}
              receiveCognitumPrize={receiveCognitumPrize}
              receiveMemoryShardsPrize={receiveMemoryShardsPrize}
            ></WalletDecryption>
          )}
      </div>
      <FooterNav
        gameState={gameState}
        currentView={currentView}
        setCurrentView={setCurrentView}
      />
    </div>
  );
};

export default App;
export type { GameState, Config };

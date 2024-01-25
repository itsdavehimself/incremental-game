import { useState, useEffect } from 'react';
import ResourceDisplay from './containers/ResourceDisplay/ResourceDisplay';
import Network from './containers/Network/Network';
import Upgrades from './containers/Upgrades/Upgrades';
import FileViewer from './containers/FileViewer/FileViewer';
import WalletDecryption from './containers/WalletDecryption/WalletDecryption';
import Log from './containers/Log/Log';
import './app.scss';
import upgrades from './data/upgrades';
import * as networkHelpers from './helpers/networkHelpers';
import * as walletDecryptionHelpers from './helpers/walletDecryptionHelpers';
import * as utilityFunctions from './utility/utilityFunctions';
import { updateGameState } from './utility/gameController';
import { saveGameStateToLocal, logSavedGame } from './helpers/saveGameHelpers';
import Navbar from './components/Navbar/Navbar';
import FooterNav from './components/FooterNav/FooterNav';
import PurchaseButtons from './containers/PurchaseButtons/PurchaseButtons';
import SaveModal from './components/SaveModal/SaveModal';
import GameOverModal from './components/GameOverModal/GameOverModal';
import { GameState, Config } from './types';
import config from './data/config';

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
    algorithms: 20,
    executables: 0,
    executablesCost: 100000,
    executablesMultiplier: 1,
    algorithmCost: 6,
    algorithmMultiplier: 10,
    bandwidthReplenishmentCost: 50,
    bandwidthMultiplier: 1,
    autoBandwidthReplenishment: true,
    networksActivated: true,
    networks: 0,
    networksAvailable: 0,
    GPUFarms: 0,
    storageFacilities: 0,
    nodesCurrent: 20000,
    nodesTotal: 20000,
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
    bandwidthIndex: 5,
    networksIndex: 0,
    executablesIndex: 0,
    filesActivated: true,
    filesIndex: 0,
    filesMilestones: [15360, 81920, 758291, 1672864, 2097152],
    walletDecryptionActivated: true,
    walletsDecrypted: 23,
    walletsBricked: 2,
    walletDecryptionCost: 1000,
    walletDecryptionIndex: 5,
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
  const [isLoadingSavedGame, setIsLoadingSavedGame] = useState(false);
  const isMobileView = window.innerWidth <= 1023;

  const allocateToGPU = networkHelpers.allocateToGPU;

  const allocateToStorage = networkHelpers.allocateToStorage;

  const incrementWallets = walletDecryptionHelpers.incrementWallets;

  const receiveCognitumPrize = walletDecryptionHelpers.receiveCognitumPrize;

  const receiveMemoryShardsPrize =
    walletDecryptionHelpers.receiveMemoryShardsPrize;

  const initiateUpgrade = utilityFunctions.initiateUpgrade;

  useEffect(() => {
    const savedGameState = localStorage.getItem('gameState');

    if (savedGameState) {
      setGameState((prevGameState) => ({
        ...prevGameState,
        ...JSON.parse(savedGameState),
      }));
    }

    const saveIntervalID = setInterval(() => {
      setGameState((prevGameState) => {
        if (prevGameState.algorithms > 0) {
          saveGameStateToLocal(prevGameState);
          logSavedGame((newGameState) => {
            setGameState(newGameState);
          });
          return prevGameState;
        } else {
          return prevGameState;
        }
      });
    }, 120000);

    const gameUpdateIntervalID = setInterval(() => {
      setGameState((prevGameState) =>
        updateGameState(prevGameState, setGameState, config),
      );
    }, 10);

    return () => {
      clearInterval(saveIntervalID);
      clearInterval(gameUpdateIntervalID);
    };
  }, []);

  return (
    <div className="app">
      {gameState.gameOver && <GameOverModal setGameState={setGameState} />}
      {isShowingSaveModal && (
        <SaveModal
          gameState={gameState}
          setGameState={setGameState}
          setIsSaveModalShowing={setIsShowingSaveModal}
          setCurrentView={setCurrentView}
          setIsLoadingSavedGame={setIsLoadingSavedGame}
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
      {isMobileView ? (
        <>
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
            {gameState.filesActivated &&
              (currentView as string) === 'files' && (
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
          <nav className={'footer-navbar'}>
            <FooterNav
              gameState={gameState}
              currentView={currentView}
              setCurrentView={setCurrentView}
              isLoadingSavedGame={isLoadingSavedGame}
              setIsLoadingSavedGame={setIsLoadingSavedGame}
            />
          </nav>
        </>
      ) : (
        <div className="main-content">
          <div className="content-column-1">
            {gameState.filesActivated && (
              <div className="files">
                <FileViewer gameState={gameState}></FileViewer>
              </div>
            )}
            {gameState.networksActivated && (
              <div className="networks">
                <Network
                  gameState={gameState}
                  allocateToGPU={() => allocateToGPU(setGameState)}
                  allocateToStorage={() => allocateToStorage(setGameState)}
                />
              </div>
            )}
          </div>
          <div className="content-column-2">
            <div className="log">
              <Log gameState={gameState} />
            </div>
            <div className="resources-buttons">
              <div>
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
              </div>
            </div>
          </div>
          <div className="content-column-3">
            <div className="upgrades">
              {gameState.networksActivated && (
                <Upgrades
                  gameState={gameState}
                  setGameState={setGameState}
                  initiateUpgrade={initiateUpgrade}
                />
              )}
            </div>
            <div className="decryption">
              {gameState.walletDecryptionActivated && (
                <WalletDecryption
                  gameState={gameState}
                  setGameState={setGameState}
                  incrementWallets={incrementWallets}
                  receiveCognitumPrize={receiveCognitumPrize}
                  receiveMemoryShardsPrize={receiveMemoryShardsPrize}
                ></WalletDecryption>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
export type { GameState, Config };

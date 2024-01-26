import { useState, useEffect } from 'react';
import ResourceDisplay from './containers/ResourceDisplay/ResourceDisplay';
import Network from './containers/Network/Network';
import Upgrades from './containers/Upgrades/Upgrades';
import FileViewer from './containers/FileViewer/FileViewer';
import WalletDecryption from './containers/WalletDecryption/WalletDecryption';
import Log from './containers/Log/Log';
import './app.scss';
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
import { useGameState } from './gameState';

const App: React.FC = () => {
  const { gameState, setGameState } = useGameState();
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

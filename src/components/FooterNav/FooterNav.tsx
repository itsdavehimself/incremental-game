import NetworkIcon from '../icons/NetworkIcon';
import ProcessorIcon from '../icons/ProcessorIcon';
import ExplorerIcon from '../icons/ExplorerIcon';
import styles from './FooterNav.module.scss';
import UpgradeIcon from '../icons/UpgradeIcon';
import DecryptIcon from '../icons/DecryptIcon';
import AlertIcon from '../icons/AlertIcon';
import { GameState } from '../../types';
import { useState, useEffect, useRef } from 'react';
import isUpgradeAvailable from './FooterNavHelpers';

interface FooterNavProps {
  currentView: string;
  setCurrentView: React.Dispatch<
    React.SetStateAction<
      'home' | 'files' | 'upgrades' | 'networks' | 'upgrades' | 'wallet'
    >
  >;
  gameState: GameState;
  isLoadingSavedGame: boolean;
  setIsLoadingSavedGame: React.Dispatch<React.SetStateAction<boolean>>;
}

const FooterNav: React.FC<FooterNavProps> = ({
  currentView,
  setCurrentView,
  gameState,
  isLoadingSavedGame,
  setIsLoadingSavedGame,
}) => {
  const prevNetworks = useRef<number>(gameState.networks);
  const [isFileAlertShowing, setIsFileAlertShowing] = useState<boolean>(false);
  const [isNetworkAlertShowing, setIsNetworkAlertShowing] =
    useState<boolean>(false);
  const [isUpgradeAlertShowing, setIsUpgradeAlertShowing] = useState(false);

  useEffect(() => {
    if (isLoadingSavedGame) {
      setIsFileAlertShowing(false);
      setIsLoadingSavedGame(false);
      return;
    }
    if (currentView === 'files') {
      return;
    }
    setIsFileAlertShowing(true);
  }, [gameState.filesIndex]);

  useEffect(() => {
    if (isLoadingSavedGame) {
      setIsLoadingSavedGame(false);
      return;
    }
    if (
      isLoadingSavedGame ||
      currentView === 'networks' ||
      gameState.networks <= prevNetworks.current
    ) {
      return;
    }

    setIsNetworkAlertShowing(true);
    prevNetworks.current = gameState.networks;
  }, [gameState.networks]);

  useEffect(() => {
    if (isUpgradeAvailable(gameState)) {
      setIsUpgradeAlertShowing(true);
      return;
    }

    setIsUpgradeAlertShowing(false);
  }, [gameState]);

  return (
    <nav className={styles.footer}>
      <button onClick={() => setCurrentView('home')}>
        {gameState.algorithms >= 1 && (
          <div className={styles['nav-icon']}>
            <ProcessorIcon />
          </div>
        )}
      </button>

      <button
        onClick={() => {
          setCurrentView('files');
          setIsFileAlertShowing(false);
        }}
        disabled={!gameState.filesActivated}
      >
        {gameState.filesActivated && (
          <>
            <div className={styles['nav-icon']}>
              {isFileAlertShowing && (
                <div className={styles.alert}>
                  <AlertIcon />
                </div>
              )}
              <ExplorerIcon />
            </div>
          </>
        )}
      </button>
      <button
        onClick={() => {
          setCurrentView('networks');
          setIsNetworkAlertShowing(false);
        }}
        disabled={!gameState.networksActivated}
      >
        {gameState.networksActivated && (
          <div className={styles['nav-icon']}>
            {(isNetworkAlertShowing || gameState.networksAvailable > 0) && (
              <div className={styles.alert}>
                <AlertIcon />
              </div>
            )}
            <NetworkIcon />
          </div>
        )}
      </button>
      <button
        onClick={() => setCurrentView('upgrades')}
        disabled={!gameState.networksActivated}
      >
        {gameState.networksActivated && (
          <div className={styles['nav-icon']}>
            {isUpgradeAlertShowing && (
              <div className={styles.alert}>
                <AlertIcon />
              </div>
            )}
            <UpgradeIcon />
          </div>
        )}
      </button>
      <button
        onClick={() => setCurrentView('wallet')}
        disabled={!gameState.walletDecryptionActivated}
      >
        {gameState.walletDecryptionActivated && (
          <div className={styles['nav-icon']}>
            <DecryptIcon />
          </div>
        )}
      </button>
    </nav>
  );
};

export default FooterNav;

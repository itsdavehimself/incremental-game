import NetworkIcon from '../icons/NetworkIcon';
import ProcessorIcon from '../icons/ProcessorIcon';
import ExplorerIcon from '../icons/ExplorerIcon';
import styles from './FooterNav.module.scss';
import UpgradeIcon from '../icons/UpgradeIcon';
import DecryptIcon from '../icons/DecryptIcon';
import { GameState } from '../../App';

interface FooterNavProps {
  currentView: string;
  setCurrentView: React.Dispatch<
    React.SetStateAction<
      'home' | 'files' | 'upgrades' | 'networks' | 'upgrades' | 'wallet'
    >
  >;
  gameState: GameState;
}

const FooterNav: React.FC<FooterNavProps> = ({ setCurrentView, gameState }) => {
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
        onClick={() => setCurrentView('files')}
        disabled={!gameState.filesActivated}
      >
        {gameState.filesActivated && (
          <div className={styles['nav-icon']}>
            <ExplorerIcon />
          </div>
        )}
      </button>
      <button
        onClick={() => setCurrentView('networks')}
        disabled={!gameState.networksActivated}
      >
        {gameState.networksActivated && (
          <div className={styles['nav-icon']}>
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

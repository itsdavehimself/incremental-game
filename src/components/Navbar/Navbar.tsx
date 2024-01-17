import styles from './Navbar.module.scss';
import { GameState } from '../../App';
import { formatData } from '../../helpers/formatHelpers';
import SaveGameIcon from '../icons/SaveGameIcon';

interface NavbarProps {
  gameState: GameState;
  currentView:
    | 'home'
    | 'files'
    | 'upgrades'
    | 'networks'
    | 'upgrades'
    | 'wallet';
  isShowingSaveModal: boolean;
  setIsShowingSaveModal: React.Dispatch<React.SetStateAction<boolean>>;
}

const Navbar: React.FC<NavbarProps> = ({
  gameState,
  currentView,
  setIsShowingSaveModal,
}) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>LOGO</div>
      {currentView !== 'home' && (
        <div className={styles.data}>{formatData(gameState.totalData)}</div>
      )}

      <button
        className={styles['navbar-button']}
        onClick={() => setIsShowingSaveModal(true)}
      >
        <div className={styles['save-icon']}>
          <SaveGameIcon />
        </div>
      </button>
    </nav>
  );
};

export default Navbar;

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
}

const Navbar: React.FC<NavbarProps> = ({ gameState, currentView }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>LOGO</div>
      {currentView !== 'home' && (
        <div className={styles.data}>{formatData(gameState.totalData)}</div>
      )}

      <div className={styles.save}>
        <SaveGameIcon />
      </div>
    </nav>
  );
};

export default Navbar;

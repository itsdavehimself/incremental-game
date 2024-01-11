import styles from './Navbar.module.scss';
import { GameState } from '../../App';
import { formatData } from '../../helpers/formatHelpers';

interface NavbarProps {
  gameState: GameState;
}

const Navbar: React.FC<NavbarProps> = ({ gameState }) => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.logo}>LOGO</div>
      <div className={styles.data}>{formatData(gameState.totalData)}</div>
      <div className={styles.hamburger}>SAVE</div>
    </nav>
  );
};

export default Navbar;

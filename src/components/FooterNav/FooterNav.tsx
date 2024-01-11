import styles from './FooterNav.module.scss';

const FooterNav: React.FC = () => {
  return (
    <nav className={styles.footer}>
      <button>HOME</button>
      <button>FILES</button>
      <button>NETWORKS</button>
      <button>UPGRADES</button>
      <button>DECRYPTION</button>
    </nav>
  );
};

export default FooterNav;

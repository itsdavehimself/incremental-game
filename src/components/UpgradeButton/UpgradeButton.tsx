import styles from './UpgradeButton.module.scss';

interface UpgradeButtonProps {
  onClick: () => void;
  upgradeName: string;
  upgradeDescription: string;
  upgradeCost: string;
  upgradeCurrency: string;
  disabled: boolean;
}

const UpgradeButton: React.FC<UpgradeButtonProps> = ({
  onClick,
  upgradeName,
  upgradeDescription,
  upgradeCost,
  upgradeCurrency,
  disabled,
}) => {
  return (
    <button
      className={styles['main-btn']}
      onClick={onClick}
      disabled={disabled}
    >
      <h3>{upgradeName}</h3>
      <p>{upgradeDescription}</p>
      {upgradeCost} {upgradeCurrency}
    </button>
  );
};

export default UpgradeButton;

import styles from './UpgradeButton.module.scss';
import { CostBreakdown } from '../../data/upgrades';

interface UpgradeButtonProps {
  onClick: () => void;
  upgradeName: string;
  upgradeDescription: string;
  upgradeCost: CostBreakdown[];
  disabled: boolean;
}

const UpgradeButton: React.FC<UpgradeButtonProps> = ({
  onClick,
  upgradeName,
  upgradeDescription,
  upgradeCost,
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
      {upgradeCost.map((cost, index) => (
        <div key={index}>
          {cost.amount.toLocaleString()} {cost.currency}
        </div>
      ))}
    </button>
  );
};

export default UpgradeButton;

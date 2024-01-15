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
    <>
      <button
        className={styles['main-btn']}
        onClick={onClick}
        disabled={disabled}
      >
        <div className={styles['btn-text']}>
          <h4>{upgradeName.toUpperCase()}</h4>
          <p>{upgradeDescription}</p>
          <div>
            {upgradeCost.map((cost, index) => (
              <div key={index} className={styles['upgrade-cost']}>
                {cost.amount.toLocaleString()} {cost.currency}
              </div>
            ))}
          </div>
        </div>
      </button>
      <div className={styles['line-container']}>
        <div className={styles.line}></div>
        <div className={styles.rectangle}></div>
      </div>
    </>
  );
};

export default UpgradeButton;

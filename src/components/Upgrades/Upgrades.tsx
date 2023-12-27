import UpgradeButton from '../UpgradeButton/UpgradeButton';
import upgrades from '../../data/upgrades';

interface UpgradesProps {
  gameState: {
    totalData: number;
    processingCores: number;
    integrationSpeed: number;
    integrationBandwidth: number;
    algorithms: number;
    executables: number;
    algorithmCost: number;
    algorithmMultiplier: number;
    algorithmMultiplierIndex: number;
    algorithMultiplierPercentage: Array<number>;
    bandwidthMultiplier: number;
    bandwidthMultiplierIndex: number;
    bandwidthMultiplierPercentage: Array<number>;
    autoBandwidthReplenishment: boolean;
    networksActivated: boolean;
    networks: number;
    networksAvailable: number;
    GPUFarms: number;
    storageFacilities: number;
    nodesCurrent: number;
    nodesTotal: number;
    cognitum: number;
  };
  upgradeBandwidthReplenishment: () => void;
  activateMultiplier: () => void;
}

const Upgrades: React.FC<UpgradesProps> = ({
  activateMultiplier,
  upgradeBandwidthReplenishment,
}) => {
  return (
    <div>
      <UpgradeButton
        onClick={activateMultiplier}
        upgradeName={`${upgrades.integrationAlgorithms[0].name}`}
        upgradeDescription={`${upgrades.integrationAlgorithms[0].description}`}
        upgradeCost={`${upgrades.integrationAlgorithms[0].cost.amount}`}
        upgradeCurrency={`${upgrades.integrationAlgorithms[0].cost.currency}`}
      ></UpgradeButton>
      <UpgradeButton
        onClick={upgradeBandwidthReplenishment}
        upgradeName={`${upgrades.bandwidth[0].name}`}
        upgradeDescription={`${upgrades.bandwidth[0].description}`}
        upgradeCost={`${upgrades.bandwidth[0].cost.amount}`}
        upgradeCurrency={`${upgrades.bandwidth[0].cost.currency}`}
      ></UpgradeButton>
      <UpgradeButton
        onClick={upgradeBandwidthReplenishment}
        upgradeName={`${upgrades.bandwidth[1].name}`}
        upgradeDescription={`${upgrades.bandwidth[1].description}`}
        upgradeCost={`${upgrades.bandwidth[1].cost.amount}`}
        upgradeCurrency={`${upgrades.bandwidth[1].cost.currency}`}
      ></UpgradeButton>
      <UpgradeButton
        onClick={upgradeBandwidthReplenishment}
        upgradeName={`${upgrades.bandwidth[2].name}`}
        upgradeDescription={`${upgrades.bandwidth[2].description}`}
        upgradeCost={`${upgrades.bandwidth[2].cost.amount}`}
        upgradeCurrency={`${upgrades.bandwidth[2].cost.currency}`}
      ></UpgradeButton>
      <UpgradeButton
        onClick={upgradeBandwidthReplenishment}
        upgradeName={`${upgrades.bandwidth[3].name}`}
        upgradeDescription={`${upgrades.bandwidth[3].description}`}
        upgradeCost={`${upgrades.bandwidth[3].cost.amount}`}
        upgradeCurrency={`${upgrades.bandwidth[3].cost.currency}`}
      ></UpgradeButton>
      <UpgradeButton
        onClick={upgradeBandwidthReplenishment}
        upgradeName={`${upgrades.bandwidth[4].name}`}
        upgradeDescription={`${upgrades.bandwidth[4].description}`}
        upgradeCost={`${upgrades.bandwidth[4].cost.amount}`}
        upgradeCurrency={`${upgrades.bandwidth[4].cost.currency}`}
      ></UpgradeButton>
    </div>
  );
};

export default Upgrades;

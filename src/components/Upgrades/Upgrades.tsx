import UpgradeButton from '../UpgradeButton/UpgradeButton';
import upgrades, { Upgrade } from '../../data/upgrades';

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
    bandwidthMultiplier: number;
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
  upgradeBandwidthReplenishment: (
    multiplierPercentage: number | null,
    cost: number,
  ) => void;
  upgradeIntegrationAlgorithm: (
    multiplierPercentage: number | null,
    cost: number,
  ) => void;
}

const Upgrades: React.FC<UpgradesProps> = ({
  gameState,
  upgradeIntegrationAlgorithm,
  upgradeBandwidthReplenishment,
}) => {
  const handleUpgradeClick = (upgrade: Upgrade) => {
    if (!upgrade.purchased) {
      upgrade.purchased = true;

      if (upgrade.type === 'integration') {
        upgradeIntegrationAlgorithm(upgrade.multiplier, upgrade.cost.amount);
      } else {
        upgradeBandwidthReplenishment(upgrade.multiplier, upgrade.cost.amount);
      }
    }
  };

  return (
    <div>
      {upgrades.integrationAlgorithms.map(
        (upgrade, index) =>
          !upgrade.purchased && (
            <UpgradeButton
              key={index}
              onClick={() => handleUpgradeClick(upgrade)}
              upgradeName={upgrade.name}
              upgradeDescription={upgrade.description}
              upgradeCost={upgrade.cost.amount.toString()}
              upgradeCurrency={upgrade.cost.currency}
              disabled={gameState.nodesCurrent < upgrade.cost.amount}
            />
          ),
      )}

      {upgrades.bandwidth.map(
        (upgrade, index) =>
          !upgrade.purchased && (
            <UpgradeButton
              key={index}
              onClick={() => handleUpgradeClick(upgrade)}
              upgradeName={upgrade.name}
              upgradeDescription={upgrade.description}
              upgradeCost={upgrade.cost.amount.toString()}
              upgradeCurrency={upgrade.cost.currency}
              disabled={gameState.nodesCurrent < upgrade.cost.amount}
            />
          ),
      )}
    </div>
  );
};

export default Upgrades;

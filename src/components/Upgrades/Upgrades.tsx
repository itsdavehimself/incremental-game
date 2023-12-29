import UpgradeButton from '../UpgradeButton/UpgradeButton';
import upgrades, { Upgrade } from '../../data/upgrades';
import { useState } from 'react';

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
  const [
    visibleIntegrationAlgorithmIndex,
    setVisibleIntegrationAlgorithmIndex,
  ] = useState(0);
  const [visibleBandwidthIndex, setVisibleBandwidthIndex] = useState(0);

  const handleUpgradeClick = (upgrade: Upgrade, category: string) => {
    if (!upgrade.purchased) {
      upgrade.purchased = true;

      if (category === 'integration') {
        upgradeIntegrationAlgorithm(upgrade.multiplier, upgrade.cost.amount);
        setVisibleIntegrationAlgorithmIndex(
          visibleIntegrationAlgorithmIndex + 1,
        );
      } else {
        upgradeBandwidthReplenishment(upgrade.multiplier, upgrade.cost.amount);
        setVisibleBandwidthIndex(visibleBandwidthIndex + 1);
      }
    }
  };

  const renderUpgradeButton = (
    upgrade: Upgrade,
    category: string,
    index: number,
  ) => (
    <UpgradeButton
      key={index}
      onClick={() => handleUpgradeClick(upgrade, category)}
      upgradeName={upgrade.name}
      upgradeDescription={upgrade.description}
      upgradeCost={upgrade.cost.amount.toLocaleString()}
      upgradeCurrency={upgrade.cost.currency}
      disabled={gameState.nodesCurrent < upgrade.cost.amount}
    />
  );

  return (
    <div>
      {upgrades.integrationAlgorithms
        .filter(
          (upgrade, index) =>
            !upgrade.purchased && index === visibleIntegrationAlgorithmIndex,
        )
        .map((upgrade, index) =>
          renderUpgradeButton(upgrade, 'integration', index),
        )}

      {upgrades.bandwidth
        .filter(
          (upgrade, index) =>
            !upgrade.purchased && index === visibleBandwidthIndex,
        )
        .map((upgrade, index) =>
          renderUpgradeButton(upgrade, 'bandwidth', index),
        )}
    </div>
  );
};

export default Upgrades;

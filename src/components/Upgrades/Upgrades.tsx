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
    upgrades: object;
    integrationAlgorithmIndex: number;
    bandwidthIndex: number;
    networksIndex: number;
    executablesIndex: number;
    walletDecryptionIndex: number;
  };
  handleUpgradeClick: (upgrade: Upgrade, category: string) => void;
}

const Upgrades: React.FC<UpgradesProps> = ({
  gameState,
  handleUpgradeClick,
}) => {
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
      upgradeCost={upgrade.cost}
      disabled={(() => {
        for (let i = 0; i < upgrade.cost.length; i++) {
          const currency = upgrade.cost[i].currency;
          const amount = upgrade.cost[i].amount;

          if (currency === 'Cognitum' && gameState.cognitum < amount) {
            return true;
          }

          if (currency === 'Nodes' && gameState.nodesCurrent < amount) {
            return true;
          }
        }

        return false;
      })()}
    />
  );

  return (
    <>
      {gameState.networksActivated && (
        <div>
          {upgrades.integrationAlgorithms
            .filter(
              (upgrade, index) =>
                !upgrade.purchased &&
                index === gameState.integrationAlgorithmIndex,
            )
            .map((upgrade, index) =>
              renderUpgradeButton(upgrade, 'integration', index),
            )}

          {upgrades.bandwidth
            .filter(
              (upgrade, index) =>
                !upgrade.purchased && index === gameState.bandwidthIndex,
            )
            .map((upgrade, index) =>
              renderUpgradeButton(upgrade, 'bandwidth', index),
            )}

          {upgrades.network
            .filter(
              (upgrade, index) =>
                !upgrade.purchased && index === gameState.networksIndex,
            )
            .map((upgrade, index) =>
              renderUpgradeButton(upgrade, 'network', index),
            )}

          {gameState.executables > 0 &&
            upgrades.executables
              .filter(
                (upgrade, index) =>
                  !upgrade.purchased && index === gameState.executablesIndex,
              )
              .map((upgrade, index) =>
                renderUpgradeButton(upgrade, 'executables', index),
              )}

          {gameState.nodesTotal >= 10000 &&
            upgrades.wallets
              .filter(
                (upgrade, index) =>
                  !upgrade.purchased &&
                  index === gameState.walletDecryptionIndex,
              )
              .map((upgrade, index) =>
                renderUpgradeButton(upgrade, 'wallets', index),
              )}
        </div>
      )}
    </>
  );
};

export default Upgrades;

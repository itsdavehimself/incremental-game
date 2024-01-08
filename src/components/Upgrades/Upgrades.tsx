import UpgradeButton from '../UpgradeButton/UpgradeButton';
import upgrades, { Upgrade } from '../../data/upgrades';
import { GameState } from '../../App';

interface UpgradesProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  handleUpgradeClick: (
    upgrade: Upgrade,
    category: string,
    setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  ) => void;
}

const Upgrades: React.FC<UpgradesProps> = ({
  gameState,
  setGameState,
  handleUpgradeClick,
}) => {
  const renderUpgradeButton = (
    upgrade: Upgrade,
    category: string,
    index: number,
  ) => (
    <UpgradeButton
      key={index}
      onClick={() => handleUpgradeClick(upgrade, category, setGameState)}
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

          if (
            currency === 'Processing Cores' &&
            gameState.processingCores < amount
          ) {
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
              renderUpgradeButton(upgrade, 'networks', index),
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

          {gameState.walletsDecrypted >= 15 &&
            upgrades.shards
              .filter(
                (upgrade, index) =>
                  !upgrade.purchased && index === gameState.memoryShardIndex,
              )
              .map((upgrade, index) =>
                renderUpgradeButton(upgrade, 'shards', index),
              )}
        </div>
      )}
    </>
  );
};

export default Upgrades;

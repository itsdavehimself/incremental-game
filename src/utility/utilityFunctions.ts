import { Upgrade } from '../data/upgrades';
import { GameState } from '../App';
import { upgradeIntegrationAlgorithm } from '../helpers/integrationAlgorithmHelpers';
import {
  replenishBandwidth,
  upgradeBandwidthReplenishment,
} from '../helpers/bandwidthHelpers';
import { buyNetwork } from '../helpers/networkHelpers';
import { upgradeWalletDecryption } from '../helpers/walletDecryptionHelpers';
import { upgradeExecutables } from '../helpers/executablesHelpers';
import { upgradeMemoryShardsProbability } from '../helpers/walletDecryptionHelpers';
import { decodeGameState } from '../helpers/saveGameHelpers';

const initiateUpgrade = (
  upgrade: Upgrade,
  category: string,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
) => {
  switch (category) {
    case 'integration':
      upgradeIntegrationAlgorithm(
        upgrade.multiplier,
        upgrade.cost,
        setGameState,
      );
      break;
    case 'bandwidth':
      upgradeBandwidthReplenishment(
        upgrade.multiplier,
        upgrade.cost,
        setGameState,
      );
      break;
    case 'networks':
      buyNetwork(upgrade.cost, setGameState);
      break;
    case 'wallets':
      upgradeWalletDecryption(upgrade.cost, setGameState);
      break;
    case 'executables':
      upgradeExecutables(upgrade.multiplier, upgrade.cost, setGameState);
      break;
    case 'shards':
      upgradeMemoryShardsProbability(
        upgrade.multiplier,
        upgrade.cost,
        setGameState,
      );
      break;
    case 'compromise':
      replenishBandwidth(setGameState);
  }
};

const handleLoadButtonClick = (
  inputCode: string,
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
) => {
  const loadedState = decodeGameState(inputCode);
  if (loadedState) {
    setGameState(loadedState);
  } else {
    console.error('Invalid game state code');
  }
};

export { initiateUpgrade, handleLoadButtonClick };

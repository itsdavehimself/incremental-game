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
  setIsSaveModalShowing: React.Dispatch<React.SetStateAction<boolean>>,
  setIsInvalidCodeShowing: React.Dispatch<React.SetStateAction<boolean>>,
  setIsLoadingShowing: React.Dispatch<React.SetStateAction<boolean>>,
  setCurrentView: React.Dispatch<
    React.SetStateAction<'home' | 'files' | 'networks' | 'upgrades' | 'wallet'>
  >,
) => {
  const loadedState = decodeGameState(inputCode);
  if (loadedState) {
    setIsLoadingShowing(true);

    setTimeout(() => {
      setIsLoadingShowing(false);
      setGameState(loadedState);
      setIsSaveModalShowing(false);
      setCurrentView('home');
    }, 500);
  } else {
    setIsInvalidCodeShowing(true);

    setTimeout(() => {
      setIsInvalidCodeShowing(false);
    }, 3500);
  }
};

export { initiateUpgrade, handleLoadButtonClick };

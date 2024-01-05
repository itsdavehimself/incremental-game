import Button from '../../components/Button/Button';
import ResourceDisplay from '../../components/ResourceDisplay/ResourceDisplay';
import Network from '../../components/Network/Network';
import Upgrades from '../../components/Upgrades/Upgrades';
import FileViewer from '../../components/FileViewer/FileViewer';
import WalletDecryption from '../../components/WalletDecryption/WalletDecryption';
import { Upgrade } from '../../data/upgrades';

interface GameUIProps {
  gameState: {
    totalData: number;
    processingCores: number;
    integrationSpeed: number;
    integrationBandwidth: number;
    algorithms: number;
    executables: number;
    executablesCost: number;
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
    networkMilestones: Array<number>;
    networkMilestonesIndex: number;
    upgrades: object;
    integrationAlgorithmIndex: number;
    bandwidthIndex: number;
    networksIndex: number;
    executablesIndex: number;
    filesActivated: boolean;
    filesIndex: number;
    walletDecryptionActivated: boolean;
    walletsDecrypted: number;
    walletsBricked: number;
    walletDecryptionCost: number;
    walletDecryptionIndex: number;
  };
  config: {
    bandwidthReplenishmentCost: number;
  };
  synthesizeAlgorithm: () => void;
  createExecutable: () => void;
  replenishBandwidth: () => void;
  allocateToGPU: () => void;
  allocateToStorage: () => void;
  handleUpgradeClick: (upgrade: Upgrade, category: string) => void;
  incrementWallets: (decrypted: boolean) => void;
  receiveCognitumPrize: (prize: number) => void;
  purchaseWalletDecryption: () => void;
}

const GameUI: React.FC<GameUIProps> = ({
  gameState,
  config,
  synthesizeAlgorithm,
  createExecutable,
  replenishBandwidth,
  allocateToGPU,
  allocateToStorage,
  handleUpgradeClick,
  incrementWallets,
  receiveCognitumPrize,
  purchaseWalletDecryption,
}) => {
  return (
    <div>
      <ResourceDisplay gameState={gameState} />
      <Button
        onClick={synthesizeAlgorithm}
        label={`Synthesize Algorithm (${gameState.algorithmCost.toLocaleString()} Processing Cores)`}
      ></Button>
      <Button
        onClick={replenishBandwidth}
        label={`Replenish Bandwidth (${config.bandwidthReplenishmentCost} Processing Cores)`}
      ></Button>
      <Button
        onClick={createExecutable}
        label={`Create .exe Binary (${gameState.executablesCost.toLocaleString()} Processing Cores)`}
      ></Button>
      <Upgrades gameState={gameState} handleUpgradeClick={handleUpgradeClick} />
      {gameState.filesActivated && (
        <FileViewer gamestate={gameState}></FileViewer>
      )}
      {gameState.networksActivated && (
        <Network
          gameState={gameState}
          allocateToGPU={allocateToGPU}
          allocateToStorage={allocateToStorage}
        />
      )}
      {gameState.walletDecryptionActivated && (
        <WalletDecryption
          gameState={gameState}
          incrementWallets={incrementWallets}
          receiveCognitumPrize={receiveCognitumPrize}
          purchaseWalletDecryption={purchaseWalletDecryption}
        ></WalletDecryption>
      )}
    </div>
  );
};

export default GameUI;

import Button from '../../components/Button/Button';
import ResourceDisplay from '../../components/ResourceDisplay/ResourceDisplay';
import Network from '../../components/Network/Network';
import Upgrades from '../../components/Upgrades/Upgrades';
import { Upgrade } from '../../data/upgrades';

interface GameUIProps {
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
    networkMilestones: Array<number>;
    networkMilestonesIndex: number;
    upgrades: object;
    integrationAlgorithmIndex: number;
    bandwidthIndex: number;
    networksIndex: number;
  };
  synthesizeAlgorithm: () => void;
  replenishBandwidth: () => void;
  upgradeIntegrationAlgorithm: (
    multiplierPercentage: number | null,
    cost: number,
  ) => void;
  upgradeBandwidthReplenishment: (
    multiplierPercentage: number | null,
    cost: number,
  ) => void;
  buyNetwork: (cost: number) => void;
  allocateToGPU: () => void;
  allocateToStorage: () => void;
  handleUpgradeClick: (upgrade: Upgrade, category: string) => void;
}

const GameUI: React.FC<GameUIProps> = ({
  gameState,
  synthesizeAlgorithm,
  replenishBandwidth,
  upgradeIntegrationAlgorithm,
  upgradeBandwidthReplenishment,
  allocateToGPU,
  allocateToStorage,
  buyNetwork,
  handleUpgradeClick,
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
        label={`Replenish Bandwidth (50 Processing Cores)`}
      ></Button>
      <Upgrades
        gameState={gameState}
        upgradeIntegrationAlgorithm={upgradeIntegrationAlgorithm}
        upgradeBandwidthReplenishment={upgradeBandwidthReplenishment}
        buyNetwork={buyNetwork}
        handleUpgradeClick={handleUpgradeClick}
      />
      {gameState.networksActivated && (
        <Network
          gameState={gameState}
          allocateToGPU={allocateToGPU}
          allocateToStorage={allocateToStorage}
        />
      )}
    </div>
  );
};

export default GameUI;

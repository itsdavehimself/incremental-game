import Button from '../../components/Button/Button';
import ResourceDisplay from '../../components/ResourceDisplay/ResourceDisplay';
import Network from '../../components/Network/Network';
import Upgrades from '../../components/Upgrades/Upgrades';

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
  allocateToGPU: () => void;
  allocateToStorage: () => void;
}

const GameUI: React.FC<GameUIProps> = ({
  gameState,
  synthesizeAlgorithm,
  replenishBandwidth,
  upgradeIntegrationAlgorithm,
  upgradeBandwidthReplenishment,
  allocateToGPU,
  allocateToStorage,
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

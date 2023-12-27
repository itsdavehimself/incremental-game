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
  synthesizeAlgorithm: () => void;
  replenishBandwidth: () => void;
  activateMultiplier: () => void;
  upgradeBandwidthReplenishment: () => void;
  allocateToGPU: () => void;
  allocateToStorage: () => void;
}

const GameUI: React.FC<GameUIProps> = ({
  gameState,
  synthesizeAlgorithm,
  replenishBandwidth,
  activateMultiplier,
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
        activateMultiplier={activateMultiplier}
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

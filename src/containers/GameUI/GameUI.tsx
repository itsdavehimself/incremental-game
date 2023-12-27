import Button from '../../components/Button/Button';
import ResourceDisplay from '../../components/ResourceDisplay/ResourceDisplay';
import Network from '../../components/Network/Network';

interface GameUIProps {
  gameState: {
    totalData: number;
    processingCores: number;
    integrationSpeed: number;
    integrationStamina: number;
    algorithms: number;
    executables: number;
    algorithmCost: number;
    algorithmMultiplier: number;
    algorithmMultiplierIndex: number;
    algorithMultiplierPercentage: Array<number>;
    staminaMultiplier: number;
    staminaMultiplierIndex: number;
    staminaMultiplierPercentage: Array<number>;
    autoStaminaReplenishment: boolean;
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
  replenishStamina: () => void;
  activateMultiplier: () => void;
  upgradeStaminaReplenishment: () => void;
}

const GameUI: React.FC<GameUIProps> = ({
  gameState,
  synthesizeAlgorithm,
  replenishStamina,
  activateMultiplier,
  upgradeStaminaReplenishment,
}) => {
  return (
    <div>
      <ResourceDisplay gameState={gameState} />
      <Button
        onClick={synthesizeAlgorithm}
        label={`Synthesize Algorithm (${gameState.algorithmCost.toLocaleString()} Processing Cores)`}
      ></Button>
      <Button
        onClick={replenishStamina}
        label={`Replenish Stamina (50 Processing Cores)`}
      ></Button>
      <Button
        onClick={upgradeStaminaReplenishment}
        label={`Increase Stamina Replishment by ${
          gameState.staminaMultiplierPercentage[
            gameState.staminaMultiplierIndex
          ] * 100
        }%`}
      ></Button>
      <Button onClick={activateMultiplier} label="Multiplier"></Button>
      <Network gameState={gameState} />
    </div>
  );
};

export default GameUI;

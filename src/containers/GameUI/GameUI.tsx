import Button from '../../components/Button/Button';
import ResourceDisplay from '../../components/ResourceDisplay/ResourceDisplay';

interface GameUIProps {
  gameState: {
    totalData: number;
    processingCores: number;
    integrationSpeed: number;
    integrationEfficiency: number;
    algorithms: number;
    executables: number;
    algorithmCost: number;
  };
  synthesizeAlgorithm: () => void;
  upgradeEfficiency: () => void;
  activateMultiplier: () => void;
}

const GameUI: React.FC<GameUIProps> = ({
  gameState,
  synthesizeAlgorithm,
  upgradeEfficiency,
  activateMultiplier,
}) => {
  return (
    <div>
      <ResourceDisplay gameState={gameState} />
      <Button
        onClick={synthesizeAlgorithm}
        label={`Synthesize Algorithm (${gameState.algorithmCost.toLocaleString()} Processing Cores)`}
      ></Button>
      <Button
        onClick={upgradeEfficiency}
        label={`Replenish Stamina (50 Processing Cores)`}
      ></Button>
      <Button onClick={activateMultiplier} label="Multiplier"></Button>
    </div>
  );
};

export default GameUI;

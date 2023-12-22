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
  addMultiplierTimesTwo: () => void;
  addMultiplierTimesFour: () => void;
  addMultiplierTimesEight: () => void;
  addMultiplierTimesSixteen: () => void;
  addMultiplierTimesThirtyTwo: () => void;
  addMultiplierTimesSixtyFour: () => void;
}

const GameUI: React.FC<GameUIProps> = ({
  gameState,
  synthesizeAlgorithm,
  upgradeEfficiency,
  addMultiplierTimesTwo,
  addMultiplierTimesFour,
  addMultiplierTimesEight,
  addMultiplierTimesSixteen,
  addMultiplierTimesThirtyTwo,
  addMultiplierTimesSixtyFour,
}) => {
  return (
    <div>
      <ResourceDisplay gameState={gameState} />
      <Button
        onClick={synthesizeAlgorithm}
        label={`Synthesize Algorithm (${gameState.algorithmCost} Processing Cores)`}
      ></Button>
      <Button
        onClick={upgradeEfficiency}
        label={`Replenish Stamina (20 Processing Cores)`}
      ></Button>
      <Button onClick={addMultiplierTimesTwo} label="Multiplier x2"></Button>
      <Button onClick={addMultiplierTimesFour} label="Multiplier x4"></Button>
      <Button onClick={addMultiplierTimesEight} label="Multiplier x8"></Button>
      <Button
        onClick={addMultiplierTimesSixteen}
        label="Multiplier x16"
      ></Button>
      <Button
        onClick={addMultiplierTimesThirtyTwo}
        label="Multiplier x32"
      ></Button>
      <Button
        onClick={addMultiplierTimesSixtyFour}
        label="Multiplier x64"
      ></Button>
    </div>
  );
};

export default GameUI;

import Button from '../../components/Button/Button';
import ResourceDisplay from '../../components/ResourceDisplay/ResourceDisplay';

interface GameUIProps {
  gameState: {
    dataShards: number;
    showIntegrationUpgradeBtn: boolean;
    autoIntegrationLevel: number;
  };
  handleGatherDataShards: () => void;
  handleAutoIntegrationUpgrade: () => void;
}

const GameUI: React.FC<GameUIProps> = ({
  gameState,
  handleGatherDataShards,
  handleAutoIntegrationUpgrade,
}) => {
  return (
    <div>
      <ResourceDisplay gameState={gameState} />
      {gameState.autoIntegrationLevel === 0 && (
        <Button
          onClick={handleGatherDataShards}
          label="Integrate Data Shard"
        ></Button>
      )}
      {gameState.showIntegrationUpgradeBtn && (
        <Button
          onClick={handleAutoIntegrationUpgrade}
          label="Upgrade Data Integration"
        />
      )}
    </div>
  );
};

export default GameUI;

import { formatData } from '../../helpers/formatHelpers';
import { GameState } from '../../App';
import ScrambledResources from '../ScrambledResources/ScrambledResources';

interface ResourceDisplayProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

const ResourceDisplay: React.FC<ResourceDisplayProps> = ({
  gameState,
  setGameState,
}) => {
  return (
    <div className="resource-display">
      {gameState.algorithms > 0 ? (
        <>
          <div>Integrated Data: {formatData(gameState.totalData)}</div>
          <div>
            Integration Speed: {formatData(gameState.integrationSpeed * 100)}/s
          </div>
          <div>
            Processing Cores:{' '}
            {Math.floor(gameState.processingCores).toLocaleString()}
          </div>
          <div>
            Integration Bandwidth:{' '}
            {gameState.autoBandwidthReplenishment
              ? '\u221E'
              : Math.floor(gameState.integrationBandwidth).toLocaleString()}
          </div>
          <div>
            Integration Algorithms:{' '}
            {Math.floor(gameState.algorithms).toLocaleString()}
          </div>
          <div>
            .exe Binaries: {Math.floor(gameState.executables).toLocaleString()}
          </div>
        </>
      ) : (
        <ScrambledResources gameState={gameState} setGameState={setGameState} />
      )}
    </div>
  );
};

export default ResourceDisplay;

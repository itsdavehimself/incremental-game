import { formatData } from '../../utility/utilityFunctions';

interface ResourceDisplayProps {
  gameState: {
    totalData: number;
    processingCores: number;
    integrationSpeed: number;
    integrationBandwidth: number;
    autoBandwidthReplenishment: boolean;
    algorithms: number;
    executables: number;
  };
}

const ResourceDisplay: React.FC<ResourceDisplayProps> = ({ gameState }) => {
  return (
    <div className="resource-display">
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
    </div>
  );
};

export default ResourceDisplay;

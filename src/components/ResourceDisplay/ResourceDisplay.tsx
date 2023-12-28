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
  const formatData = (bytes: number): string => {
    if (bytes < 1024) {
      return bytes.toFixed(0) + 'B';
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(2) + 'KB';
    } else if (bytes < 1024 * 1024 * 1024) {
      return (bytes / (1024 * 1024)).toFixed(2) + 'MB';
    } else if (bytes < 1024 * 1024 * 1024 * 1024) {
      return (bytes / (1024 * 1024 * 1024)).toFixed(2) + 'GB';
    } else if (bytes < 1024 * 1024 * 1024 * 1024 * 1024) {
      return (bytes / (1024 * 1024 * 1024 * 1024)).toFixed(2) + 'TB';
    } else if (bytes < 1024 * 1024 * 1024 * 1024 * 1024 * 1024) {
      return (bytes / (1024 * 1024 * 1024 * 1024 * 1024)).toFixed(2) + 'PB';
    } else if (bytes < 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024) {
      return (
        (bytes / (1024 * 1024 * 1024 * 1024 * 1024 * 1024)).toFixed(2) + 'EB'
      );
    } else if (bytes < 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024) {
      return (
        (bytes / (1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024)).toFixed(2) +
        'ZB'
      );
    } else {
      return (
        (
          bytes /
          (1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024 * 1024)
        ).toFixed(2) + 'YB'
      );
    }
  };

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

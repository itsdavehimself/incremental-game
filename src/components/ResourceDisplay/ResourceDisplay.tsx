interface ResourceDisplayProps {
  gameState: {
    dataShards: number;
    autoIntegrationLevel: number;
  };
}

const ResourceDisplay: React.FC<ResourceDisplayProps> = ({ gameState }) => {
  const formatData = (bytes: number): string => {
    if (bytes < 1024) {
      return bytes + 'B';
    } else if (bytes < 1024 * 1024) {
      return (bytes / 1024).toFixed(1) + 'KB';
    } else if (bytes < 1024 * 1024 * 1024) {
      return (bytes / (1024 * 1024)).toFixed(1) + 'MB';
    } else if (bytes < 1024 * 1024 * 1024 * 1024) {
      return (bytes / (1024 * 1024 * 1024)).toFixed(1) + 'GB';
    } else if (bytes < 1024 * 1024 * 1024 * 1024 * 1024) {
      return (bytes / (1024 * 1024 * 1024 * 1024)).toFixed(1) + 'TB';
    } else {
      return (bytes / (1024 * 1024 * 1024 * 1024 * 1024)).toFixed(1) + 'PB';
    }
  };

  return (
    <>
      <div className="resource-display">
        Data Shards: {formatData(gameState.dataShards)}
      </div>
      <div>Automated Integration Level: {gameState.autoIntegrationLevel}</div>
    </>
  );
};

export default ResourceDisplay;

interface NetworkProps {
  gameState: {
    networks: number;
    GPUFarms: number;
    storageFacilities: number;
    currentNodes: number;
    totalNodes: number;
    cognitum: number;
  };
}

const Network: React.FC<NetworkProps> = ({ gameState }) => {
  return (
    <div>
      <div>Devices on Network: {gameState.networks}</div>
      <div>Allocated as GPU Farms: {gameState.GPUFarms}</div>
      <div>Allocated as Storage Facilities: {gameState.storageFacilities}</div>
      <div>
        Active nodes: {gameState.currentNodes}/{gameState.totalNodes}
      </div>
      <div>Cognitum Mined: {gameState.cognitum}</div>
    </div>
  );
};

export default Network;

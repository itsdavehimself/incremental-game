interface NetworkProps {
  gameState: {
    networks: number;
    networksAvailable: number;
    GPUFarms: number;
    storageFacilities: number;
    nodesCurrent: number;
    nodesTotal: number;
    cognitum: number;
  };
}

const Network: React.FC<NetworkProps> = ({ gameState }) => {
  return (
    <div>
      <div>Networks: {gameState.networks}</div>
      <div>
        Networks Available for Allocation: {gameState.networksAvailable}
      </div>
      <div>Allocated as GPU Farms: {gameState.GPUFarms}</div>
      <div>Allocated as Storage Facilities: {gameState.storageFacilities}</div>
      <div>
        Active nodes: {gameState.nodesCurrent}/{gameState.nodesTotal}
      </div>
      <div>Cognitum Mined: {gameState.cognitum}</div>
    </div>
  );
};

export default Network;

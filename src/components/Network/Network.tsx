import Button from '../Button/Button';
import { formatData } from '../../helpers/formatHelpers';

interface NetworkProps {
  gameState: {
    networks: number;
    networksAvailable: number;
    GPUFarms: number;
    storageFacilities: number;
    nodesCurrent: number;
    nodesTotal: number;
    cognitum: number;
    networkMilestones: Array<number>;
    networkMilestonesIndex: number;
  };
  allocateToGPU: () => void;
  allocateToStorage: () => void;
}

const Network: React.FC<NetworkProps> = ({
  gameState,
  allocateToGPU,
  allocateToStorage,
}) => {
  return (
    <div>
      <div>Networks: {gameState.networks}</div>
      <div>
        +1 Network at{' '}
        {formatData(
          gameState.networkMilestones[gameState.networkMilestonesIndex],
        )}
      </div>
      <div>
        Networks Available for Allocation: {gameState.networksAvailable}
      </div>
      <Button onClick={allocateToGPU} label="Allocate to GPU Farm"></Button>
      <Button
        onClick={allocateToStorage}
        label="Allocate to Storage Facility"
      ></Button>
      <div>Allocated as GPU Farms: {gameState.GPUFarms}</div>
      <div>Allocated as Storage Facilities: {gameState.storageFacilities}</div>
      <div>
        Active nodes: {Math.floor(gameState.nodesCurrent).toLocaleString()}/
        {gameState.nodesTotal.toLocaleString()}
      </div>
      <div>Cognitum Mined: {Math.floor(gameState.cognitum)}</div>
    </div>
  );
};

export default Network;

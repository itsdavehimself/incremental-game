import Button from '../Button/Button';
import { formatData } from '../../helpers/formatHelpers';
import styles from './Network.module.scss';

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
    <>
      <div className={styles['networks-container']}>
        <div className={styles['network-header']}>
          NETWORKS<div className={styles.square}></div>
        </div>
        <div className={styles['next-network']}>
          +1 Network at{' '}
          {formatData(
            gameState.networkMilestones[gameState.networkMilestonesIndex],
          )}
        </div>
        <div className={styles['network-data']}>
          <div className={styles['data-block']}>
            <div className={styles.rectangle}></div>
            <div className={styles['data-pair']}>
              <h3>TOTAL NETWORKS</h3>
              <p>{gameState.networks}</p>
            </div>
          </div>
          <div className={styles['data-block']}>
            <div className={styles.rectangle}></div>
            <div className={styles['data-pair']}>
              <h3>AVAILABLE FOR ALLOCATION</h3>
              <p>{gameState.networksAvailable}</p>
            </div>
          </div>
          <div className={styles['data-block']}>
            <div className={styles.rectangle}></div>
            <div className={styles['data-pair']}>
              <h3>ALLOCATED AS GPU FARMS</h3>
              <p>{gameState.GPUFarms}</p>
            </div>
          </div>
          <div className={styles['data-block']}>
            <div className={styles.rectangle}></div>
            <div className={styles['data-pair']}>
              <h3>ALLOCATED AS STORAGE</h3>
              <p>{gameState.storageFacilities}</p>
            </div>
          </div>
          <div className={styles['data-block']}>
            <div className={styles.rectangle}></div>
            <div className={styles['data-pair-nodes']}>
              <h3>ACTIVE NODES</h3>
              <p>
                {Math.floor(gameState.nodesCurrent).toLocaleString()}/
                {gameState.nodesTotal.toLocaleString()}
              </p>
            </div>
          </div>
          <div className={styles['data-block']}>
            <div className={styles.rectangle}></div>
            <div className={styles['data-pair']}>
              <h3>COGNITUM MINED</h3>
              <p>{Math.floor(gameState.cognitum)}</p>
            </div>
          </div>
        </div>
      </div>
      <div className={styles['allocation-btn-container']}>
        <Button
          onClick={allocateToGPU}
          upgradeName="ALLOCATE AS GPU FARM"
          upgradeCost=""
          disabled={gameState.networksAvailable < 1}
        ></Button>
        <Button
          onClick={allocateToStorage}
          upgradeName="ALLOCATE AS STORAGE FACILITY"
          upgradeCost=""
          disabled={gameState.networksAvailable < 1}
        ></Button>
      </div>
    </>
  );
};

export default Network;

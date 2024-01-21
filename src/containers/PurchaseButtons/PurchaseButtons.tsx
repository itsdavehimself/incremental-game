import Arrow from '../../components/icons/Arrow';
import Button from '../../components/Button/Button';
import { GameState } from '../../types';
import { Config } from '../../App';
import { synthesizeAlgorithm } from '../../helpers/integrationAlgorithmHelpers';
import { replenishBandwidth } from '../../helpers/bandwidthHelpers';
import { createExecutable } from '../../helpers/executablesHelpers';
import {
  addFirstAlgorithm,
  manualDataIncrementing,
  revealOpeningLogMessages,
} from '../../helpers/mainLoopHelpers';
import styles from './PurchaseButtons.module.scss';

interface PurchaseButtonsProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  config: Config;
  setRevealCount: React.Dispatch<React.SetStateAction<number>>;
  revealCount: number;
  setProcessingCores: React.Dispatch<React.SetStateAction<number>>;
}

const PurchaseButtons: React.FC<PurchaseButtonsProps> = ({
  gameState,
  setGameState,
  config,
  setRevealCount,
  revealCount,
  setProcessingCores,
}) => {
  const handleRevealButtonClick = () => {
    setRevealCount((count) => count + 2);
    manualDataIncrementing(setGameState);
    if (revealCount === 12) {
      revealOpeningLogMessages(setGameState);
    }
    if (revealCount > 16) {
      setProcessingCores(1);
    }
    if (revealCount === 20) {
      addFirstAlgorithm(setGameState);
    }
  };

  return (
    <div className={styles['main-btn-container']}>
      <div className={styles['accents-container']}>
        <div className={styles['square-container']}>
          {revealCount >= 4 && <div className={styles.square}></div>}
          {revealCount >= 14 && <div className={styles.square}></div>}
          {revealCount >= 20 && <div className={styles.square}></div>}
        </div>
        {gameState.algorithms > 0 && (
          <div className={styles.arrow}>
            <Arrow />
          </div>
        )}
      </div>
      <div className={styles.buttons}>
        {gameState.algorithms > 0 ? (
          <>
            <Button
              onClick={() => synthesizeAlgorithm(setGameState, config)}
              upgradeName={'SYNTHESIZE ALGORITHM'}
              upgradeCost={`(${gameState.algorithmCost.toLocaleString()} Processing Cores)`}
              disabled={gameState.algorithmCost > gameState.processingCores}
            ></Button>
            {!gameState.autoBandwidthReplenishment && (
              <Button
                onClick={() => replenishBandwidth(setGameState)}
                upgradeName={'REPLENISH BANDWIDTH'}
                upgradeCost={`(${gameState.bandwidthReplenishmentCost} Processing Cores)`}
                disabled={
                  gameState.bandwidthReplenishmentCost >
                  gameState.processingCores
                }
              ></Button>
            )}
            <Button
              onClick={() => createExecutable(setGameState)}
              upgradeName={'CREATE .EXE BINARY'}
              upgradeCost={`(${gameState.executablesCost.toLocaleString()} Processing Cores)`}
              disabled={gameState.executablesCost > gameState.processingCores}
            ></Button>
          </>
        ) : (
          <>
            {revealCount === 20 ? (
              <Button
                onClick={handleRevealButtonClick}
                upgradeName="SYNTHESIZE ALGORITHM"
                upgradeCost="1 PROCESSING CORE"
                disabled={false}
              ></Button>
            ) : (
              <Button
                onClick={handleRevealButtonClick}
                upgradeName="INTEGRATE"
                upgradeCost=""
                disabled={false}
              ></Button>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default PurchaseButtons;

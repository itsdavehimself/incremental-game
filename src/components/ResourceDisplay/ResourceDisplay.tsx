import { formatData } from '../../helpers/formatHelpers';
import { GameState } from '../../App';
import styles from './ResourceDisplay.module.scss';
import { useState, useEffect } from 'react';
import generateRandomText from './ResourceHelpers';

interface ResourceDisplayProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  processingCores: number;
  revealCount: number;
}

const ResourceDisplay: React.FC<ResourceDisplayProps> = ({
  gameState,
  processingCores,
  revealCount,
}) => {
  const integratedDataTitle = `DATA INTEGRATED`;
  const integratedDataText = `${gameState.totalData.toFixed(2)} B`;
  const processingCoresTitle = `PROCESSING CORES`;
  const processorText = `${processingCores}`;
  const integrationSpeedTitle = 'SPEED';
  const integrationSpeedText = '0.00 B/s';
  const bandwidthTitle = 'BANDWIDTH';
  const bandwidthText = '750';
  const algorithmsTitle = 'ALGORITHMS';
  const algorithmsText = '0';
  const binariesTitle = '.EXE BINARIES';
  const binariesText = '0';
  const [scrambledDataTitle, setScrambledDataTitle] = useState('');
  const [scrambledDataText, setScrambledDataText] = useState('');
  const [scrambledSpeedTitle, setScrambledSpeedTitle] = useState('');
  const [scrambledSpeedText, setScrambledSpeedText] = useState('');
  const [scrambledProcessorTitle, setScrambledProcessorTitle] = useState('');
  const [scrambledProcessorText, setScrambledProcessorText] = useState('');
  const [scrambledBandwidthTitle, setScrambledBandwidthTitle] = useState('');
  const [scrambledBandwidthText, setScrambledBandwidthText] = useState('');
  const [scrambledAlgorithmsTitle, setScrambledAlgorithmsTitle] = useState('');
  const [scrambledAlgorithmsText, setScrambledAlgorithmsText] = useState('');
  const [scrambledBinariesTitle, setScrambledBinariesTitle] = useState('');
  const [scrambledBinariesText, setScrambledBinariesText] = useState('');

  useEffect(() => {
    const intervalId = setInterval(() => {
      setScrambledDataTitle(
        generateRandomText(integratedDataTitle, revealCount),
      );
      setScrambledDataText(generateRandomText(integratedDataText, revealCount));
      setScrambledSpeedTitle(
        generateRandomText(integrationSpeedTitle, revealCount),
      );
      setScrambledSpeedText(
        generateRandomText(integrationSpeedText, revealCount),
      );
      setScrambledProcessorTitle(
        generateRandomText(processingCoresTitle, revealCount),
      );
      setScrambledProcessorText(generateRandomText(processorText, revealCount));
      setScrambledBandwidthTitle(
        generateRandomText(bandwidthTitle, revealCount),
      );
      setScrambledBandwidthText(generateRandomText(bandwidthText, revealCount));
      setScrambledAlgorithmsTitle(
        generateRandomText(algorithmsTitle, revealCount),
      );
      setScrambledAlgorithmsText(
        generateRandomText(algorithmsText, revealCount),
      );
      setScrambledBinariesTitle(generateRandomText(binariesTitle, revealCount));
      setScrambledBinariesText(generateRandomText(binariesText, revealCount));
    }, 50);

    return () => clearInterval(intervalId);
  }, [revealCount]);

  return (
    <div className={styles['resource-container']}>
      <div className={styles['resource-header']}>
        <h5>DATA + RESOURCES</h5>
        <div className={styles.square}></div>
      </div>
      <div className={styles['resource-data']}>
        <div className={styles['data-block']}>
          <div className={styles.rectangle}></div>
          <div className={styles['data-pair']}>
            {gameState.algorithms > 0 ? (
              <>
                <h3>DATA INTEGRATED</h3>
                <p>{formatData(gameState.totalData)}</p>
              </>
            ) : (
              <>
                <h3>{scrambledDataTitle}</h3>
                <p>{scrambledDataText}</p>
              </>
            )}
          </div>
        </div>
        <div className={styles['data-block']}>
          <div className={styles.rectangle}></div>
          <div className={styles['data-pair']}>
            {gameState.algorithms > 0 ? (
              <>
                <h3>SPEED</h3>
                <p>
                  {formatData(gameState.integrationSpeed * 100)}
                  /s
                </p>
              </>
            ) : (
              <>
                <h3>{scrambledSpeedTitle}</h3>
                <p>{scrambledSpeedText}</p>
              </>
            )}
          </div>
        </div>
        <div className={styles['data-block']}>
          <div className={styles.rectangle}></div>
          <div className={styles['data-pair']}>
            {gameState.algorithms > 0 ? (
              <>
                <h3>BANDWIDTH</h3>
                <p>
                  {gameState.autoBandwidthReplenishment
                    ? '\u221E'
                    : Math.floor(
                        gameState.integrationBandwidth,
                      ).toLocaleString()}
                </p>
              </>
            ) : (
              <>
                <h3>{scrambledBandwidthTitle}</h3>
                <p>{scrambledBandwidthText}</p>
              </>
            )}
          </div>
        </div>
        <div className={styles['data-block']}>
          <div className={styles.rectangle}></div>
          <div className={styles['data-pair']}>
            {gameState.algorithms > 0 ? (
              <>
                <h3>PROCESSING CORES</h3>
                <p> {Math.floor(gameState.processingCores).toLocaleString()}</p>
              </>
            ) : (
              <>
                <h3>{scrambledProcessorTitle}</h3>
                <p>{scrambledProcessorText}</p>
              </>
            )}
          </div>
        </div>
        <div className={styles['data-block']}>
          <div className={styles.rectangle}></div>
          <div className={styles['data-pair']}>
            {gameState.algorithms > 0 ? (
              <>
                <h3>ALGORITHMS</h3>
                <p> {Math.floor(gameState.algorithms).toLocaleString()}</p>
              </>
            ) : (
              <>
                <h3>{scrambledAlgorithmsTitle}</h3>
                <p>{scrambledAlgorithmsText}</p>
              </>
            )}
          </div>
        </div>
        <div className={styles['data-block']}>
          <div className={styles.rectangle}></div>
          <div className={styles['data-pair']}>
            {gameState.algorithms > 0 ? (
              <>
                <h3>.EXE BINARIES</h3>
                <p>{Math.floor(gameState.executables).toLocaleString()}</p>
              </>
            ) : (
              <>
                <h3>{scrambledBinariesTitle}</h3>
                <p>{scrambledBinariesText}</p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceDisplay;

import React, { useState, useEffect } from 'react';
import { addFirstAlgorithm } from '../../helpers/mainLoopHelpers';
import { GameState } from '../../App';

interface ScrambledResourcesProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

const ScrambledResources: React.FC<ScrambledResourcesProps> = ({
  setGameState,
}) => {
  const integratedDataText = 'Integrated Data: 0 KiB';
  const integrationSpeedText = 'Integration Speed: 0.00 KiB/s';
  const processorText = 'Processing Cores: 0';
  const bandwidthText = 'Integration Bandwidth: 750';
  const algorithmsText = 'Integration Algorithms: 0';
  const binariesText = '.exe Binaries: 0';
  const [scrambledDataText, setScrambledDataText] = useState('');
  const [scrambledSpeedText, setScrambledSpeedText] = useState('');
  const [scrambledProcessorText, setScrambledProcessorText] = useState('');
  const [scrambledBandwidthText, setScrambledBandwidthText] = useState('');
  const [scrambledAlgorithmsText, setScrambledAlgorithmsText] = useState('');
  const [scrambledBinariesText, setScrambledBinariesText] = useState('');
  const [revealCount, setRevealCount] = useState(0);

  const handleRevealButtonClick = () => {
    setRevealCount((count) => count + 1);
    if (revealCount === 29) {
      addFirstAlgorithm(setGameState);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      setScrambledDataText(generateRandomText(integratedDataText, revealCount));
      setScrambledSpeedText(
        generateRandomText(integrationSpeedText, revealCount),
      );
      setScrambledProcessorText(generateRandomText(processorText, revealCount));
      setScrambledBandwidthText(generateRandomText(bandwidthText, revealCount));
      setScrambledAlgorithmsText(
        generateRandomText(algorithmsText, revealCount),
      );
      setScrambledBinariesText(generateRandomText(binariesText, revealCount));
    }, 50);

    return () => clearInterval(intervalId);
  }, [revealCount]);

  const generateRandomText = (text: string, revealCount: number): string => {
    const characters =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=~`{}[]|:;"<>,.?/¡¢£¤¥¦§¨©ª«¬®¯°±²³´µ¶·¸¹º»¿×÷';
    const revealedText = Array.from(text)
      .map((char, index) =>
        index < revealCount
          ? char
          : characters[Math.floor(Math.random() * characters.length)],
      )
      .join('');
    return revealedText;
  };

  return (
    <>
      <div>{scrambledDataText}</div>
      <div>{scrambledSpeedText}</div>
      <div>{scrambledProcessorText}</div>
      <div>{scrambledBandwidthText}</div>
      <div>{scrambledAlgorithmsText}</div>
      <div>{scrambledBinariesText}</div>
      <button onClick={handleRevealButtonClick}>
        {revealCount === 29 ? 'Synthesize Algorithm' : 're:member'}
      </button>
    </>
  );
};

export default ScrambledResources;

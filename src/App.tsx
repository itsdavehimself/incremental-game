import { useState, useRef, useEffect } from 'react';
import GameUI from './containers/GameUI/GameUI';
import './app.scss';

interface GameState {
  dataShards: number;
  showIntegrationUpgradeBtn: boolean;
  autoIntegrationLevel: number;
}

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    dataShards: 0,
    showIntegrationUpgradeBtn: false,
    autoIntegrationLevel: 0,
  });

  const intervalRef = useRef<number | null>(null);

  const handleGatherDataShards = () => {
    setGameState((prevGameState) => {
      const totalDataShards = prevGameState.dataShards + 1;
      const showIntegrationUpgradeBtn = totalDataShards >= 10;
      return {
        ...prevGameState,
        dataShards: totalDataShards,
        showIntegrationUpgradeBtn,
      };
    });
  };

  const handleAutoIntegrationUpgrade = () => {
    setGameState((prevGameState) => {
      if (gameState.autoIntegrationLevel >= 0 && intervalRef.current === null) {
        intervalRef.current = setInterval(() => {
          setGameState((innerPrevGameState) => {
            const totalDataShards = innerPrevGameState.dataShards + 1;
            return {
              ...innerPrevGameState,
              dataShards: totalDataShards,
              showIntegrationUpgradeBtn: false,
            };
          });
        }, 10);
      }

      return {
        ...prevGameState,
        autoIntegrationLevel: prevGameState.autoIntegrationLevel + 1,
      };
    });
  };

  useEffect(() => {
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return (
    <div className="app">
      <GameUI
        gameState={gameState}
        handleGatherDataShards={handleGatherDataShards}
        handleAutoIntegrationUpgrade={handleAutoIntegrationUpgrade}
      />
    </div>
  );
};

export default App;

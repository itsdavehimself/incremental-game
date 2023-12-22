import { useState, useEffect } from 'react';
import GameUI from './containers/GameUI/GameUI';
import './app.scss';

interface GameState {
  totalData: number;
  processingCores: number;
  integrationSpeed: number;
  integrationEfficiency: number;
  algorithms: number;
  executables: number;
  algorithmCost: number;
  multiplier: number;
}

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    totalData: 0,
    processingCores: 0,
    integrationSpeed: 0,
    integrationEfficiency: 1000,
    algorithms: 1,
    executables: 0,
    algorithmCost: 6,
    multiplier: 1,
  });

  const algorithmCostBase = 6;
  const rateGrowth = 1.07; // original is 1.07
  const processingCoreProductionBase = 1.2 / 750;
  const dataProductionBase = 1038 / 100;
  const newAlgorithmCost = (currentNumberAlgorithms: number) => {
    const newCost = algorithmCostBase * rateGrowth ** currentNumberAlgorithms;
    return Math.ceil(newCost);
  };

  const synthesizeAlgorithm = () => {
    setGameState((prevGameState) => {
      const incrementAlgorithm = prevGameState.algorithms + 1;
      const subtractProcessingCores =
        prevGameState.processingCores - prevGameState.algorithmCost;
      if (prevGameState.processingCores >= prevGameState.algorithmCost) {
        const updatedAlgorithmCost = newAlgorithmCost(prevGameState.algorithms);
        return {
          ...prevGameState,
          algorithms: incrementAlgorithm,
          processingCores: subtractProcessingCores,
          algorithmCost: updatedAlgorithmCost,
        };
      } else {
        return {
          ...prevGameState,
        };
      }
    });
  };

  const addMultiplierTimesTwo = () => {
    setGameState((prevGameState) => {
      return {
        ...prevGameState,
        multiplier: 2,
      };
    });
  };
  const addMultiplierTimesFour = () => {
    setGameState((prevGameState) => {
      return {
        ...prevGameState,
        multiplier: 4,
      };
    });
  };
  const addMultiplierTimesEight = () => {
    setGameState((prevGameState) => {
      return {
        ...prevGameState,
        multiplier: 8,
      };
    });
  };
  const addMultiplierTimesSixteen = () => {
    setGameState((prevGameState) => {
      return {
        ...prevGameState,
        multiplier: 16,
      };
    });
  };
  const addMultiplierTimesThirtyTwo = () => {
    setGameState((prevGameState) => {
      return {
        ...prevGameState,
        multiplier: 32,
      };
    });
  };
  const addMultiplierTimesSixtyFour = () => {
    setGameState((prevGameState) => {
      return {
        ...prevGameState,
        multiplier: 64,
      };
    });
  };

  const upgradeEfficiency = () => {
    setGameState((prevGameState) => {
      const addEfficiency = prevGameState.integrationEfficiency + 1000;
      const subtractProcessingCores = prevGameState.processingCores - 20;
      if (prevGameState.processingCores >= 20) {
        return {
          ...prevGameState,
          integrationEfficiency: addEfficiency,
          processingCores: subtractProcessingCores,
        };
      } else {
        return {
          ...prevGameState,
        };
      }
    });
  };

  useEffect(() => {
    const intervalID = setInterval(() => {
      setGameState((prevGameState) => {
        if (prevGameState.integrationEfficiency > 0) {
          const processingCoreProductionTotal =
            processingCoreProductionBase *
            prevGameState.algorithms *
            prevGameState.multiplier;

          const newProcessingCoresTotal =
            prevGameState.processingCores + processingCoreProductionTotal;

          const dataProductionTotal =
            dataProductionBase *
            prevGameState.algorithms *
            prevGameState.multiplier;

          const newDataTotal = prevGameState.totalData + dataProductionTotal;

          const integrationEfficiencyTotal =
            prevGameState.integrationEfficiency - dataProductionTotal / 2000;

          return {
            ...prevGameState,
            totalData: newDataTotal,
            processingCores: newProcessingCoresTotal,
            integrationSpeed: dataProductionTotal,
            integrationEfficiency: integrationEfficiencyTotal,
          };
        } else {
          return {
            ...prevGameState,
          };
        }
      });
    }, 10);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="app">
      <GameUI
        gameState={gameState}
        synthesizeAlgorithm={synthesizeAlgorithm}
        upgradeEfficiency={upgradeEfficiency}
        addMultiplierTimesTwo={addMultiplierTimesTwo}
        addMultiplierTimesFour={addMultiplierTimesFour}
        addMultiplierTimesEight={addMultiplierTimesEight}
        addMultiplierTimesSixteen={addMultiplierTimesSixteen}
        addMultiplierTimesThirtyTwo={addMultiplierTimesThirtyTwo}
        addMultiplierTimesSixtyFour={addMultiplierTimesSixtyFour}
      />
    </div>
  );
};

export default App;

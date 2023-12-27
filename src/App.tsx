import { useState, useEffect } from 'react';
import GameUI from './containers/GameUI/GameUI';
import './app.scss';

interface GameState {
  totalData: number;
  processingCores: number;
  integrationSpeed: number;
  integrationStamina: number;
  algorithms: number;
  executables: number;
  algorithmCost: number;
  algorithmMultiplier: number;
  algorithmMultiplierIndex: number;
  algorithMultiplierPercentage: Array<number>;
  staminaMultiplier: number;
  staminaMultiplierIndex: number;
  staminaMultiplierPercentage: Array<number>;
  autoStaminaReplenishment: boolean;
  networksActivated: boolean;
  networks: number;
  GPUFarms: number;
  storageFacilities: number;
  currentNodes: number;
  totalNodes: number;
  cognitum: number;
}

const App: React.FC = () => {
  const [gameState, setGameState] = useState<GameState>({
    totalData: 0,
    processingCores: 0,
    integrationSpeed: 0,
    integrationStamina: 1000,
    algorithms: 1,
    executables: 0,
    algorithmCost: 6,
    algorithmMultiplier: 1,
    algorithmMultiplierIndex: 0,
    algorithMultiplierPercentage: [0.25, 0.5, 0.75, 1, 2, 4, 8, 16],
    staminaMultiplier: 1,
    staminaMultiplierIndex: 0,
    staminaMultiplierPercentage: [0.25, 0.5, 1],
    autoStaminaReplenishment: false,
    networksActivated: false,
    networks: 0,
    GPUFarms: 0,
    storageFacilities: 0,
    currentNodes: 0,
    totalNodes: 0,
    cognitum: 0,
  });

  const algorithmCostBase = 6;
  const algorithmCostRateGrowth = 1.07;
  const processingCoreProductionBase = 1.2 / 750;
  const dataProductionBase = 1038 / 100;
  const newAlgorithmCost = (currentNumberAlgorithms: number) => {
    const newCost =
      algorithmCostBase * algorithmCostRateGrowth ** currentNumberAlgorithms;
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

  const activateMultiplier = () => {
    setGameState((prevGameState) => {
      const updatedMultiplier =
        prevGameState.algorithmMultiplier *
        (1 +
          prevGameState.algorithMultiplierPercentage[
            prevGameState.algorithmMultiplierIndex
          ]);
      const updatedIndex = prevGameState.algorithmMultiplierIndex + 1;
      return {
        ...prevGameState,
        algorithmMultiplier: updatedMultiplier,
        algorithmMultiplierIndex: updatedIndex,
      };
    });
  };

  const replenishStamina = () => {
    setGameState((prevGameState) => {
      const addStamina =
        prevGameState.integrationStamina +
        1000 * prevGameState.staminaMultiplier;
      const subtractProcessingCores = prevGameState.processingCores - 50;
      if (prevGameState.processingCores >= 50) {
        return {
          ...prevGameState,
          integrationStamina: addStamina,
          processingCores: subtractProcessingCores,
        };
      } else {
        return {
          ...prevGameState,
        };
      }
    });
  };

  const upgradeStaminaReplenishment = () => {
    setGameState((prevGameState) => {
      const updatedStaminamMultiplier =
        prevGameState.staminaMultiplier *
        (1 +
          prevGameState.staminaMultiplierPercentage[
            prevGameState.staminaMultiplierIndex
          ]);
      const updatedIndex = prevGameState.staminaMultiplierIndex + 1;
      return {
        ...prevGameState,
        staminaMultiplier: updatedStaminamMultiplier,
        staminaMultiplierIndex: updatedIndex,
      };
    });
  };

  useEffect(() => {
    const intervalID = setInterval(() => {
      setGameState((prevGameState) => {
        if (prevGameState.integrationStamina > 0) {
          const processingCoreProductionTotal =
            processingCoreProductionBase *
            prevGameState.algorithms *
            prevGameState.algorithmMultiplier;

          const newProcessingCoresTotal =
            prevGameState.processingCores + processingCoreProductionTotal;

          const dataProductionTotal =
            dataProductionBase *
            prevGameState.algorithms *
            prevGameState.algorithmMultiplier;

          const newDataTotal = prevGameState.totalData + dataProductionTotal;

          const integrationStaminaTotal =
            prevGameState.integrationStamina - dataProductionTotal / 2000;

          return {
            ...prevGameState,
            totalData: newDataTotal,
            processingCores: newProcessingCoresTotal,
            integrationSpeed: dataProductionTotal,
            integrationStamina: integrationStaminaTotal,
          };
        } else if (
          prevGameState.autoStaminaReplenishment &&
          prevGameState.integrationStamina < 1
        ) {
          const addStamina =
            prevGameState.integrationStamina +
            1000 * prevGameState.staminaMultiplier;

          const subtractProcessingCores = prevGameState.processingCores - 50;

          if (prevGameState.processingCores >= 50) {
            return {
              ...prevGameState,
              integrationStamina: addStamina,
              processingCores: subtractProcessingCores,
            };
          }
        }

        return { ...prevGameState };
      });
    }, 10);

    return () => clearInterval(intervalID);
  }, []);

  return (
    <div className="app">
      <GameUI
        gameState={gameState}
        synthesizeAlgorithm={synthesizeAlgorithm}
        replenishStamina={replenishStamina}
        activateMultiplier={activateMultiplier}
        upgradeStaminaReplenishment={upgradeStaminaReplenishment}
      />
    </div>
  );
};

export default App;

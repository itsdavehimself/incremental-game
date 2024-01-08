import { getUpgradeCost } from './costHelpers';
import { CostBreakdown } from '../data/upgrades';
import { GameState } from '../App';

const upgradeExecutables = (
  multiplierPercentage: number | null,
  costs: CostBreakdown[],
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
) => {
  setGameState((prevGameState) => {
    const updatedMultiplier =
      multiplierPercentage !== null
        ? prevGameState.executablesMultiplier * (1 + multiplierPercentage)
        : prevGameState.executablesMultiplier;

    const updatedNodes =
      prevGameState.nodesCurrent - getUpgradeCost('Nodes', costs);
    const updatedCognitum =
      prevGameState.cognitum - getUpgradeCost('Cognitum', costs);
    const updatedMemoryShards =
      prevGameState.fractionalMemoryShards -
      getUpgradeCost('Fractional Memory Shards', costs);

    return {
      ...prevGameState,
      executablesMultiplier: updatedMultiplier,
      nodesCurrent: updatedNodes,
      cognitum: updatedCognitum,
      executablesIndex: prevGameState.executablesIndex + 1,
      fractionalMemoryShards: updatedMemoryShards,
    };
  });
};

const createExecutable = (
  setGameState: React.Dispatch<React.SetStateAction<GameState>>,
) => {
  setGameState((prevGameState) => {
    if (prevGameState.processingCores >= prevGameState.executablesCost) {
      return {
        ...prevGameState,
        executables: prevGameState.executables + 1,
        processingCores:
          prevGameState.processingCores - prevGameState.executablesCost,
        executablesCost: prevGameState.executablesCost * 10,
      };
    } else {
      return {
        ...prevGameState,
      };
    }
  });
};

export { upgradeExecutables, createExecutable };

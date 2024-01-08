import { GameState } from '../App';

const encodeGameState = (state: GameState): string => {
  const jsonString = JSON.stringify(state);
  return btoa(jsonString);
};

const decodeGameState = (code: string): GameState | null => {
  try {
    const jsonString = atob(code);
    return JSON.parse(jsonString);
  } catch (error) {
    console.error('Error decoding game state:', error);
    return null;
  }
};

const saveGameState = (
  gameState: GameState,
  setGeneratedCode: React.Dispatch<React.SetStateAction<string>>,
) => {
  const code = encodeGameState(gameState);
  localStorage.setItem('gameStateCode', code);
  setGeneratedCode(code);
};

export { encodeGameState, decodeGameState, saveGameState };

import { useState } from 'react';
import { GameState } from '../../App';
import { saveGameState } from '../../helpers/saveGameHelpers';
import { handleLoadButtonClick } from '../../utility/utilityFunctions';

interface SaveLoadProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
}

const SaveLoad: React.FC<SaveLoadProps> = ({ gameState, setGameState }) => {
  const [inputCode, setInputCode] = useState<string>('');
  const [generatedCode, setGeneratedCode] = useState<string>('');

  const handleLoadInputChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setInputCode(event.target.value);
  };

  return (
    <div>
      <button onClick={() => saveGameState(gameState, setGeneratedCode)}>
        Save Game
      </button>
      <div>
        <p>Generated Code:</p>
        <code>{generatedCode}</code>
      </div>
      <div>
        <input
          type="text"
          value={inputCode}
          onChange={handleLoadInputChange}
          placeholder="Enter game state code"
        />
        <button onClick={() => handleLoadButtonClick(inputCode, setGameState)}>
          Load Game
        </button>
      </div>
    </div>
  );
};

export default SaveLoad;

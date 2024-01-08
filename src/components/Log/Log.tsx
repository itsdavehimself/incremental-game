import { GameState } from '../../App';

interface LogProps {
  gameState: GameState;
}

const Log: React.FC<LogProps> = ({ gameState }) => {
  return (
    <div>
      {gameState.logMessages.map((message) => (
        <p>{message}</p>
      ))}
    </div>
  );
};

export default Log;

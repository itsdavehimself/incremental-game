import Button from '../../components/Button/Button';
import ResourceDisplay from '../../components/ResourceDisplay/ResourceDisplay';
import Network from '../../components/Network/Network';
import Upgrades from '../../components/Upgrades/Upgrades';
import FileViewer from '../../components/FileViewer/FileViewer';
import WalletDecryption from '../../components/WalletDecryption/WalletDecryption';
import { Upgrade } from '../../data/upgrades';
import { Config, GameState } from '../../App';

interface GameUIProps {
  gameState: GameState;
  setGameState: React.Dispatch<React.SetStateAction<GameState>>;
  config: Config;
  synthesizeAlgorithm: (
    setGameState: React.Dispatch<React.SetStateAction<GameState>>,
    config: Config,
  ) => void;
  createExecutable: (
    setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  ) => void;
  replenishBandwidth: (
    setGameState: React.Dispatch<React.SetStateAction<GameState>>,
    gameState: GameState,
  ) => void;
  allocateToGPU: (
    setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  ) => void;
  allocateToStorage: (
    setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  ) => void;
  handleUpgradeClick: (
    upgrade: Upgrade,
    category: string,
    setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  ) => void;
  incrementWallets: (
    decrypted: boolean,
    setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  ) => void;
  receiveCognitumPrize: (
    prize: number,
    setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  ) => void;
  purchaseWalletDecryption: (
    setGameState: React.Dispatch<React.SetStateAction<GameState>>,
    gameState: GameState,
  ) => void;
  receiveMemoryShardsPrize: (
    prize: number,
    setGameState: React.Dispatch<React.SetStateAction<GameState>>,
  ) => void;
}

const GameUI: React.FC<GameUIProps> = ({
  gameState,
  setGameState,
  config,
  synthesizeAlgorithm,
  createExecutable,
  replenishBandwidth,
  allocateToGPU,
  allocateToStorage,
  handleUpgradeClick,
  incrementWallets,
  receiveCognitumPrize,
  purchaseWalletDecryption,
  receiveMemoryShardsPrize,
}) => {
  return (
    <div>
      <ResourceDisplay gameState={gameState} />
      <Button
        onClick={() => synthesizeAlgorithm(setGameState, config)}
        label={`Synthesize Algorithm (${gameState.algorithmCost.toLocaleString()} Processing Cores)`}
      ></Button>
      {!gameState.autoBandwidthReplenishment && (
        <Button
          onClick={() => replenishBandwidth(setGameState, gameState)}
          label={`Replenish Bandwidth (${gameState.bandwidthReplenishmentCost} Processing Cores)`}
        ></Button>
      )}
      <Button
        onClick={() => createExecutable(setGameState)}
        label={`Create .exe Binary (${gameState.executablesCost.toLocaleString()} Processing Cores)`}
      ></Button>
      <Upgrades
        gameState={gameState}
        setGameState={setGameState}
        handleUpgradeClick={handleUpgradeClick}
      />
      {gameState.filesActivated && (
        <FileViewer gamestate={gameState}></FileViewer>
      )}
      {gameState.networksActivated && (
        <Network
          gameState={gameState}
          allocateToGPU={() => allocateToGPU(setGameState)}
          allocateToStorage={() => allocateToStorage(setGameState)}
        />
      )}
      {gameState.walletDecryptionActivated && (
        <WalletDecryption
          gameState={gameState}
          setGameState={setGameState}
          incrementWallets={incrementWallets}
          receiveCognitumPrize={receiveCognitumPrize}
          purchaseWalletDecryption={purchaseWalletDecryption}
          receiveMemoryShardsPrize={receiveMemoryShardsPrize}
        ></WalletDecryption>
      )}
    </div>
  );
};

export default GameUI;

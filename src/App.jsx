import {useState} from "react";
import GameBoard from "./componenets/gameboard/GameBoard.jsx";
import Player from "./componenets/Player.jsx";
import Log from "./componenets/log/Log.jsx";

function deriveActivePlayer(gameTurns) {
  let currentPlayer = 'X';

  if (gameTurns.length > 0 && gameTurns[0].player === 'X') {
    currentPlayer = 'O';
  }

  return currentPlayer
}

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const activePlayer = deriveActivePlayer(gameTurns);

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      let updatedTurns;
      let currentPlayer =  deriveActivePlayer(prevTurns);

      updatedTurns = [
        {square: {row: rowIndex, col: colIndex}, player: currentPlayer},
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  return <main>
    <div id={"game-container"}>
      <ol id={"players"} className={"highlight-player"}>
        <Player initialName={"player 1"} symbol={"X"} isActive={activePlayer === 'X'} />
        <Player initialName={"player 2"} symbol={"O"} isActive={activePlayer === 'O'} />
      </ol>
      <GameBoard
          onSelectSquare={handleSelectSquare}
          turns={gameTurns}
      />
    </div>
    <Log gameLogs={gameTurns}/>
  </main>
}

export default App

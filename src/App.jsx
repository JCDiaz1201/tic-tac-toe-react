import {useState} from "react";
import GameBoard from "./componenets/gameboard/GameBoard.jsx";
import Player from "./componenets/Player.jsx";
import Log from "./componenets/log/Log.jsx";

function App() {
  const [gameTurns, setGameTurns] = useState([]);
  const [activePlayer, setActivePlayer] = useState('X');

  function handleSelectSquare(rowIndex, colIndex) {
    setActivePlayer((currentlyActivePlayer) =>
        currentlyActivePlayer === 'X' ? 'O' : 'X'
    )
    setGameTurns(prevTurns => {
      let updatedTurns;
      let currentPlayer = 'X';

      if (prevTurns.length > 0 && prevTurns[0].player === 'X') {
        currentPlayer = 'O';
      }

      updatedTurns = [
        {square: {row: rowIndex, col: colIndex}, player: activePlayer},
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

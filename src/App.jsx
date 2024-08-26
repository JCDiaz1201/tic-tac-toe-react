import {useState} from "react";
import GameBoard from "./componenets/gameboard/GameBoard.jsx";
import GameOver from "./componenets/gameOver/GameOver.jsx";
import Player from "./componenets/Player.jsx";
import Log from "./componenets/log/Log.jsx";
import { WINNING_COMBINATIONS } from "./winning-combinations.js"

const initialGameBoard = [
  [null, null, null],
  [null, null, null],
  [null, null, null]
]

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
  let gameBoard = [...initialGameBoard.map(array => [...array])];
  let winner = null;

  for (const turn of gameTurns) {
    const { square, player } = turn;
    const { row, column } = square;

    gameBoard[row][column] = player;
  }

  for (const combination of WINNING_COMBINATIONS) {
    const firstSquareSymbol =
        gameBoard[combination[0].row][combination[0].column]
    const secondSquareSymbol =
        gameBoard[combination[1].row][combination[1].column]
    const thirdSquareSymbol =
        gameBoard[combination[2].row][combination[2].column]

    if ( firstSquareSymbol
        && firstSquareSymbol === secondSquareSymbol
        && firstSquareSymbol === thirdSquareSymbol )
    {
      winner = firstSquareSymbol;
    }
  }

  const hasDraw = gameTurns.length === 9 && !winner;

  function handleSelectSquare(rowIndex, colIndex) {
    setGameTurns(prevTurns => {
      let updatedTurns;
      let currentPlayer =  deriveActivePlayer(prevTurns);

      updatedTurns = [
        {square: {row: rowIndex, column: colIndex}, player: currentPlayer},
        ...prevTurns,
      ];
      return updatedTurns;
    });
  }

  function handleRestart() {
    setGameTurns([]);
  }

  return (
    <main>
      <div id={"game-container"}>
        <ol id={"players"} className={"highlight-player"}>
          <Player initialName={"player 1"} symbol={"X"} isActive={activePlayer === 'X'} />
          <Player initialName={"player 2"} symbol={"O"} isActive={activePlayer === 'O'} />
        </ol>
        <GameBoard
            onSelectSquare={handleSelectSquare}
            board={gameBoard}
        />
      </div>
      {(winner || hasDraw) &&
          (<GameOver winner={winner} onRestart={handleRestart}/>
          )}
      <Log gameLogs={gameTurns}/>
    </main>
  )
}

export default App

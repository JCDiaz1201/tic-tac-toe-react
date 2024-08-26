

export default function GameBoard({ onSelectSquare, board }) {
    // Below is for reference now
    // const [gameBoard, setGameBoard] = useState(initialGameBoard);
    //
    // function handleSquare(rowIndex, columnIndex) {
    //     setGameBoard((prevGameBoard) => {
    //         // IMPORTANT! - When we update state that is an array or an object we need a 'deep' copy
    //         // of the state of the array to work with. Directly updating the state with objects directly
    //         // is bad bc it can lead to weird bugs and side effects.
    //         // const updatedGameBoard = [...preGameBoard]; - creates a 'shallow copy', we need a deep one
    //         // A deep copy is one that has no reference to the original state (gameBoard) in memory
    //         const updatedGameBoard = [...prevGameBoard.map(innerArray => [...innerArray])];
    //         updatedGameBoard[rowIndex][columnIndex] = activePlayerSym
    //         return updatedGameBoard
    //     });
    //
    //     onSelectSquare();
    // }

    return (
        <ol id={"game-board"}>
            {board.map((row, rowIndex) => <li key={rowIndex}>
                <ol>
                    {row.map((playerSymbol, colIndex) =>
                        <li key={colIndex}>
                            <button
                                onClick={
                                () => onSelectSquare(rowIndex, colIndex)}
                                disabled={playerSymbol != null
                            }>
                                {playerSymbol}
                            </button>
                        </li>
                    )}
                </ol>
            </li>)}
        </ol>
    )
}
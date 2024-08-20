
export default function Log({ gameLogs }) {
    return (
        <ol id="log">
            {gameLogs.map((log, logIndex) => (
                <li key={`log-${logIndex}`}>
                    Player {log.player}: Selected: Row {log.square.row} and Col {log.square.col}
                </li>
            ))}
        </ol>
    )
}
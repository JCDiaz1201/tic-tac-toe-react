import {useState} from "react";

export default function Player({ initialName, symbol, isActive }) {
    const [playerName, setPlayerName] = useState(initialName);
    const [isEditing, setIsEditing] = useState(false);

    function handleEditClick() {
        setIsEditing((editing) => !editing)
    }

    // 'event' object is auto made available to this function from a pointer
    function handleChange(event) {
        setPlayerName(event.target.value)
    }

    let playerNameElement = <span className={"player-name"}>{playerName}</span>

    if (isEditing) {
        // Below is two-way binding
        playerNameElement = <input type={"text"} required value={playerName} onChange={handleChange} />
    }

    return (
        <li className={isActive ? 'active' : undefined }>
          <span className={"player"}>
            {playerNameElement}
            <span className={"player-symbol"}>{symbol}</span>
          </span>
            <button onClick={handleEditClick}>{isEditing ? "Save" : "Edit"}</button>
        </li>
    );
}
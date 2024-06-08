import './TableCard.css';
export default function TableCard({ table, id }) {

    const north = table.playersDirections["NORTH"] || "Empty"
    const east = table.playersDirections["EAST"] || "Empty"
    const south = table.playersDirections["SOUTH"] || "Empty"
    const west = table.playersDirections["WEST"] || "Empty"

    return (
        <div className="TableCard" id={id}>
            <p className="GameName">{table["gameName"]}</p>
            <p className="North">N: {north}</p>
            <p className="East">E: {east}</p>
            <p className="South">S: {south}</p>
            <p className="West">W: {west}</p>
            <p className="Spectators">{table.numberOfSpectators}: spectators</p>
            <button className="Spectate">Spectate!</button>
        </div>
    );
}
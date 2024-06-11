import './DoubleDummyTable.css'
export default function DoubleDummyTable({ values, onHandleDrawHand }) {
    const directions = ["NORTH","SOUTH","EAST","WEST"]
    const strains = ["CLUBS","DIAMONDS","HEARTS","SPADES","NOTRUMPS"]
    if(values===undefined || values===null || values["NORTH"]==null){
        return (
            <div className="DoubleDummyTable">
                <p>Empty</p>
            </div>
        )
    } else {
        const header = (
            <thead>
                <tr>
                    <th key="emptySpace"> </th>
                    {strains.map(strain =>( <th key={"th_"+strain}>{strain.charAt(0)}</th> ))}
                </tr>
            </thead>
        )
        
        const allRows = directions.map( direction => (
            <tbody key={"tbody_"+direction}>
                <tr>
                    <td key={"td_"+direction}>{direction.charAt(0)}</td>
                    {strains.map(strain => (<td key={direction + strain}>{values[direction][strain]}</td>))}
                </tr>
            </tbody>
        ))

        return (
            <div className="DoubleDummyTable">
                <table>
                    {header}
                    {allRows}
                </table>
                <button onClick={onHandleDrawHand}>Draw random board</button>
            </div>
        );
    }
}

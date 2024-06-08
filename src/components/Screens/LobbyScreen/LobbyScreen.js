import TableCard from "../../TableCard/TableCard";

export default function LobbyScreen({tableList}) {
    
    const allTableCards = tableList.map(table => {
        return <TableCard
                table={table}
                key={table.id}
            />
    });

    return <div className="Lobby">
        {allTableCards}
    </div>
}
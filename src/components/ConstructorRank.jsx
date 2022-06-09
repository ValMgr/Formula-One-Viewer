

export default function ConstructorRank(props){
    const { rank } = props;

    return(
        <table>
            <thead>
                <tr>
                    <th>Position</th>
                    <th>Team</th>
                    <th>Wins</th>
                    <th>Points</th>
                </tr>
            </thead>
            <tbody>
               {rank.map(r => (
                   <tr key={r.Constructor.constructorId}>
                        <th>{r.position}</th>
                        <td>{r.Constructor.name}</td>
                        <td>{r.wins}</td>
                        <td>{r.points}</td>
                   </tr>
               ))}
            </tbody>
        </table>
    )
}
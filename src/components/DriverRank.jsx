

export default function DriverRank(props){
    const { rank } = props;

    return(
        <table>
            <thead>
                <tr>
                    <th>Position</th>
                    <th>Team</th>
                    <th>Wins</th>
                    <th>Points</th>
                    <th>Name</th>
                    <th>Firstname</th>
                    <th>Nationality</th>
                </tr>
            </thead>
            <tbody>
               {rank.map(r => (
                   <tr key={r.Driver.driverId}>
                        <th>{r.position}</th>
                        <td>{r.Constructors[0].name}</td>
                        <td>{r.wins}</td>
                        <td>{r.points}</td>
                        <td>{r.Driver.givenName}</td>
                        <td>{r.Driver.familyName}</td>
                        <td>{r.Driver.nationality}</td>
                   </tr>
               ))}
            </tbody>
        </table>
    )
}
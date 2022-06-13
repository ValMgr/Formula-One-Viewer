export default function raceSchedule(props){
    const {races} = props;

    return (
        <table>
            <thead>
                <tr>
                    <th>Race Name</th>
                    <th>Circuit</th>
                    <th>Date</th>
                    <th>Time</th>
                    <th>Pole</th>
                    <th>1st</th>
                    <th>2nd</th>
                    <th>3nd</th>
                </tr>
            </thead>
            <tbody>
                {races.map(race => (
                    <tr key={race.raceName.toLowerCase().replace(/\s+/g, '_')}>
                        <td>{race.raceName}</td>
                        <td>{race.Circuit.circuitName}</td>
                        <td>{race.date}</td>
                        <td>{race.time}</td>
                        <td>{race.pole && race.pole.Driver.givenName + ' ' + race.pole.Driver.familyName}</td>
                        {race.podium ? race.podium.map(position => (
                            <td key={position.Driver.driverId}>{position.Driver.givenName} {position.Driver.familyName} <span>({position.Constructor.name})</span></td>
                        )) : (<><td></td><td></td><td></td></>)}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}

export default function DriverTable(props){
    const { drivers, constructors, year } = props;

    return (
        <table>
            <thead>
                <tr>
                    <th>Team</th>
                    <th>Name</th>
                    <th>Firstname</th>
                    <th>Code</th>
                    <th>Number</th>
                    <th>Nationality</th>
                </tr>
            </thead>
            <tbody>
                {drivers.map(driver => (
                    <tr key={driver.driverId}>
                        <td>{constructors.find(constructor => constructor.constructorId === driver.constructors.find(team => team.season === year).name).name}</td>
                        <td>{driver.givenName}</td>
                        <td>{driver.familyName}</td>
                        <td>{driver.code}</td>
                        <td>{driver.permanentNumber}</td>
                        <td>{driver.nationality}</td>
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
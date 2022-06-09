import { Link, Outlet } from "react-router-dom";


export default function SeasonShort(props){
    const {season} = props;
    const link = '/seasons/'+season.season;


    return (
        <Link to={link} className="seasonCard">
            <h2>{season.season}</h2>
            <p className="champions">Champions :</p>
            {season.driverChampion && <p>Driver: {season.driverChampion.driver.givenName} {season.driverChampion.driver.familyName}  <span>({season.driverChampion.constructor.name})</span></p>}
            {season.constructorChampion && <p>Constructor: {season.constructorChampion.name}</p>}
        </Link>
    )
}
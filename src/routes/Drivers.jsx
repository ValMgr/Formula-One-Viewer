import React, { useState, useEffect } from 'react';
import fetchAPI from "../services/fetchAPI";

import { ClipLoader } from 'react-spinners';
import Select from 'react-select'
import DriverTable from '../components/DriverTable';


export default function Drivers(){
    const currentYear = new Date().getFullYear();
    const [drivers, setDrivers] = useState([]);
    const [teams, setTeams] = useState([]);
    const [seasons, setSeasons] = useState([]);
    const [loading, setLoading] = useState(true);
    
    const [yearFilter, setYearFilter] = useState(currentYear);


    const getDrivers = async (year, params) => {
        const data = await fetchAPI(`${year}/drivers`, params);
        data.MRData.DriverTable.Drivers.forEach(async driver => {
            const team = await getConstructor(year, driver);
            if(!drivers.find(d => d.driverId === driver.driverId)){
                driver.constructors = [];
                driver.constructors.push({season: parseInt(year), name: team});
                setDrivers(drivers => [...drivers, driver]);
            }
            else{
                const index = drivers.findIndex(d => d.driverId === driver.driverId);
                if(!drivers[index].constructors.find(c => c.season === parseInt(year))){
                    drivers[index].constructors.push({season: parseInt(year), name: team});
                    setDrivers(drivers => [...drivers]);
                }
            }
        });
    }

    const getConstructor = async (year, driver) => {
        const team = await fetchAPI(`${year}/drivers/${driver.driverId}/constructors`, { limit: 1 }).then(constructorData => {
            if(!teams.find(t => t.constructorId === constructorData.MRData.ConstructorTable.Constructors[0].constructorId)){
                setTeams(teams => [...teams, constructorData.MRData.ConstructorTable.Constructors[0]]);
            }
            return constructorData.MRData.ConstructorTable.Constructors[0].constructorId;
        });
        return team;
    }

    const selectYear = (e) => {
        setYearFilter(e.value);
        getDrivers(e.value, {limit: 50});
    }

    useEffect(() => {
        fetchAPI('seasons', {limit: 100}).then(data => setSeasons(data.MRData.SeasonTable.Seasons.reverse()));
        getDrivers(currentYear, {limit: 20}).then(() => setLoading(false));
    }, []);

    return (
        <>
            <h2>Drivers</h2>

            <div className="filters">
                <Select defaultValue={{value: currentYear, label: currentYear}} options={seasons.map(season => ({value: season.season, label: season.season}))} onChange={(e) => selectYear(e)} />
            </div>
            <div className='center'>
                {loading ? <ClipLoader color="#520002" /> : <DriverTable year={parseInt(yearFilter)} constructors={teams} drivers={drivers.filter(driver => driver.constructors.find(constructor => constructor.season === parseInt(yearFilter)))} />}
            </div>
        </>
    );
}
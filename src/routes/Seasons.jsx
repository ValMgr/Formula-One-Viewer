import React, { useState, useEffect } from 'react';
import fetchAPI from "../services/fetchAPI";
import { Link, Outlet } from "react-router-dom";
import SeasonShort from '../components/SeasonShort';

import ConstructorRank from '../components/ConstructorRank';
import DriverRank from '../components/DriverRank';
import RaceSchedule from '../components/RaceSchedule';

export function Seasons(){
    const [seasons, setSeasons] = useState([]);

    const getSeasons = async () => {
        const seasons = await fetchAPI('seasons').then(data => data.MRData.SeasonTable.Seasons.reverse());
        await seasons.forEach(async season => {
            season.driverChampion = await getDriverChampion(season.season);
            season.constructorChampion = await getConstructorChampion(season.season);
            setSeasons(seasons => [...seasons.sort((a, b) => parseInt(b.season) - parseInt(a.season)), season]);
        });
    }

    const getDriverChampion = async (year) => {
        return fetchAPI(year+'/driverStandings/1').then(data => {
            return {
                driver:  data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Driver,
                constructor: data.MRData.StandingsTable.StandingsLists[0].DriverStandings[0].Constructors[0]
            }
        });
    }

    const getConstructorChampion = async (year) => {
        return fetchAPI(year+'/constructorStandings/1').then(data => {
            if(data.MRData.StandingsTable.StandingsLists.length === 0) return null;
            return data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings[0].Constructor;
        });
    }

    useEffect(() => {
        getSeasons();    
    }, []);

    return (
        <div>
            <h2>Seasons</h2>
            <ul className='seasonsList'>
                {seasons.sort((a, b) => parseInt(b.season) - parseInt(a.season)).map(season => (<SeasonShort key={season.season} season={season} />))}
            </ul>
            <Outlet />
        </div>
    );
}



export function Season(){
    const year = parseInt(window.location.pathname.split('/')[2]);
    const [driverRank, setDriverRank] = useState([]);
    const [constructorRank, setConstructorRank] = useState([]);
    const [raceSchedule, setRaceSchedule] = useState([]);

    const getDriverRank = async () => {
        const driverRank = await fetchAPI(year+'/driverStandings').then(data => data.MRData.StandingsTable.StandingsLists[0].DriverStandings);
        setDriverRank(driverRank);
    }

    const getConstructorRank = async () => {
        const constructorRank = await fetchAPI(year+'/constructorStandings').then(data => data.MRData.StandingsTable.StandingsLists[0].ConstructorStandings);
        setConstructorRank(constructorRank);
    }

    const getRaceSchedule = async () => {
        const raceSchedule = await fetchAPI(year).then(data => data.MRData.RaceTable.Races);
        raceSchedule.forEach(async (race, index) => {
            race.pole = await fetchAPI(year+'/'+(index+1)+'/qualifying', {limit: 1}).then(data => data.MRData.RaceTable.Races.length > 0 ? data.MRData.RaceTable.Races[0].QualifyingResults[0] : null);
            race.podium = await fetchAPI(year+'/'+(index+1)+'/results', {limit: 3}).then(data => data.MRData.RaceTable.Races.length > 0 ? data.MRData.RaceTable.Races[0].Results : null);
            setRaceSchedule([...raceSchedule], race);
        });
    }


    useEffect(() => {
        getDriverRank();
        getConstructorRank();
        getRaceSchedule();
    }, []);

    return (
        <div>
            <Link className='btn btn-secondary' to="/seasons">Back</Link>
            <h2>Formula One {year} Championship</h2>

            <DriverRank rank={driverRank} />
            <hr />
            {constructorRank.length > 0 && <ConstructorRank rank={constructorRank} /> }
            {constructorRank.length > 0 && <hr />}
            <RaceSchedule races={raceSchedule} />
        </div>
    )
}
import React, { useState, useEffect } from 'react';
import fetchAPI from "../services/fetchAPI";
import { Link, Outlet } from "react-router-dom";
import SeasonShort from '../components/SeasonShort';


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

export function Season(props){

    return (
        <div>
            One season
        </div>
    )
}
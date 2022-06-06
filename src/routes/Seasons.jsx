import React, { useState, useEffect } from 'react';
import fetchAPI from "../services/fetchAPI";
import { Link, Outlet } from "react-router-dom";


export function Seasons(){
    const [seasons, setSeasons] = useState([]);

    useEffect(() => {
      fetchAPI('seasons').then(data => setSeasons(data.MRData.SeasonTable.Seasons));
    }, []);

    return (
        <div>
            <h2>Seasons</h2>
            <ul className='seasonsList'>
                {seasons.map(season => (<Link to={season.season}>{season.season}</Link>))}
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
import React, { useState, useEffect } from 'react';
import fetchAPI from "../services/fetchAPI";


export default function Seasons(){
    const [seasons, setSeasons] = useState([]);

    useEffect(() => {
      fetchAPI('seasons').then(data => setSeasons(data.MRData.SeasonTable.Seasons));
    }, []);

    return (
        <div>
            <h2>Seasons</h2>
            <ul>
                {seasons.map(season => (<li>{season.season}</li>) )}
            </ul>
        </div>
    );
}
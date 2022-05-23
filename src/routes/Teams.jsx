import React, { useState, useEffect } from 'react';
import fetchAPI from "../services/fetchAPI";

export default function Teams(){
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        fetchAPI(currentYear+'/constructors', {limit: 10}).then(data => setTeams(data.MRData.ConstructorTable.Constructors));
    }, []);

    return (
        <div>
            <h2>Teams</h2>
            <ul>
                {teams.map(team => (<li>{team.name}</li>) )}
            </ul>
        </div>
    );
}
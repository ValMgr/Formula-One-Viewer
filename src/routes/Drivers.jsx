import React, { useState, useEffect } from 'react';
import fetchAPI from "../services/fetchAPI";


export default function Drivers(){
    const [drivers, setDrivers] = useState([]);

    useEffect(() => {
        const currentYear = new Date().getFullYear();
        fetchAPI(currentYear+'/drivers', {limit: 20}).then(data => setDrivers(data.MRData.DriverTable.Drivers));
    }, []);


    return (
        <div>
            <h2>Drivers</h2>
            <ul>
                {drivers.map(driver => (<li>{driver.givenName} {driver.familyName}</li>) )}
            </ul>
        </div>
    );
}
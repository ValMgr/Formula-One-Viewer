const baseURL = "https://ergast.com/api/f1/";
const type = 'json';

export default async function fetchAPI(endpoint = 'drivers', params = {limit: 9999}){
    const parameters = encodeQueryData(params);
    return fetch(baseURL + endpoint + '.' + type + '?' + parameters)
        .then(response => response.json())
}

function encodeQueryData(data) {
    const ret = [];
    for (let d in data) ret.push(encodeURIComponent(d) + '=' + encodeURIComponent(data[d]));
    return ret.join('&');
}
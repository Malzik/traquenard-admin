import axios from 'axios';

let config;

const initConfig = () =>
    axios
        .get('/config.json')
        .then(response => {
            config = response.data;
        })
        .catch(err => {
            console.error('No config found');
            throw err;
        });

const getConfig = () => config;

export { initConfig, getConfig };

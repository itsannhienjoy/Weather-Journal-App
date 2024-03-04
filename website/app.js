/* Global Variables */

// Base URL and API key for accessing OpenWeather API
const baseURL = "http://api.openweathermap.org/data/2.5/weather?zip=${zipCode.value}&appid=${apiKey}&units=metric";
const key = '940f2cf8eb920327526a42531bb5d414';

const generateBtn = document.getElementById('generate');
const datePlaceholder = document.getElementById('date');
const contentPlaceholder = document.getElementById('content');

// Real-time date instance dynamically with JS
let d = new Date();
let newDate = d.getMonth() + '.' + d.getDate() + '.' + d.getFullYear();

// GET requests
const getServerData = async (url = '') =>{
    const response = await fetch(url);

    try {
        return await response.json();
    } catch (error) {
        console.log("error", error);
    }
};

const getWeatherData = async (baseUrl, apiKey, zipCode) =>{
    const response = await fetch(`${baseUrl}${zipCode},us&appid=${apiKey}`);

    try {
        return await response.json();
    } catch (error) {
        console.log("error", error);
    }
};

const postDataToTheServer = async (url = '', data = {}) => {
    const response = await fetch(url, {
        method: 'POST',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
    });

    try {
        return await response.json();
    } catch (error) {
        console.log("error", error);
    }
};

// Event listeners
generateBtn.addEventListener('click', (e) => {
    const zipCode = document.getElementById('zip').value;
    const feelings = document.getElementById('feelings').value;

    getWeatherData(baseUrl, apiKey, zipCode)
        .then((weatherData) => {
            postDataToTheServer('/add', {
                temperature : weatherData.main.temp,
                date : newDate,
                userResponse : feelings
            });

            getServerData('/data')
                .then((data) => {
                    tempPlaceholder.textContent = data.temperature;
                    datePlaceholder.textContent = data.date;
                    contentPlaceholder.textContent = data.userResponse;
                })
        });
});

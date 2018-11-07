const axios = require('axios');

const OPEN_WEATHER_MAP_KEY = 'f61b42e68ca6a20281011cf39a2e95fb';

let Locations = async (city) => {
    try {
        let forecastUrl = `http://api.openweathermap.org/data/2.5/forecast?q=${city}&APPID=${OPEN_WEATHER_MAP_KEY}`;
        let forecastResponse = await axios.get(forecastUrl);

        let todaysData = forecastResponse.data.list[0];
        let tomorrowsData = forecastResponse.data.list[9];

        let iconUrlForToday = `http://openweathermap.org/img/w/${forecastResponse.data.list[0].weather[0].icon}.png`;
        let iconUrlForTomorrow = `http://openweathermap.org/img/w/${forecastResponse.data.list[9].weather[0].icon}.png`;

        let currentDailyHighInKelvin = todaysData.main.temp_max;
        let currentDailyLowInKelvin = todaysData.main.temp_min;
        let currentHighInFahrenheit = kelvinToFahrenheit(currentDailyHighInKelvin);
        let currentLowInFahrenheit = kelvinToFahrenheit(currentDailyLowInKelvin);

        let tomorrowDailyHighInKelvin = tomorrowsData.main.temp_max;
        let tomorrowDailyLowInKelvin = tomorrowsData.main.temp_min;
        let tomorrowHighInFahrenheit = kelvinToFahrenheit(tomorrowDailyHighInKelvin);
        let tomorrowLowInFahrenheit = kelvinToFahrenheit(tomorrowDailyLowInKelvin);

        let date = new Date(todaysData.dt_txt)
        date.setHours(date.getHours() - 6);

        console.log(todaysData.clouds.all);
        console.log(tomorrowsData.clouds.all);

        let cityDetails = {
            currentDailyLow: currentLowInFahrenheit,
            currentDailyHigh: currentHighInFahrenheit,
            currentDescription: todaysData.weather[0].main,
            currentDetailedDescription: todaysData.weather[0].description,
            currentWindSpeed: todaysData.wind.speed,
            currentClouds: todaysData.clouds.all,

            tomorrowDailyLow: tomorrowLowInFahrenheit,
            tomorrowDailyHigh: tomorrowHighInFahrenheit,
            tomorrowDescription: tomorrowsData.weather[0].main,
            tomorrowDetailedDescription: tomorrowsData.weather[0].description,
            tomorrowWindSpeed: tomorrowsData.wind.speed,
            tomorrowClouds: tomorrowsData.clouds.all,

            timeUpdated: `${date}`,
            iconUrlForTomorrow: iconUrlForTomorrow,
            iconUrlForToday,
        }

        return cityDetails;
    } catch(error) {
        return 1;
    }
};

kelvinToFahrenheit = (kelvin) => {
    return Math.round(((kelvin-273.15)*1.8)+32);
}

export default {
    Locations
};


import SearchBox from "./SearchBox";
import InfoBox from "./InfoBox";
import { useState } from "react";

// Import day and night weather images
import cloudyDay from './images/day/cloudy.jpg';
import cloudyNight from './images/night/cloudy.jpg';
import rainyDay from './images/day/rainy.jpg';
import rainyNight from './images/night/rainy.jpg';
import snowyDay from './images/day/snowy.jpg';
import snowyNight from './images/night/snowy.jpg';
import clearDay from './images/day/clear.jpg';
import clearNight from './images/night/clear.jpg';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';
import AcUnitIcon from '@mui/icons-material/AcUnit';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';

import './styles.css';

export default function WeatherApp() {

    let [weatherInfo, setWeatherInfo] = useState(
        {
            city: "Bijnor",
            temp: 23.98,
            feelsLike: 24.68,
            tempMin: 23.98,
            tempMax: 23.98,
            humidity: 86,
            weather: "overcast clouds"
        }
    );

    let updateInfo = (newInfo) => {
        setWeatherInfo(newInfo);
    }

    // Function to determine if it is daytime based on sunrise and sunset times
    const isDayTime = (currentTime) => {

        return currentTime > 12 ? true : false;
    };

    // Function to determine the weather condition based on temperature and weather description
    const getWeatherCondition = (temp, weatherDescription) => {
        weatherDescription = weatherDescription.toLowerCase();
        if (weatherDescription.includes("rain") || weatherDescription.includes("drizzle")) {
            return "rainy";
        } else if (temp < 15) {
            return "snowy";
        } else if (weatherDescription.includes("cloud")) {
            return "cloudy";
        } else if (temp >= 15) {
            return "clear";
        } else {
            return "clear"; // Default to clear if none of the above conditions match
        }
    };

    const findDay = (day) => {
        const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        return days[day];
    }

    // getting time in hours and then compare
    const date = new Date();
    const currentTime = date.getHours();
    console.log(currentTime);

    // Determine if it is day or night based on current time, sunrise, sunset, and timezone
    const isDay = isDayTime(currentTime);
    console.log(isDay);

    // finding day
    const day = findDay(date.getDay())


    // Determine the weather condition based on the provided information
    const weatherCondition = getWeatherCondition(weatherInfo.temp, weatherInfo.weather);
    console.log(weatherCondition);


    // Select the appropriate image based on weather condition and time of day
    let backgroundImage;
    switch (weatherCondition) {
        case "clear":
            backgroundImage = isDay ? clearDay : clearNight;
            break;
        case "cloudy":
            backgroundImage = isDay ? cloudyDay : cloudyNight;
            break;
        case "rainy":
            backgroundImage = isDay ? rainyDay : rainyNight;
            break;
        case "snowy":
            backgroundImage = isDay ? snowyDay : snowyNight;
            break;
        default:
            backgroundImage = isDay ? clearDay : clearNight; // Default to clear image if condition is not recognized
    }


    return (
        <>
            <div className="full-screen-background" style={{ backgroundImage: `url(${backgroundImage})` }}>

                <div className="header">
                    <h2 style={{ color: "white", margin: "20px 0 0 20px" }}>Watch Out Weather</h2>
                    <h2 style={{ color: "white", marginLeft: "20px" }}>(WOW)</h2>

                    <div style={{ paddingTop: "400px", fontSize: "25px" }}>
                        Temp : {weatherInfo.temp}; {" "}
                        {
                            weatherInfo.humidity > 80 ? <ThunderstormIcon /> :
                                weatherInfo.temp > 23 ? <WbSunnyIcon /> :
                                    weatherCondition === "snowy" ? <AcUnitIcon /> :
                                        weatherCondition === "cloudy" ? <WbCloudyIcon /> : <WbSunnyIcon />
                        }
                        <br /><br />
                        Time - {date.getHours()}:{date.getMinutes()}:{date.getSeconds()}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Date - {date.getDate()}-{date.getMonth()}-{date.getFullYear()}
                        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        Day - {day}
                        <br /><br />
                    </div>
                </div>

                <div className="main">
                    <SearchBox updateInfo={updateInfo} />
                    <InfoBox info={weatherInfo} />
                </div>

            </div>
        </>
    );
}
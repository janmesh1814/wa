import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { useState } from 'react';
import "./SearchBox.css";
export default function SearchBox({ updateInfo }) {
    let [city, setCity] = useState("");
    let [error, setError] = useState(false);

    const API_URL = "https://api.openweathermap.org/data/2.5/weather"
    const API_KEY = "d25acaad17208ede92c43dbe408c105f";

    let getWeatherInfo = async () => {

        try {
            let response = await fetch(`${API_URL}?q=${city}&appid=${API_KEY}&units=metric`);
            let jsonResponse = await response.json();
            console.log(jsonResponse);
            let info = {
                city: city,
                temp: jsonResponse.main.temp,
                tempMin: jsonResponse.main.temp_min,
                tempMax: jsonResponse.main.temp_max,
                humidity: jsonResponse.main.humidity,
                feelsLike: jsonResponse.main.feels_like,
                weather: jsonResponse.weather[0].description,
                cloudy: jsonResponse.clouds.all
            };
            console.log(info);

            return info;
        } catch (err) {
            throw err;
        }

    }
    let handleChange = (evt) => {
        setCity(evt.target.value);
    }

    let handleSubmit = async (evt) => {

        try {
            evt.preventDefault();
            console.log(city);
            setCity("");
            setError(false);
            let newInfo = await getWeatherInfo();
            updateInfo(newInfo);
        } catch (err) {
            setError(true)
        }

    }
    return (
        <div className="SearchBox">
            <form action="" onSubmit={handleSubmit}>
                <TextField id="city" label="City Name" variant="outlined" value={city} onChange={handleChange} required />
                <br /> <br />
                <Button variant="contained" type="submit">
                    Search
                </Button>
            </form>

            {error && <p style={{ color: "red" }} >Oops!! No such Place found.</p>}
        </div>
    );
}

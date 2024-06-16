import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';


import "./InfoBox.css";


export default function InfoBox({ info }) {


    return (
        <div className="InfoBox">
            <div className="cardContainer">
                <Card sx={{ maxWidth: 345 }}>
                    {/* <CardMedia
                        sx={{ height: 140 }}

                    /> */}
                    <CardContent>
                        <Typography gutterBottom variant="h5" component="div">

                            {info.city}{" "}

                        </Typography>
                        <div style={{ backgroundColor: "none" }}>
                            <p>Temperature = {info.temp}&deg;C</p> <br />
                            <p>Humidity = {info.humidity}%</p> <br />
                            <p>Cloudy = {info.cloudy}%</p> <br />
                            <p>Weather can be described as <i>{info.weather}</i> but FeelsLike {info.feelsLike}</p>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}


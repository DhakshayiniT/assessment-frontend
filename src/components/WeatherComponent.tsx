import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import CardContent from '@mui/material/CardContent';
import { Grid } from '@mui/material';
import Typography from '@mui/material/Typography';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import WbCloudyIcon from '@mui/icons-material/WbCloudy';
import ThunderstormIcon from '@mui/icons-material/Thunderstorm';

interface WeatherData {
  location: string;
  condition: string;
  temperature: number;
  unit: string;
  upcomming: { day: string; conditionName: string }[];
}

const WeatherComponent: React.FC<{ lat: string; lon: string }> = ({ lat, lon }) => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(`http://localhost:3030/integration/weather?lat=${lat}&lon=${lon}`);
        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }
        const data = await response.json();
        setWeatherData(data.data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };

    fetchWeatherData();

    // Cleanup function
    return () => {
      setWeatherData(null);
    };
  }, [lat, lon]);

  return (
    <Grid item xs={8} style={{padding:"12px 0px"}}>
      {weatherData ? (
         <Card style={{height:"104px"}}>
      <Grid container style={{display:"flex", alignItems:"center",padding:"12px"}}>
      <Grid item xs={2} style={{textAlign:"center"}}>
        <WbSunnyIcon style={{color:"yellow",fontSize:"44px"}}/>
        </Grid>
        <Grid item xs={4}>
      <Typography style={{fontSize:"24px"}} color="text.secondary">
        {weatherData.temperature} °{weatherData.unit.toUpperCase()}
        </Typography>
        <Typography style={{fontSize:"12px"}} color="text.secondary">{weatherData.condition}</Typography>
          </Grid>
          <Grid item xs={6}>
          <Typography style={{fontSize:"12px"}} color="text.secondary">{weatherData.location}</Typography>
          <Grid container>
            {weatherData.upcomming.map(days => (
              <Grid item xs={3}>
              
              {days.conditionName=="Clear"&&<WbSunnyIcon style={{color:"yellow",fontSize:"24px"}}/>}
              {days.conditionName=="Cloudy"&&<WbCloudyIcon style={{color:"grey",fontSize:"24px"}}/>}
              {days.conditionName=="Rain"&&<ThunderstormIcon style={{color:"grey",fontSize:"24px"}}/>}
              <Typography style={{fontSize:'12px'}}>{days.day}</Typography>
              </Grid>
            ))}
          </Grid>
          </Grid>
      </Grid>
 
    </Card>
) : (
  <p>Loading...</p>
)}
    </Grid>
  );
};

export default WeatherComponent;

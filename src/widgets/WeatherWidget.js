import React, { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSun, faCloud, faCloudSun, faCloudRain, faSnowflake, faBolt } from '@fortawesome/free-solid-svg-icons';

const WeatherWidget = () => {
  const [weatherData, setWeatherData] = useState(null);

  useEffect(() => {
    // Function to retrieve weather data based on latitude and longitude
    const getWeatherData = async (latitude, longitude) => {
      const apiKey = '595a97c490abef2e1ed8f0541b0d0e1c'; // Replace with your OpenWeatherMap API key
      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        setWeatherData(data);
      } catch (error) {
        console.log('Error fetching weather data:', error);
      }
    };

    // Function to handle successful retrieval of geolocation
    const handleGeoSuccess = (position) => {
      const { latitude, longitude } = position.coords;
      getWeatherData(latitude, longitude);
    };

    // Function to handle failure or denial of geolocation
    const handleGeoError = (error) => {
      console.log('Error retrieving geolocation:', error);
    };

    // Retrieve geolocation on component mount
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(handleGeoSuccess, handleGeoError);
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  }, []);

  // Function to get the weather icon based on weather condition
  const getWeatherIcon = (weatherCondition) => {
    switch (weatherCondition) {
      case 'Clear':
        return <FontAwesomeIcon icon={faSun} />;
      case 'Clouds':
        return <FontAwesomeIcon icon={faCloud} />;
      case 'Rain':
        return <FontAwesomeIcon icon={faCloudRain} />;
      case 'Drizzle':
        return <FontAwesomeIcon icon={faCloudSun} />;
      case 'Snow':
        return <FontAwesomeIcon icon={faSnowflake} />;
      case 'Thunderstorm':
        return <FontAwesomeIcon icon={faBolt} />;
      default:
        return null;
    }
  };

  return (
    <div>
      {weatherData ? (
        <div>
          <div>
            <p style={{ fontSize:"50px", }}>{weatherData.name}</p>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <p style={{fontSize: "90px"}}>{getWeatherIcon(weatherData.weather[0].main)}</p>
              <p style={{fontSize: "50px"}}>{weatherData.main.temp}°F</p>
            </div>
          </div>
          <p style={{fontSize: "30px"}}>{weatherData.weather[0].description}</p>

        </div>
      ) : (
        <p>Loading weather data...</p>
      )}
    </div>
  );
};

export default WeatherWidget;
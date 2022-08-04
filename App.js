import { StatusBar } from 'expo-status-bar';
import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import SearchBar from './app/components/SearchBar';
import Weather from './app/components/Weather';

//const API_KEY = "0a0dc2ac4d8fc4cd27671c35cc6e4537";this is mine
const API_KEY = "6e93b3d15872f914c6929fed9ea71e9a";//borrowed


export default function App() {
  const [weatherData, setWeatherData] = useState(null);
  const [loaded, setLoaded] = useState(true);



  function fetchWeatherData(cityName) {
    setLoaded(false);

    // const API = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
    try {
      fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`)
        .then(data => data.json())
        .then(data => {
          setWeatherData(data);
          //console.log(data);
        })
      setLoaded(true);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchWeatherData('Nairobi');
    console.log(weatherData, "working?");
  }, []);

  if (!loaded) {
    return (
      <View style={styles.container}>
        <ActivityIndicator color="dodgerblue" size={36} />

      </View>
    )
  } else if (weatherData == null) {

    return (
      <View>
        <SearchBar fetchWeatherData={fetchWeatherData} />
        <Text style={styles.primaryText}>City Not Found! Try Different City</Text>
      </View>
    )

  }

  // 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
  return (
    <View style={styles.container}>
      
      <Weather weatherData={weatherData} fetchWeatherData={fetchWeatherData} />


    </View>
  );
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  primaryText: {
    margin: 20,
    fontSize: 28
}
})

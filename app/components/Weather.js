import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, ImageBackground, Dimensions, StatusBar } from 'react-native';
import SearchBar from './SearchBar';
import { haze, rainy, snow, sunny } from '../assets/backgroundImages/index';

function Weather({ weatherData, fetchWeatherData }) {
  const [backgroundImage, setBackgroundImage] = useState(null);

  const { weather,
    name,
    main: { temp_min, temp_max, temp, humidity, feels_like },
    wind: { speed }
  } = weatherData;
  const [{ main }] = weather;

  useEffect(() => {
    setBackgroundImage(getBackgroundImg(main));
    console.log(main)
  }, [weatherData])

  function getBackgroundImg(weather) {
    if (weather === 'Clouds') return snow
    if (weather === 'Clear') return sunny
    if (weather === 'Rain'|| 'Drizzle') return rainy
    if (weather === 'Haze') return haze
    return haze;
  }
  let textColor = backgroundImage !== sunny ? 'white' : 'black'

  return (
    <View style={styles.container}>
    <StatusBar backgroundColor='darkgray' />
    <ImageBackground 
        // source={backgroundImage}
        source={require(`../assets/backgroundImages/img/haze.jpg`)}
        style={styles.backgroundImg}
        resizeMode='cover'
      >


        <SearchBar fetchWeatherData={fetchWeatherData} />

        <View style={{ alignItems: 'center' }}>
          <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold', fontSize: 46 }}>{name}</Text>
          <Text style={{ ...styles.headerText, color: textColor, fontWeight: 'bold', fontSize: 33 }}>{main}</Text>
          <Text style={{ ...styles.headerText, color: textColor, fontSize: 33}}> {temp} °C</Text>
          <Text style={{ ...styles.headerText, color: textColor, }}>Max {temp_max} °C</Text>
          <Text style={{ ...styles.headerText, color: textColor, }}>Min {temp_min} °C</Text>
          {/* <Text style={{ ...styles.headerText, color: textColor, }}>Feels Like{feels_like} °C</Text> */}
        </View>

        <View style={styles.extraInfo}>

          <View style={styles.info}>
            <Text style={{ fontSize: 22, color: 'white' }}>Humidity</Text>
            <Text style={{ fontSize: 22, color: 'white' }}>{humidity} %</Text>
          </View>

          <View style={styles.info}>
            <Text style={{ fontSize: 22, color: 'white' }}>Wind Speed</Text>
            <Text style={{ fontSize: 22, color: 'white' }}>{speed} m/s</Text>
          </View>

        </View>


      </ImageBackground>
    </View>

  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
  },
  backgroundImg: {
    flex: 1,
    width: Dimensions.get('screen').width
  },
  headerText: {
    fontSize: 15,
    marginTop: 10,
  },
  extraInfo: {
    flexDirection: 'row',
    marginTop: 20,
    justifyContent: 'space-between',
    padding: 10
  },
  info: {
    width: Dimensions.get('screen').width / 2.5,
    backgroundColor: 'rgba(0,0,0, 0.5)',
    padding: 10,
    borderRadius: 15,
    justifyContent: 'center'
  }
});
export default Weather;
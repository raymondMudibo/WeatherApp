import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import SearchBar from '../components/SearchBar';
import Weather from '../components/Weather';
import { API_KEY } from '@env'


export default function CitiesScreen() {
    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(true);



    function fetchWeatherData(cityName) {
        setLoaded(false);
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

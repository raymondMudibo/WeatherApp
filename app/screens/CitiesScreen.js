import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, ActivityIndicator, FlatList, StatusBar } from 'react-native';
import SearchBar from '../components/SearchBar';
import Weather from '../components/Weather';
import { API_KEY } from '@env'



const Item = ({ title }) => (
    <View style={styles.item}>
        <Text style={styles.title}>{title}</Text>
    </View>
);
const cityID = "2078025,2063523,4005539,3469058,425378,2306104,2332453,2352778,361058,360630,524901,703448,2643743,184745,186301,373303,232422,202061,2314302,1040652"
const API_ENDPOINT = `https://api.openweathermap.org/data/2.5/group?id=${cityID}&units=metric&appid=${API_KEY}`;

export default function CitiesScreen() {
    const [weatherData, setWeatherData] = useState(null);
    const [loaded, setLoaded] = useState(true);

    const renderItem = ({ item }) => <Item title={item.name} />;



    function fetchWeatherData(cityID) {
        setLoaded(false);
        try {
            //fetch(`https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`)
            fetch(API_ENDPOINT)
                .then(data => data.json())
                .then(data => {
                    setWeatherData(data);
                    console.log(data);
                })
            setLoaded(true);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        fetchWeatherData('2078025');
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

            <FlatList
                data={weatherData}
                renderItem={renderItem}
                keyExtractor={item => item.id}
                horizontal
            />
        </View>

    );
}


const styles = StyleSheet.create({
    container: {
        
        backgroundColor: '#fff',
        alignItems: 'center',
        flexDirection:"row"

    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 10,
        marginVertical: 8,
        marginHorizontal: 16,
        height:150,
    },
    title: {
        fontSize: 20,
    },
    primaryText: {
        margin: 20,
        fontSize: 28
    }
})

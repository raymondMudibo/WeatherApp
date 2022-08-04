import React, { useState } from 'react'
import { View,Text, TextInput, StyleSheet, Dimensions } from 'react-native';
import { EvilIcons } from '@expo/vector-icons';

export default function SearchBar({ fetchWeatherData }) {

    const [cityName, setCityName] = useState('');

    return (
        <View style={styles.searchBar}>
            <TextInput
                placeholder='Please enter name of the City'
                value={cityName}
                onChangeText={(text) => setCityName(text)}
            />
            {/* <EvilIcons name="search" size={28} color="black" onPress={() => fetchWeatherData(cityName)} /> */}
            <EvilIcons name="search" size={28} color="black" onPress={function () {
                if (fetchWeatherData(cityName) === null || fetchWeatherData(cityName) === undefined) {
                    return (
                        <View>
                            <SearchBar fetchWeatherData={fetchWeatherData} />
                            <Text style={styles.primaryText}>City Not Found! Try Different City</Text>
                        </View>
                    );
                }
            }} />
        </View>
    )
}

const styles = StyleSheet.create({
    searchBar: {
        marginTop: 35,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: Dimensions.get('screen').width - 20,
        borderWidth: 1.5,
        paddingVertical: 10,
        borderRadius: 25,
        marginHorizontal: 10,
        paddingHorizontal: 10,
        backgroundColor: 'lightgray',
        borderColor: 'lightgray'
    },
    primaryText: {
        margin: 20,
        fontSize: 28
    }
})

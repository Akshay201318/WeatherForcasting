import { StatusBar } from 'expo-status-bar';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Platform, ActivityIndicator, SafeAreaView } from 'react-native';
import WeatherInfo from "./components/weatherInfo";
import UnitsPicker from "./components/unitsPicker";
import ReloadIcon from './components/ReloadIcon';
import WeatherDetails from './components/weatherDetails';
import { colors } from './utils/index';
import * as location from "expo-location";

const weatherApiKey = '422d2c3bca6b56ae40aacaf1eb3c416d';
const weatherApiBaseUrl = 'https://api.openweathermap.org/data/2.5/weather?';
const { primaryColor, secondaryColor, borderColor } = colors;

export default function App() {

  const [errorMsg, setErrorMsg] = useState(null);
  const [currentWeather, setCurrentWeather] = useState(null);
  const [unitSystem, setUnitSystem] = useState('metric');

  useEffect(() => {
    load();
  }, [unitSystem]);

  const load = async () => {

    setCurrentWeather(null);
    setErrorMsg(null);

    try {
      const { status } = await location.requestPermissionsAsync();

      if (status != 'granted') {
        setErrorMsg("Allow location access to use this app!");
        return;
      }

      const currentLocation = await location.getCurrentPositionAsync();

      const { latitude, longitude } = currentLocation.coords;

      const weatherApiUrl = `${weatherApiBaseUrl}lat=${latitude}&lon=${longitude}&units=${unitSystem}&appid=${weatherApiKey}`;

      const response = await fetch(weatherApiUrl);

      const result = await response.json();

      if (response.ok) {
        setCurrentWeather(result);
      } else {
        setErrorMsg(result.message);
      }
    } catch (err) {
      setErrorMsg(err.message);
    }

  }

  if (currentWeather) {
    return (
      <SafeAreaView style={{ ...styles.container, ...styles.boxWithShadow }}>
        <StatusBar style="auto" />
        <View style={styles.mainContainer}>
          <View style={styles.topContainer}>
            <UnitsPicker unitSystem={unitSystem} setUnitSystem={setUnitSystem} />
            <ReloadIcon load={load} />
          </View>
          <WeatherInfo currentWeather={currentWeather} />
        </View>
        <WeatherDetails currentWeather={currentWeather} unitSystem={unitSystem} />
      </SafeAreaView>
    );

  } else if (errorMsg) {
    return (
      <View style={styles.container}>
        <ReloadIcon load={load} />
        <Text style={{ textAlign: 'center' }}>{errorMsg}</Text>
      </View>
    );
  }
  else {
    return (
      <View style={styles.container}>
        <ActivityIndicator size='large' color={primaryColor} />
      </View>
    );
  }


}

const styles = StyleSheet.create({
  container: {

    // ...Platform.select({
    //   ios: {
    //     top: -20
    //   },
    //   android: {
    //     top: 30,
    //   }
    // }
    // ),
    flex: 1,
    backgroundColor: '#DEE9FD',
  },
  boxWithShadow: {
    shadowColor: '#000',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.8,
    shadowRadius: 5,
    elevation: 5
  },
  topContainer: {
    position: "absolute",
    padding: 35,
    top: 30,
    right: 20,
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  mainContainer: {
    flex: 2,
    height: '100%',
  }
});

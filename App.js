import { StatusBar } from "expo-status-bar";
import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { Feather } from '@expo/vector-icons';
import {useState, useEffect} from 'react';
//import * as Location from 'expo-location'
import { EvilIcons } from '@expo/vector-icons';
import ThemeContext from './context/ThemeContext';

import InfoCard from './components/InfoCard'
import MainCard from "./components/MainCard"

import getCurrentWeather from './api/consultaApi'

export default function App() {
  //const axios = require('axios')
  const themeHook = useState("dark");
  const [darkTheme, setDarkTheme] = useState(true);

  const [currentTemperature, setCurrentTemperature] = useState(31);

  const [cityName, setCityName] = useState("Buenos Aires");

  const [locationName, setLocationName] = useState(null);

  const [temperatureMin, setTemperatureMin] = useState("21");
  const [temperatureMax, setTemperatureMax] = useState("32");
  const [wind, setWind] = useState("7");
  const [humidity, setHumidity] = useState("68");
  const [weather, setWeather] = useState("Nublado");
  const [iconName, setIconName] = useState("sun");

  var fecha = new Date().toLocaleDateString();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: darkTheme ? "#232634" : "#F2F2F2",
      alignItems: "center",
    },
    refreshButton: {
      position: "absolute",
      alignSelf: "flex-start",
      margin: 30,
    },
    themeButtonCircle: {
      alignSelf: darkTheme ? "flex-end" : "flex-start",
      margin: 5,
      width: 20,
      height: 20,
      borderRadius: 50,
      backgroundColor: darkTheme ? "#232634" : "#F2F2F2",
    },
    temperatureView: {
      alignItems: "center",
      flexDirection: "row",
      marginTop: 10,
    },
    temperatureText: {
      color: darkTheme ? "#e0e0e0" : "black",
      fontSize: 50,
    },
    cardsView: {
      color: darkTheme ? "black" : "white",
      margin: 10,
      alignItems: "center",
      flexDirection: "row",
    },
    localizationText: {
      color: darkTheme ? "#e0e0e0" : "black",
    },
    info: {
      alignItems: "center",
      borderRadius: 20,
      width: 350,
      height: 230,
      backgroundColor: darkTheme ? "#393e54" : "#8F8F8F",
    },
    infoText: {
      color: darkTheme ? "#e0e0e0" : "white",
      margin: 15,
      fontSize: 20,
      fontWeight: "bold",
    },
    addtionalInfo: {
      flexDirection: "row",
      flexWrap: "wrap",
    },
    themeButton: {
      margin: 10,
      marginLeft: 300,
      alignItems: "center",
      justifyContent: "center",
      width: 50,
      height: 50,
      borderRadius: 25,
    },
    themeButtonSquare: {
      backgroundColor: darkTheme ? "#F2F2F2" : "#8F8F8F",
      justifyContent: "center",
      borderRadius: 20,
      marginRight: 20,
      width: 50,
      height: 25,
    },
  });

  async function setCurrentWeather() {
    //const cityName = "Cordoba";
    const data = await getCurrentWeather(cityName);

    // La api devuelve un vector con datos en el siguiente orden
    // [currentTemperature, temperatureMin, temperatureMax, locationName, wind, humidity, weather, iconName]
    //         0                  1              2                3        4        5        6        7

    let temperature = data[0];
    temperature = temperature.toFixed(1);

    var tempMin = data[1];
    tempMin = tempMin.toFixed(1);

    var tempMax = data[2];
    tempMax = tempMax.toFixed(1);

    setCurrentTemperature(temperature);
    setTemperatureMin(tempMin);
    setTemperatureMax(tempMax);
    setLocationName(data[3]);
    setWind(data[4]);
    setHumidity(data[5]);
    setWeather(data[6]);
    setIconName(data[7]);
    console.log(data[6]);
  }

  useEffect(() => {
    setCurrentWeather();
  }, []);

  /*      <View style={styles.cardsView}>
          <MainCard title={"Mañana"} icon={'morning'} temperature={"27°"} backgroundColor={ darkTheme ?'#D26F2F' : '#CC6E30'} ></MainCard>
          <MainCard title={"Tarde"} icon={'afternoon'} temperature={"31°"} backgroundColor={darkTheme ? '#D29600'  : '#FCC63F'} ></MainCard>
          <MainCard title={"Noche"} icon={'night'} temperature={"21°"} backgroundColor={darkTheme ? '#008081'  : '#38B7B8'} ></MainCard>
        </View>
  */

  return (
    <ThemeContext.Provider value={themeHook}>
      <View style={styles.container}>
        <TouchableOpacity
          style={styles.refreshButton}
          onPress={() => setCurrentWeather()}
        >
          <EvilIcons
            name="refresh"
            color={darkTheme ? "white" : "black"}
            size={24}
          />
        </TouchableOpacity>

        <Feather
          style={{ marginTop: 50 }}
          name={iconName}  // sun, cloud, cloud-rain, cloud-snow, cloud-drizzle, cloud-lightning, wind
          size={40}
          color="orange"
        />

        <View style={styles.temperatureView}>
          <Text style={styles.temperatureText}>{currentTemperature}</Text>
          <Text style={[styles.temperatureText, { fontSize: 14 }]}>°C</Text>
        </View>

        <Text style={styles.localizationText}>
          {locationName}
        </Text>
        <Text style={styles.localizationText}>
          {fecha}
        </Text>
        <Text style={styles.infoText}>{weather}</Text>

        <View style={styles.info}>
          <Text style={styles.infoText}>Información Adicional:</Text>
          <View style={styles.addtionalInfo}>
            <InfoCard title={"Viento"} variable={wind + " m/s"}></InfoCard>
            <InfoCard title={"Humedad"} variable={humidity + "%"}></InfoCard>
            <InfoCard
              title={"Temp. Min"}
              variable={temperatureMin + " °C"}
            ></InfoCard>
            <InfoCard
              title={"Temp. Max"}
              variable={temperatureMax + " °C"}
            ></InfoCard>
          </View>
        </View>

        <View style={styles.themeButton}>
          <View style={styles.themeButtonSquare}>
            <TouchableOpacity
              style={styles.themeButtonCircle}
              onPress={() =>
                darkTheme ? setDarkTheme(false) : setDarkTheme(true)
              }
            ></TouchableOpacity>
          </View>
        </View>
      </View>
    </ThemeContext.Provider>
  );
}

// on importe useEffect
import  React, { useEffect, useState } from 'react';
import { Text, View, StyleSheet, ActivityIndicator, Image, ScrollView } from 'react-native';
import Constants from 'expo-constants';
import * as Location from "expo-location"
import axios from "axios"

import CurrentWeather from "./components/CurrentWeather"
import Forecasts from "./components/Forecasts"

const API_URL = (lat, lon) => `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=d9cea0c830a07b47cff916571d15a2da&lang=fr&units=metric`

export default function App() {
  // 1 - récupérer les coordonnées de user
const [loading, setLoading] = useState(true)
const [data, setData] = useState(null)

  useEffect(() => {
    const getCoordinates = async () => {
      const {status} = await Location.requestForegroundPermissionsAsync()
      if (status !== "granted") {
        return
      } 

      const userLocation = await Location.getCurrentPositionAsync()
      getWeather(userLocation)
    }

	  getCoordinates()
  }, [])

  // 2 - réaliser une requête vers nos serveurs

  // city

  // météo du moment

  // prévision
  const getWeather = async (location) => {
    try {
    const response = await axios.get(API_URL(location.coords.latitude, location.coords.longitude))

      setData(response.data)
      setLoading(false)

    } catch(e){
      console.log("Erreur dans getWeather")
    }
  }

  if (loading){
    return <View style={styles.container}>
      <ActivityIndicator />
    </View>
  }

  return (
    <View style={styles.container}>
      <CurrentWeather data={data} />
      <Forecasts data={data} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#E2E6E1',
    padding: 8,
  },
  
});

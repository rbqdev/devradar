import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

export default function Main({ navigation }) {
  const [currentRegion, setCurrentRegion] = useState(null);

  useEffect(() => {
    (async function loadInitialPosition() {
      const { granted } = await requestPermissionsAsync();

      if(!granted) {
        return;
      }

      const { coords } = await getCurrentPositionAsync({
        enableHighAccuracy: true
      });

      const { latitude, longitude } = coords;

      setCurrentRegion({
        latitude,
        longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01
      });
    })();
  }, []);

  if(!currentRegion) {
    return <></>;
  }
  
  return (
    <>
      <MapView initialRegion={currentRegion} style={styles.map}>
        <Marker coordinate={{ latitude: -14.8586487, longitude: -40.7949791 }}>
          <Image style={styles.markerAvatar} source={{ uri: 'https://avatars1.githubusercontent.com/u/32659372?s=460&v=4' }} />
          
          <Callout onPress={() => {
            navigation.navigate('Profile', { github_username: 'rbqdev' });
          }}>
            <View style={styles.markerCallout}>
              <Text style={styles.calloutDevName}>Teste</Text>
              <Text style={styles.calloutDevBio}>teste</Text>
              <Text style={styles.calloutDevTechs}>teste</Text>
            </View>
          </Callout>
        </Marker>
      </MapView>

      <View style={styles.searchForm}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Buscar devs por techs..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
        />

        <TouchableOpacity 
          style={styles.searchSubmit}
          onPress={() => {}}
        >
          <MaterialIcons name="my-location" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  map:{
    flexGrow: 1
  },

  markerAvatar: {
    width: 54,
    height: 54,
    borderRadius: 4,
    borderWidth: 4,
    borderColor: '#333'
  }, 

  markerCallout: {
    width: 260,
    padding: 1,
    borderRadius: 4
  },

  calloutDevName: {
    fontWeight: 'bold',
    fontSize: 16
  },
  calloutDevBio: {
    color: '#666',
    marginTop: 5
  },
  calloutDevTechs: {
    marginTop: 5
  },

  searchForm: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row'
  },
  searchInput: {
    flexGrow: 1,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25
  }
}); 
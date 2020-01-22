import React, { useEffect, useState } from 'react';
import { StyleSheet, Image, View, Text, TextInput, TouchableOpacity } from 'react-native';
import MapView, { Marker, Callout } from 'react-native-maps';
import { requestPermissionsAsync, getCurrentPositionAsync } from 'expo-location';
import { MaterialIcons } from '@expo/vector-icons';

import api from '../services/api';
import { connect, disconnect, subscribeToNewDevs } from '../services/socket';

export default function Main({ navigation }) {
  const [devs, setDevs] = useState([]);
  const [techsSearch, setTechsSearch] = useState('');
  const [currentRegion, setCurrentRegion] = useState();

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

  useEffect(() => {
    subscribeToNewDevs(dev => {
      setDevs([...devs, dev]);
    });
  }, [devs]);

  async function loadDevs() {
    const { latitude, longitude } = currentRegion;

    const response = await api.get('/search', {
      params: {
        latitude,
        longitude,
        techs: techsSearch
      }
    });

    setDevs(response.data.devs);
    setupWebSocket();
  }

  function setupWebSocket() {
    disconnect();

    const { latitude, longitude } = currentRegion;

    connect({
      latitude,
      longitude,
      techs: techsSearch
    });
  }

  function handleRegionChange($evtRegion) {
    setCurrentRegion($evtRegion)
  }

  if(!currentRegion) {
    return <></>;
  }
  
  return (
    <>
      <MapView 
        initialRegion={currentRegion} 
        onRegionChangeComplete={handleRegionChange} 
        style={styles.map}
      >
        {devs.map(dev => (
          <Marker 
            key={dev._id} 
            coordinate={{ 
              longitude: dev.location.coordinates[0], 
              latitude: dev.location.coordinates[1]
            }}
          >
            <Image style={styles.markerAvatar} source={{ uri: dev.avatar_url }} />
            
            <Callout onPress={() => {
              navigation.navigate('Profile', { github_username: dev.github_username });
            }}>
              <View style={styles.markerCallout}>
                <Text style={styles.calloutDevName}>{dev.name}</Text>
                <Text style={styles.calloutDevBio}>{dev.bio}</Text>
                <Text style={styles.calloutDevTechs}>{dev.techs.join(', ')}</Text>
              </View>
            </Callout>
          </Marker>
        ))}
      </MapView>

      <View style={styles.searchForm}>
        <TextInput 
          style={styles.searchInput}
          placeholder="Buscar devs por techs..."
          placeholderTextColor="#999"
          autoCapitalize="words"
          autoCorrect={false}
          onChangeText={setTechsSearch}
        />

        <TouchableOpacity 
          style={styles.searchSubmit}
          onPress={loadDevs}
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
    top: 20,
    left: 20,
    right: 20,
    zIndex: 5,
    flexDirection: 'row'
  },
  searchInput: {
    flexGrow: 1,
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 25,
    color: '#333',
    paddingHorizontal: 20,
    fontSize: 16,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: {
      width: 4,
      height: 4
    },
    elevation: 2
  },
  searchSubmit: {
    width: 50,
    height: 50,
    backgroundColor: '#8e4dff',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 15
  }
}); 
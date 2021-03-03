import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator, Navigator } from 'react-native';
import MapView, { Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import { getDistance } from 'geolib';
import MapViewDirections from 'react-native-maps-directions';
import Geolocation from '@react-native-community/geolocation';
const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const initialState = {
  latitude: null,
  longitude: null,
  latitudeDelta: 0.0322,
  longitudeDelta: 0.0151,
};
const origin = { latitude: 16.798364, longitude: 107.174623 };
const destination = { latitude: 16.793125, longitude: 107.178641 };
const GOOGLE_MAPS_APIKEY = 'AIzaSyDGZOhb6qWmy1PLYJrLmtBho18Vasw0C_U';

const MapApi = () => {
  const [currentPosition, setCurrentPosition] = useState(initialState);
  const [distance, setDistance] = useState('');
  useEffect(() => {
    Geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setCurrentPosition({
          ...currentPosition,
          latitude: latitude,
          longitude: longitude,
        });
      },
      (error) => alert(error.message),
      { timeout: 2000, maximumAge: 1000 },
    );
    // var dis = getDistance(
    //   { latitude: 16.798364, longitude: 107.174623 },
    //   { latitude: 16.793125, longitude: 107.178641 },
    // );
    // alert(dis/1000);
    // setDistance(dis);
  }, []);

  return currentPosition.latitude ? (
    <View>
      <MapView
        provider={PROVIDER_GOOGLE}
        showsUserLocation
        style={styles.mapSide}
        initialRegion={currentPosition}
      >
        {/* <Marker
        coordinate={{ latitude: 16.798364, longitude: 107.174623 }}
        title={'nhà'}
        description={'Phương Ngạn'}
      /> */}
        <MapViewDirections
          origin={origin}
          destination={destination}
          apikey={GOOGLE_MAPS_APIKEY}
          strokeWidth={3}
          strokeColor="hotpink"
        />
        {/* <View style={styles.distance}>
          <Text style={styles.textDistance}>1234</Text>
        </View> */}
      </MapView>
    </View>
  ) : (
    <ActivityIndicator style={{ flex: 1 }} animate size="large" />
  );
};

export default MapApi;

const styles = StyleSheet.create({
  container: {
    width: width,
    height: height,
  },
  mapSide: {
    flex: 1,
    width: width,
    height: height + 50,
  },
  distance: {
    width: 100,
    height: 100,
    backgroundColor: '#555',
  },
});

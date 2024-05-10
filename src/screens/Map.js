import {View, Text, StyleSheet} from 'react-native';
import React from 'react';
import MapView, {PROVIDER_GOOGLE, Marker} from 'react-native-maps';

const markers = [
  {
    id: 1,
    latitude: 23.732217633361294,
    longitude: 90.39136441657267,
    title: 'Fuller Road',
  },
  {
    id: 2,
    latitude: 23.733111723828166,
    longitude: 90.38722635438239,
    title: 'Katabon',
  },
  {
    id: 3,
    latitude: 23.725019447368094,
    longitude: 90.39998929206634,
    title: 'Chankharpul',
  },
];

const styles = StyleSheet.create({
  container: {
    ...StyleSheet.absoluteFillObject,
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});

const Map = () => {
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE} // remove if not using Google Maps
        style={styles.map}
        region={{
          latitude: 23.73416435011167,
          longitude: 90.3929573816847,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {markers.map(marker => (
          <Marker
            key={marker.id}
            coordinate={{
              latitude: marker.latitude,
              longitude: marker.longitude,
            }}
            title={marker.title}
          />
        ))}
      </MapView>
    </View>
  );
};

export default Map;

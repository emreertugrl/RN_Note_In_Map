import {View, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps

const Maps = () => {
  const markers = [
    {
      title: 'Not-1',
      description: 'Not-1 açıklaması',
      coordinate: {
        latitude: 40.97697,
        longitude: 29.0419004,
        latitudeDelta: 0.015,
        longitudeDelta: 0.0121,
      },
    },
  ];
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={{
          latitude: 40.97697,
          longitude: 29.0419004,
          latitudeDelta: 0.015,
          longitudeDelta: 0.0121,
        }}>
        {markers.map((marker, index) => (
          <Marker
            key={index}
            coordinate={marker.coordinate}
            title={marker.title}
            description={marker.description}
          />
        ))}
      </MapView>
    </View>
  );
};

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

export default Maps;

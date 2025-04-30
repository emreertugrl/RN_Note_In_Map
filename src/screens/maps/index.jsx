import {View, StyleSheet} from 'react-native';
import MapView, {Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {
  requestLocationPermission,
  getCurrentLocation,
  defaultLocation,
} from '../../utils/location';

const Maps = () => {
  const [notes, setNotes] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  console.log(currentLocation);

  const getNotes = () => {
    firestore()
      .collection('Notes')
      .get()
      .then(querySnapshot => {
        // console.log('Total notes: ', querySnapshot.size);

        let notes = [];

        querySnapshot.forEach(documentSnapshot => {
          // console.log('Data:', documentSnapshot.id, documentSnapshot.data());
          notes.push({
            id: documentSnapshot.id,
            title: documentSnapshot.data().title,
            description: documentSnapshot.data().description,
            time: documentSnapshot.data().time,
            date: documentSnapshot.data().date,
            coordinate: documentSnapshot.data().coordinate,
          });
        });

        setNotes(notes);
      });
  };
  const setupLocation = async () => {
    const hasPermission = await requestLocationPermission();
    if (hasPermission) {
      try {
        const location = await getCurrentLocation();
        setCurrentLocation(location);
      } catch (error) {
        console.log('Konum alınamadı:', error.message);
      }
    }
  };
  useEffect(() => {
    setupLocation();
    getNotes();
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        style={styles.map}
        region={currentLocation ? currentLocation : defaultLocation}>
        {notes.map((marker, index) => {
          // firebase içinde nasıl kaydettiysek burada öyle çağırmamız lazım coordinate.latitude ve coordinate.longitude
          const lat = marker.coordinate?.latitude ?? marker.coordinate?._lat;
          const lng = marker.coordinate?.longitude ?? marker.coordinate?._long;

          if (!lat || !lng) return null;

          return (
            <Marker
              key={index}
              coordinate={{latitude: lat, longitude: lng}}
              title={marker.title}
              description={marker.description}
            />
          );
        })}
        {currentLocation && (
          <Marker
            coordinate={{
              latitude: currentLocation.latitude,
              longitude: currentLocation.longitude,
            }}
            title="Benim Konumum"
            pinColor="blue" // Mavi renkte marker
          />
        )}
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

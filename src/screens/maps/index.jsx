import {View, StyleSheet} from 'react-native';
import MapView, {Callout, Marker, PROVIDER_GOOGLE} from 'react-native-maps'; // remove PROVIDER_GOOGLE import if not using Google Maps
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import {
  requestLocationPermission,
  getCurrentLocation,
  defaultLocation,
} from '../../utils/location';
import CustomMarker from '../../components/ui/customMarker';
import CustomCallout from '../../components/ui/customCallout';
import FloatActionButton from '../../components/ui/floatAction';
import {ArrowRight2, Map} from 'iconsax-react-nativejs';
import {Colors} from '../../theme/colors';
import {ADDNOTE} from '../../utils/routes';
import {width} from '../../utils/constans';

const Maps = ({navigation}) => {
  const [notes, setNotes] = useState([]);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [coordinate, setCoordinate] = useState(null);
  const [mapType, setMapType] = useState('standard');
  // console.log(currentLocation);

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

  const handleMarkerPress = e => {
    const {coordinate} = e?.nativeEvent;
    setCoordinate(coordinate);
  };
  const toggleMapType = () => {
    setMapType(prevType =>
      prevType === 'standard' ? 'satellite' : 'standard',
    );
  };
  useEffect(() => {
    setupLocation();
    getNotes();
  }, []);
  return (
    <View style={styles.container}>
      <MapView
        provider={PROVIDER_GOOGLE}
        zoomControlEnabled
        zoomEnabled
        onPress={handleMarkerPress}
        mapType={mapType}
        style={styles.map}
        showsUserLocation
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
              description={marker.description}>
              <CustomMarker />
              <Callout tooltip>
                <CustomCallout marker={marker} />
              </Callout>
            </Marker>
          );
        })}
        {coordinate && (
          <Marker
            coordinate={{
              longitude: coordinate?.longitude,
              latitude: coordinate?.latitude,
            }}
            pinColor="green"
          />
        )}
        {currentLocation && (
          <Marker
            coordinate={{
              longitude: currentLocation?.longitude,
              latitude: currentLocation?.latitude,
            }}
            title="Benim Konumum"
            pinColor="blue" // Mavi renkte marker
          />
        )}
      </MapView>
      {coordinate && (
        <FloatActionButton
          customStyle={{
            right: 60,
          }}
          onPress={() => navigation.navigate(ADDNOTE, {coordinate: coordinate})}
          icon={<ArrowRight2 size={40} color={Colors.WHITE} />}
          backgroundColor={Colors.GREEN}
        />
      )}

      <FloatActionButton
        onPress={toggleMapType}
        customStyle={{
          top: 20,
          width: width * 0.15,
          height: width * 0.15,
        }}
        icon={
          <Map
            size={40}
            color={mapType == 'standard' ? Colors.WHITE : Colors.BLACK}
          />
        }
        backgroundColor={mapType == 'standard' ? Colors.GREEN : Colors.WHITE}
      />
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

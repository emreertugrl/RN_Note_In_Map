import {View, Text, StyleSheet} from 'react-native';
import {screenStyle} from '../../styles/screenStyles';
import {ProfileCircle} from 'iconsax-react-nativejs';
import {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ProfileScreen = () => {
  const [userInfo, setUserInfo] = useState(null);

  const getData = async () => {
    try {
      const value = await AsyncStorage.getItem('uid');
      if (value !== null) {
        firestore()
          .collection('Users')
          .doc(value)
          .get()
          .then(documentSnapshot => {
            console.log('User exists: ', documentSnapshot.exists);

            if (documentSnapshot.exists) {
              console.log('User data: ', documentSnapshot.data());
              setUserInfo(documentSnapshot.data());
            }
          });
      }
    } catch (e) {}
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <View style={screenStyle.container}>
      <View style={{justifyContent: 'center', alignItems: 'center'}}>
        <ProfileCircle size={100} variant="Bold" />
        <Text style={{fontSize: 18, fontWeight: 'bold'}}>{userInfo?.name}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#2c3e50',
  },
});

export default ProfileScreen;

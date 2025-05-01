import {createNativeStackNavigator} from '@react-navigation/native-stack';
import Login from '../screens/login';
import {
  ADDNOTE,
  LAUNCH,
  LOGIN,
  MAPS,
  NOTES,
  PROFILE,
  REGISTER,
} from '../utils/routes';
import Register from '../screens/register';
import Profile from '../screens/profile';
import Notes from '../screens/notes';
import AddNote from '../screens/notes/addNote';
import Maps from '../screens/maps';
import {TouchableOpacity, View} from 'react-native';
import {Logout, Note1, Profile as ProfiliIcon} from 'iconsax-react-nativejs';
import Launch from '../screens/launch';
import {useEffect, useState} from 'react';
import {Colors} from '../theme/colors';
import {getAuth, signOut} from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const navigation = useNavigation();
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  const storeData = async value => {
    // console.log(value);
    try {
      await AsyncStorage.setItem('uid', value);
    } catch (e) {}
  };
  const userSignOut = () => {
    const auth = getAuth(); // Yeni modüler API ile auth alıyoruz
    signOut(auth) // `auth()` yerine `signOut(auth)` kullanıyoruz
      .then(async () => {
        console.log('User signed out!');
        AsyncStorage.removeItem('uid');
      })
      .catch(error => console.error('Sign out error: ', error));
  };

  function handleAuthStateChanged(user) {
    if (user) {
      storeData(user?.uid);
    }
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = getAuth().onAuthStateChanged(handleAuthStateChanged);
    return subscriber; // Unsubscribe on unmount
  }, []);

  if (initializing) return null; //istek çıktığında

  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'Geri',
        headerTintColor: 'black',
      }}>
      {user ? (
        <Stack.Group>
          <Stack.Screen
            options={({navigation}) => ({
              headerRight: () => (
                <View
                  style={{
                    flexDirection: 'row',
                    gap: 10,
                    paddingRight: 15,
                  }}>
                  <Note1 onPress={() => navigation.navigate(NOTES)} size={30} />
                  <ProfiliIcon
                    onPress={() => navigation.navigate(PROFILE)}
                    size={30}
                  />
                </View>
              ),
            })}
            name={MAPS}
            component={Maps}
          />
          <Stack.Screen name={NOTES} component={Notes} />
          <Stack.Screen
            options={({navigation}) => ({
              headerRight: () => (
                <TouchableOpacity
                  onPress={() => userSignOut()}
                  style={{marginRight: 15}}>
                  <Logout size={30} color={Colors.RED} />
                </TouchableOpacity>
              ),
            })}
            name={PROFILE}
            component={Profile}
          />
          <Stack.Screen name={ADDNOTE} component={AddNote} />
        </Stack.Group>
      ) : (
        <Stack.Group>
          <Stack.Screen
            options={{headerShown: false}}
            name={LAUNCH}
            component={Launch}
          />
          <Stack.Screen name={REGISTER} component={Register} />
          <Stack.Screen name={LOGIN} component={Login} />
        </Stack.Group>
      )}
    </Stack.Navigator>
  );
}

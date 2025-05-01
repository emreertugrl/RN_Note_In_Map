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
import {Text, View} from 'react-native';
import {Note1} from 'iconsax-react-nativejs';
import Launch from '../screens/launch';
import auth from '@react-native-firebase/auth';
import {useEffect, useState} from 'react';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  function onAuthStateChanged(user) {
    console.log(user);
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  if (initializing) return null; //istek çıktığında

  if (!user) {
    return (
      <View>
        <Text>Login</Text>
      </View>
    );
  }

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
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Note1 onPress={() => navigation.navigate(NOTES)} size={30} />
                </View>
              ),
            })}
            name={MAPS}
            component={Maps}
          />
          <Stack.Screen name={NOTES} component={Notes} />
          <Stack.Screen name={PROFILE} component={Profile} />
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

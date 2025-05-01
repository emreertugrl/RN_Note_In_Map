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
import {View} from 'react-native';
import {Note1} from 'iconsax-react-nativejs';
import Launch from '../screens/launch';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerBackTitle: 'Geri',
        headerTintColor: 'black',
      }}>
      <Stack.Screen
        options={{headerShown: false}}
        name={LAUNCH}
        component={Launch}
      />
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
      <Stack.Screen name={REGISTER} component={Register} />
      <Stack.Screen name={LOGIN} component={Login} />
      <Stack.Screen name={NOTES} component={Notes} />
      <Stack.Screen name={PROFILE} component={Profile} />
      <Stack.Screen name={ADDNOTE} component={AddNote} />
    </Stack.Navigator>
  );
}

import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/login';
import {LOGIN, NOTES, PROFILE, REGISTER} from '../utils/routes';
import RegisterScreen from '../screens/register';
import ProfileScreen from '../screens/profile';
import NotesScreen from '../screens/notes';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={NOTES} component={NotesScreen} />
      <Stack.Screen name={REGISTER} component={RegisterScreen} />
      <Stack.Screen name={LOGIN} component={LoginScreen} />
      <Stack.Screen name={PROFILE} component={ProfileScreen} />
    </Stack.Navigator>
  );
}

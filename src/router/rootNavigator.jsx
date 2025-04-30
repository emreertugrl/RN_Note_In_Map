import {createNativeStackNavigator} from '@react-navigation/native-stack';
import LoginScreen from '../screens/login';
import {ADDNOTE, LOGIN, NOTES, PROFILE, REGISTER} from '../utils/routes';
import RegisterScreen from '../screens/register';
import ProfileScreen from '../screens/profile';
import NotesScreen from '../screens/notes';
import AddNote from '../screens/notes/addNote';

const Stack = createNativeStackNavigator();

export default function RootNavigator() {
  return (
    <Stack.Navigator>
      <Stack.Screen name={NOTES} component={NotesScreen} />
      <Stack.Screen name={REGISTER} component={RegisterScreen} />
      <Stack.Screen name={LOGIN} component={LoginScreen} />
      <Stack.Screen name={PROFILE} component={ProfileScreen} />
      <Stack.Screen name={ADDNOTE} component={AddNote} />
    </Stack.Navigator>
  );
}

import {StyleSheet} from 'react-native';
import {height, width} from '../utils/constans';
import {Colors} from '../theme/colors';

export const launchStyles = StyleSheet.create({
  imageContainer: {
    flex: 2,
  },
  image: {
    width: width,
    height: height * 0.4,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 1,
  },
  title: {
    fontSize: 25,
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 10,
  },
  subtitle: {
    fontSize: 16,
    color: Colors.GRAY,
    textAlign: 'center',
    marginVertical: 10,
  },
  buttonContainer: {
    flex: 1,
  },
  loginButton: {
    marginVertical: 5,
    borderRadius: 100,
    borderWidth: 0,
  },
  registerButton: {
    marginVertical: 5,
    borderRadius: 100,
  },
});

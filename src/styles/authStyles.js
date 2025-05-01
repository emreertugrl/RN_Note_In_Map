import {StyleSheet} from 'react-native';
import {height, width} from '../utils/constans';

export const authStyles = StyleSheet.create({
  imageContainer: {
    flex: 2,
  },
  inputContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 40,
  },
  image: {
    width: width,
    height: height * 0.4,
    resizeMode: 'contain',
  },
  textContainer: {
    flex: 2,
  },
  buttonContainer: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  loginButton: {
    marginVertical: 5,
    borderRadius: 100,
    borderWidth: 0,
  },
});

import {View, Text, StyleSheet} from 'react-native';
import {screenStyle} from '../../styles/screenStyles';

const RegisterScreen = () => {
  return (
    <View style={screenStyle.container}>
      <Text>RegisterScreen</Text>
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

export default RegisterScreen;

import {View, Text, StyleSheet} from 'react-native';
import {screenStyle} from '../../styles/screenStyles';

const Maps = () => {
  return (
    <View style={screenStyle.container}>
      <Text>Maps</Text>
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

export default Maps;

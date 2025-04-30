import {View, Text, StyleSheet} from 'react-native';
import {Colors} from '../../theme/colors';
import {height, width} from '../../utils/constans';

const CustomCallout = ({marker}) => {
  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <Text style={styles.title}>{marker?.title}</Text>
        <Text style={styles.description}>{marker?.description}</Text>
      </View>
      <Text style={styles.date}>
        {marker?.date}-{marker?.time}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.WHITE,
    width: width * 0.5,
    height: height * 0.3,
    padding: 10,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    marginVertical: 10,
  },
  date: {
    fontSize: 14,
    color: Colors.GRAY,
  },
});

export default CustomCallout;

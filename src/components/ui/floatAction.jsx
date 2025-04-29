//import liraries
import {Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../theme/colors';
import {width} from '../../utils/constans';
import {Add} from 'iconsax-react-nativejs';

// create a component
const FloatActionButton = props => {
  return (
    <TouchableOpacity {...props} style={styles.container}>
      <Add size={40} color={Colors.WHITE} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.COLOR2,
    width: width * 0.2,
    height: width * 0.2,
    position: 'absolute',
    bottom: 20,
    right: 20,
    borderRadius: 100,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 1},
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
});

export default FloatActionButton;

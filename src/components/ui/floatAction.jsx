import {StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../theme/colors';
import {width} from '../../utils/constans';

const FloatActionButton = props => {
  const {icon, backgroundColor = Colors.COLOR2} = props;
  return (
    <TouchableOpacity
      {...props}
      style={[styles.container, {backgroundColor: backgroundColor}]}>
      {icon}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    zIndex: 999,
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

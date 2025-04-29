import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../theme/colors';
import {Edit2} from 'iconsax-react-nativejs';

const NoteItem = ({item}) => {
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.description}>{item.description}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity>
          <Edit2 size={28} color={Colors.BLACK} variant="Bold" />
        </TouchableOpacity>
        <Text style={styles.time}>{item.time}</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.COLOR1,
    padding: 10,
    paddingVertical: 20,
    margin: 5,
    flexDirection: 'row',
  },
  infoContainer: {
    flex: 1,
  },
  buttonContainer: {
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    marginVertical: 20,
  },
  time: {
    fontSize: 16,
    color: Colors.GRAY,
    textAlign: 'right',
  },
});

export default NoteItem;

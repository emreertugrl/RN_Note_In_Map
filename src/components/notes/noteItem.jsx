import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Colors} from '../../theme/colors';
import {Edit2, Trash} from 'iconsax-react-nativejs';
import {useNavigation} from '@react-navigation/native';
import {ADDNOTE} from '../../utils/routes';
import firestore from '@react-native-firebase/firestore';
const NoteItem = ({item}) => {
  const navigation = useNavigation();
  const deleteNote = id => {
    firestore()
      .collection('Notes')
      .doc(id)
      .delete()
      .then(() => {
        console.log('User deleted!');
      });
  };
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text style={styles.title}>{item.title}</Text>
        <Text style={styles.date}>{item.date}</Text>
        <Text style={styles.description}>{item.description}</Text>
        <Text style={styles.time}>{item.time}</Text>
      </View>
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate(ADDNOTE, {updateNote: item})}>
          <Edit2 size={28} color={Colors.GREEN} variant="Bold" />
        </TouchableOpacity>
        <TouchableOpacity onPress={() => deleteNote(item.id)}>
          <Trash size={28} color={Colors.RED} variant="Bold" />
        </TouchableOpacity>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 10,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
  description: {
    fontSize: 16,
    marginVertical: 20,
  },
  date: {
    fontSize: 16,
    color: Colors.GRAY,
    textAlign: 'left',
  },
  time: {
    fontSize: 16,
    color: Colors.GRAY,
  },
});

export default NoteItem;

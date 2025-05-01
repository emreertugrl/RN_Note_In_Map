import {View, Text, StyleSheet, FlatList} from 'react-native';
import {screenStyle} from '../../styles/screenStyles';
import {useEffect, useState} from 'react';
import FloatActionButton from '../../components/ui/floatAction';
import NoteItem from '../../components/notes/noteItem';
import {ADDNOTE} from '../../utils/routes';
import {Add} from 'iconsax-react-nativejs';
import {Colors} from '../../theme/colors';

import {
  getFirestore,
  collection,
  getDocs,
} from '@react-native-firebase/firestore';
import {getApp} from '@react-native-firebase/app';

const NotesScreen = ({navigation}) => {
  const [notes, setNotes] = useState([]);

  const getNotes = async () => {
    const app = getApp();
    const db = getFirestore(app);
    const notesCol = collection(db, 'Notes');
    try {
      const snapshot = await getDocs(notesCol);
      const notes = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }));
      setNotes(notes);
    } catch (error) {
      console.error('Failed to fetch notes:', error);
    }
  };

  useEffect(() => {
    getNotes();
  }, []);

  return (
    <View style={screenStyle.container}>
      <FlatList
        data={notes}
        renderItem={({item}) => <NoteItem item={item} />}
        ListEmptyComponent={<Text style={{color: 'gray'}}>Not bulunamadı</Text>}
      />
      <FloatActionButton
        icon={<Add size={60} color={Colors.WHITE} />}
        onPress={() => navigation.navigate(ADDNOTE)}
      />
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

export default NotesScreen;

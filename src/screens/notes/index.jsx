import {View, Text, StyleSheet, FlatList} from 'react-native';
import {screenStyle} from '../../styles/screenStyles';
import firestore from '@react-native-firebase/firestore';
import {useEffect, useState} from 'react';
import FloatActionButton from '../../components/ui/floatAction';
import NoteItem from '../../components/notes/noteItem';
import {ADDNOTE} from '../../utils/routes';

const NotesScreen = ({navigation}) => {
  const [notes, setNotes] = useState([]);

  const getNotes = () => {
    firestore()
      .collection('Notes')
      .get()
      .then(querySnapshot => {
        // console.log('Total notes: ', querySnapshot.size);

        let notes = [];

        querySnapshot.forEach(documentSnapshot => {
          // console.log('Data:', documentSnapshot.id, documentSnapshot.data());
          notes.push({
            id: documentSnapshot.id,
            title: documentSnapshot.data().title,
            description: documentSnapshot.data().description,
            time: documentSnapshot.data().time,
            date: documentSnapshot.data().date,
          });
        });

        setNotes(notes);
      });
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
      <FloatActionButton onPress={() => navigation.navigate(ADDNOTE)} />
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

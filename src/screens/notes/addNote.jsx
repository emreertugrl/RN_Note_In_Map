import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import {screenStyle} from '../../styles/screenStyles';
import {Input, Button} from '@ui-kitten/components';
import {uiElementsStyles} from '../../styles/uiElementsStyles';
import {Formik} from 'formik';
import {addNoteSchema} from '../../utils/schemas';
import CustomModal from '../../components/ui/modals';
import {useState} from 'react';
import {Colors} from '../../theme/colors';

import {
  getFirestore,
  collection,
  doc,
  updateDoc,
  addDoc,
} from '@react-native-firebase/firestore';
import {getApp} from '@react-native-firebase/app';

const AddNote = ({route}) => {
  const {updateNote, coordinate} = route?.params || {};
  console.log(coordinate);

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const addNote = async values => {
    setLoading(true);
    const app = getApp();
    const db = getFirestore(app);
    const notesRef = collection(db, 'Notes');

    try {
      if (updateNote) {
        const noteDocRef = doc(db, 'Notes', updateNote.id);
        await updateDoc(noteDocRef, values);
        console.log('Note updated!');
      } else {
        await addDoc(notesRef, values);
        console.log('Note added!');
      }
      setStatus(true);
    } catch (error) {
      console.log('Firestore error:', error);
      setStatus(false);
    } finally {
      setVisible(true);
      setLoading(false);
    }
  };

  return (
    <View style={screenStyle.container}>
      <CustomModal
        visible={visible}
        status={status}
        closeModal={() => setVisible(false)}
      />
      <Formik
        initialValues={{
          title: updateNote?.title || 'Note-1',
          description:
            updateNote?.description || 'Note-1 açıklaması buraya yazılıryor.',
          time: updateNote?.time || '09:00',
          date: updateNote?.date || '08.10.2026',
          coordinate: coordinate || {latitude: 0, longitude: 0},
        }}
        validationSchema={addNoteSchema}
        validateOnBlur={false}
        validateOnChange={false}
        onSubmit={values => addNote(values)}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          touched,
        }) => (
          <View>
            <Input
              caption={errors.title && touched.title && errors.title}
              status={errors.title ? 'danger' : 'basic'}
              onChangeText={handleChange('title')}
              placeholder="Lütfen başlığı girin"
              style={uiElementsStyles.input}
              onBlur={handleBlur('title')}
              value={values.title}
              label="Başlık"
              size="large"
            />
            <Input
              caption={errors.description && errors.description}
              status={errors.description ? 'danger' : 'basic'}
              onChangeText={handleChange('description')}
              placeholder="Lütfen açıklama girin"
              onBlur={handleBlur('description')}
              style={uiElementsStyles.input}
              value={values.description}
              label="Açıklama"
              size="large"
              multiline
            />
            <Input
              status={errors.date ? 'danger' : 'basic'}
              caption={errors.date && touched.date && errors.date}
              onChangeText={handleChange('date')}
              placeholder="Lütfen tarihi seçiniz"
              style={uiElementsStyles.input}
              onBlur={handleBlur('date')}
              value={values.date}
              label="Tarih"
              size="large"
            />
            <Input
              status={errors.time ? 'danger' : 'basic'}
              caption={errors.time && touched.time && errors.time}
              onChangeText={handleChange('time')}
              placeholder="Lütfen saati seçiniz"
              style={uiElementsStyles.input}
              onBlur={handleBlur('time')}
              value={values.time}
              size="large"
              label="Saat"
            />
            <Button
              style={uiElementsStyles.button}
              onPress={handleSubmit}
              disabled={loading}
              status="primary"
              size="large">
              {loading ? (
                <ActivityIndicator color={Colors.WHITE} size={'small'} />
              ) : (
                <Text>{updateNote ? 'GÜNCELLE' : 'KAYDET'}</Text>
              )}
            </Button>
          </View>
        )}
      </Formik>
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

export default AddNote;

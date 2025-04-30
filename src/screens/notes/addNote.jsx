import {View, StyleSheet, ActivityIndicator, Text} from 'react-native';
import {screenStyle} from '../../styles/screenStyles';
import {Input, Button} from '@ui-kitten/components';
import {uiElementsStyles} from '../../styles/uiElementsStyles';
import {Formik} from 'formik';
import firestore from '@react-native-firebase/firestore';
import {addNoteSchema} from '../../utils/schemas';
import CustomModal from '../../components/ui/modals';
import {useState} from 'react';
import {Colors} from '../../theme/colors';

const AddNote = ({route}) => {
  const {updateNote} = route?.params || {};

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);
  const addNote = values => {
    const noteRef = firestore().collection('Notes');
    const saveNote = updateNote
      ? noteRef.doc(updateNote?.id).update(values)
      : noteRef.add(values);

    saveNote
      .then(() => {
        setVisible(true);
        setLoading(false);
        setStatus(true);
        console.log(updateNote ? 'Note updated!' : 'Note added!');
      })
      .catch(error => setStatus(false))
      .finally(() => {
        setVisible(true);
        setLoading(false);
      });
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
          id: updateNote?.id || '',
          title: updateNote?.title || '',
          description: updateNote?.title || '',
          time: updateNote?.title || '',
          date: updateNote?.title || '',
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

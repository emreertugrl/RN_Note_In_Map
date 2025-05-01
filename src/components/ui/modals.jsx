import {View, Text, StyleSheet, Modal} from 'react-native';
import {Colors} from '../../theme/colors';
import {height, width} from '../../utils/constans';
import {CloseCircle, TickCircle} from 'iconsax-react-nativejs';
import {useNavigation} from '@react-navigation/native';
import {Button} from '@ui-kitten/components';

const CustomModal = ({visible, closeModal, status, descSuccess, descError}) => {
  const navigate = useNavigation();

  const handleClose = () => {
    closeModal();
    navigate.goBack();
  };
  return (
    <Modal visible={visible} animationType="fade" transparent>
      <View style={styles.container}>
        <View style={styles.body}>
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            {status ? (
              <TickCircle size={100} color="#37d67a" variant="Bold" />
            ) : (
              <CloseCircle size={100} color="#f47373" variant="Bold" />
            )}
          </View>
          <View
            style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
            <Text style={{fontSize: 18, fontWeight: '600', marginVertical: 10}}>
              {status ? 'İşlem Başarılı' : 'İşlem Başarısız'}
            </Text>
            <Text style={{marginVertical: 10}}>
              {status
                ? descSuccess
                  ? descSuccess
                  : 'Not ekleme başarılı bir şekilde gerçekleşti.'
                : descError
                ? descError
                : 'Not ekleme işlemi başarısız.'}
            </Text>
          </View>
          <View
            style={{justifyContent: 'center', paddingHorizontal: 50, flex: 1}}>
            <Button onPress={handleClose}>
              {status ? 'Tamam' : 'Tekrar Dene'}
            </Button>
            {!status && <Button status="basic">Vazgeç</Button>}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  body: {
    backgroundColor: Colors.WHITE,
    width: width * 0.8,
    height: height * 0.5,
    borderRadius: 10,
  },
});

export default CustomModal;

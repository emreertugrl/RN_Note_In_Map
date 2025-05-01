import {useState} from 'react';
import {screenStyle} from '../../styles/screenStyles';
import {ActivityIndicator, Image, SafeAreaView, Text, View} from 'react-native';
import {authStyles} from '../../styles/authStyles';
import {Formik} from 'formik';
import {registerSchema} from '../../utils/schemas';
import {Button, Input} from '@ui-kitten/components';
import {uiElementsStyles} from '../../styles/uiElementsStyles';
import {TouchableWithoutFeedback} from '@ui-kitten/components/devsupport';
import {Eye, EyeSlash} from 'iconsax-react-nativejs';
import auth from '@react-native-firebase/auth';
import {Colors} from '../../theme/colors';
import {getFirestore, doc, setDoc} from '@react-native-firebase/firestore';
import CustomModal from '../../components/ui/modals';
import {getApp} from '@react-native-firebase/app';

const RegisterScreen = ({navigation}) => {
  const [secureText, setSecureText] = useState(true);

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);

  const createUser = async values => {
    setLoading(true);
    const app = getApp();
    const db = getFirestore(app);
    // Kullanıcı kimliği (uid) ile Firestore'da belge referansı oluşturuluyor
    const userRef = doc(db, 'Users', values.uid); // usersRef burada artık unique id ile olacak

    try {
      // Kullanıcıyı Firestore'a ekliyoruz
      await setDoc(userRef, values); // setDoc kullanarak 'Users' koleksiyonuna belge ekliyoruz
      console.log('User added!');
      setStatus(true);
    } catch (error) {
      console.log('Firestore error:', error);
      setStatus(false);
    } finally {
      setVisible(true);
      setLoading(false);
    }
  };

  const toggleSecure = () => setSecureText(!secureText);

  const registerUser = values => {
    setLoading(true);
    auth()
      .createUserWithEmailAndPassword(values.email, values.password)
      .then(async () => {
        const user = auth().currentUser; // Kullanıcı bilgilerini alıyoruz
        const userValues = {
          ...values,
          uid: user.uid, // Kullanıcının uid'sini values objesine ekliyoruz
        };

        // Kullanıcıyı Firestore'a kaydediyoruz
        await createUser(userValues);

        setStatus(true);
        console.log('Kullanıcı Kaydedildi');
      })
      .catch(error => {
        setStatus(false);

        if (error.code === 'auth/email-already-in-use') {
          console.log('That email address is already in use!');
        }

        if (error.code === 'auth/invalid-email') {
          console.log('That email address is invalid!');
        }
        console.error(error);
      })
      .finally(() => {
        setVisible(true);
        setLoading(false);
      });
  };

  return (
    <SafeAreaView style={screenStyle.safeAreView}>
      <View style={screenStyle.container}>
        <CustomModal
          descSuccess={'Kullanıcı Başarıyla Kaydedildi. Lütfen Giriş Yapınız.'}
          descError={'Kullanıcı kayıt edilemedi!!!'}
          visible={visible}
          status={status}
          closeModal={() => setVisible(false)}
        />
        <View style={authStyles.imageContainer}>
          <Image
            source={require('../../assets/images/signIn.png')}
            style={authStyles.image}
          />
        </View>
        <View style={authStyles.textContainer}>
          <Formik
            initialValues={{
              name: 'Test User1',
              email: 'test1@gmail.com',
              password: 'Test123.',
            }}
            validationSchema={registerSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={values => registerUser(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              touched,
            }) => (
              <View style={authStyles.inputContainer}>
                <Input
                  caption={errors.name && touched.name && errors.name}
                  status={errors.name ? 'danger' : 'basic'}
                  onChangeText={handleChange('name')}
                  placeholder="Lütfen isminizi girin"
                  style={uiElementsStyles.input}
                  autoCapitalize="none"
                  autoFocus={true}
                  onBlur={handleBlur('name')}
                  value={values.name}
                  label="Name"
                  size="large"
                />
                <Input
                  caption={errors.email && touched.email && errors.email}
                  status={errors.email ? 'danger' : 'basic'}
                  onChangeText={handleChange('email')}
                  placeholder="Lütfen email girin"
                  style={uiElementsStyles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  onBlur={handleBlur('email')}
                  value={values.email}
                  label="Email"
                  size="large"
                />
                <Input
                  caption={
                    errors.password && touched.password && errors.password
                  }
                  status={errors.password ? 'danger' : 'basic'}
                  onChangeText={handleChange('password')}
                  placeholder="Lütfen şifreyi girin"
                  style={uiElementsStyles.input}
                  secureTextEntry={secureText}
                  onBlur={handleBlur('password')}
                  value={values.password}
                  label="Password"
                  size="large"
                  accessoryRight={() => (
                    <TouchableWithoutFeedback onPress={toggleSecure}>
                      {secureText ? (
                        <EyeSlash size={22} color="#8F9BB3" />
                      ) : (
                        <Eye size={22} color="#8F9BB3" />
                      )}
                    </TouchableWithoutFeedback>
                  )}
                />

                <View style={authStyles.buttonContainer}>
                  <Button
                    style={authStyles.loginButton}
                    onPress={handleSubmit}
                    disabled={loading}
                    status="primary"
                    size="large">
                    {loading ? (
                      <ActivityIndicator color={Colors.WHITE} size={'small'} />
                    ) : (
                      <Text>Kayıt Ol</Text>
                    )}
                  </Button>
                </View>
              </View>
            )}
          </Formik>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default RegisterScreen;

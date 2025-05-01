import {ActivityIndicator, Image, SafeAreaView, Text, View} from 'react-native';
import {screenStyle} from '../../styles/screenStyles';
import {Button, Input} from '@ui-kitten/components';
import {authStyles} from '../../styles/authStyles';
import {Formik} from 'formik';
import {loginSchema} from '../../utils/schemas';
import {uiElementsStyles} from '../../styles/uiElementsStyles';
import {useState} from 'react';
import {Eye, EyeSlash} from 'iconsax-react-nativejs';
import {TouchableWithoutFeedback} from '@ui-kitten/components/devsupport';
import auth from '@react-native-firebase/auth';
import {Colors} from '../../theme/colors';
import CustomModal from '../../components/ui/modals';
const LoginScreen = ({navigation}) => {
  const [secureText, setSecureText] = useState(true);

  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(false);

  const toggleSecure = () => setSecureText(!secureText);

  const loginUser = values => {
    setLoading(true);
    auth()
      .signInWithEmailAndPassword(values.email, values.password)
      .then(() => {
        setStatus(true);
        console.log('Kullanıcı başarılı bir şekilde giriş yaptı.');
      })
      .catch(error => {
        setStatus(false);
        if (error.code === 'auth/invalid-credential') {
          console.log('Email or password is false!');
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
          descSuccess={'Kullanıcı başarıyla giriş yaptı.'}
          descError={'Kullanıcı giriş yapamadı!!!'}
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
              email: 'test1@gmail.com',
              password: 'Test123.',
            }}
            validationSchema={loginSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={values => loginUser(values)}>
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
                  caption={errors.email && touched.email && errors.email}
                  status={errors.email ? 'danger' : 'basic'}
                  onChangeText={handleChange('email')}
                  placeholder="Lütfen email girin"
                  style={uiElementsStyles.input}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  autoFocus={true}
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
                      <Text>Giriş Yap</Text>
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

export default LoginScreen;

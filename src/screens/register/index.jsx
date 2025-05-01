import {useState} from 'react';
import {screenStyle} from '../../styles/screenStyles';
import {Image, SafeAreaView, View} from 'react-native';
import {authStyles} from '../../styles/authStyles';
import {Formik} from 'formik';
import {registerSchema} from '../../utils/schemas';
import {Button, Input} from '@ui-kitten/components';
import {uiElementsStyles} from '../../styles/uiElementsStyles';
import {TouchableWithoutFeedback} from '@ui-kitten/components/devsupport';
import {Eye, EyeSlash} from 'iconsax-react-nativejs';

const RegisterScreen = ({navigation}) => {
  const [secureText, setSecureText] = useState(true);
  const toggleSecure = () => setSecureText(!secureText);

  return (
    <SafeAreaView style={screenStyle.safeAreView}>
      <View style={screenStyle.container}>
        <View style={authStyles.imageContainer}>
          <Image
            source={require('../../assets/images/signIn.png')}
            style={authStyles.image}
          />
        </View>
        <View style={authStyles.textContainer}>
          <Formik
            initialValues={{
              name: '',
              email: '',
              password: '',
            }}
            validationSchema={registerSchema}
            validateOnBlur={false}
            validateOnChange={false}
            onSubmit={values => console.log(values)}>
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
                    status="primary"
                    size="large">
                    Kayıt Ol
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

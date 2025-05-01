import {View, Text, Image} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {screenStyle} from '../../styles/screenStyles';
import {Button} from '@ui-kitten/components';
import {LOGIN, REGISTER} from '../../utils/routes';
import {launchStyles} from '../../styles/launchStyles';

const Launch = ({navigation}) => {
  return (
    <SafeAreaView style={screenStyle.safeAreView}>
      <View style={screenStyle.container}>
        <View style={launchStyles.imageContainer}>
          <Image
            source={require('../../assets/images/launch.png')}
            style={launchStyles.image}
          />
        </View>
        <View style={launchStyles.textContainer}>
          <Text style={launchStyles.title}>Hoşgeldiniz</Text>
          <Text style={launchStyles.subtitle}>
            Harita Notum uygulaması sayesinde notlarını paylaşabilirsin.
          </Text>
        </View>
        <View style={launchStyles.buttonContainer}>
          <Button
            onPress={() => navigation.navigate(LOGIN)}
            style={launchStyles.loginButton}
            size="large">
            Giriş Yap
          </Button>
          <Button
            onPress={() => navigation.navigate(REGISTER)}
            style={launchStyles.registerButton}
            appearance="outline"
            size="large">
            Kayıt Ol
          </Button>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Launch;

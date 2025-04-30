import {Location} from 'iconsax-react-nativejs';
import {Colors} from '../../theme/colors';
import {View} from 'react-native';

const CustomMarker = () => {
  return (
    <View>
      <Location size="40" color={Colors.RED} variant="Bold" />
    </View>
  );
};

export default CustomMarker;

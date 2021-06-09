import React, { useEffect } from 'react';
import { Text, View } from 'react-native';

import Styles from './SplashScreenStyle';
import { ScreensName } from '../../assets/string/String';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace(ScreensName.WizardScreen);
    }, 2000);
  }, []);

  return (
    <View style={Styles.imageBackgroungStyle}>
      <Text style={Styles.textStyle}>❝{"\n"}QUOTES{"\n"}STATUS{"\n"}WISHES{"\n"}CARDS{"\n"}❞</Text>
      {/* <ImageBackground
        style={Styles.imageBackgroungStyle}
        resizeMode={'contain'}
        source={require('../../assets/image/drawerimage.webp')} /> */}
    </View>
  );
};

export default SplashScreen;

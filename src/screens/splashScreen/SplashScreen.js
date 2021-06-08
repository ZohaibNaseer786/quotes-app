import React, { useEffect } from 'react';
import { ImageBackground } from 'react-native';

import Styles from './SplashScreenStyle';
import { ScreensName } from '../../assets/string/String';

const SplashScreen = ({ navigation }) => {
  useEffect(() => {
    setTimeout(() => {
      navigation.replace(ScreensName.AppScreen);
    }, 2000);
  }, []);

  return (
    <>
      <ImageBackground
        style={Styles.imageBackgroungStyle}
        source={require('../../assets/image/bg_splash.png')} />
    </>
  );
};

export default SplashScreen;

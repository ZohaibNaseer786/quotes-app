import React from 'react'
import { View, Text, Image, TouchableOpacity } from 'react-native'
import Onboarding from 'react-native-onboarding-swiper'

import { COLORS } from '../../assets/colors/color'
import styles from './WizardScreenStyle'
import { Strings, ScreensName } from '../../assets/string/String'

const WizardScreen = (props) => {

  const Done = ({ }) => (
    <View style={styles.doneSectionStyle}>
      <TouchableOpacity
        style={styles.donebuttonStyle}
        activeOpacity={0.3}
        onPress={() => {
          props.navigation.replace(ScreensName.AppScreen);
        }}>
        <Text style={styles.buttonTextStyle}>{Strings.GotIt}</Text>
      </TouchableOpacity>
    </View>
  );

  const Next = ({ isLight, ...props }) => (
    <TouchableOpacity
      activeOpacity={0.5}
      {...props}>
      <Text
        style={[
          styles.skipTextStyle,
          { color: COLORS.white, marginRight: 20 },
        ]}>
        {Strings.NextButton}
      </Text>
    </TouchableOpacity>
  );

  const Skip = ({ }) => (
    <TouchableOpacity
      activeOpacity={0.5}
      onPress={() => {
        props.navigation.replace(ScreensName.AppScreen);
      }}>
      <Text style={styles.skipTextStyle}>{Strings.SkipButton}</Text>
    </TouchableOpacity>
  );

  const Square = ({ isLight, selected }) => {
    let backgroundColor;
    isLight ?
      backgroundColor = selected ? COLORS.white : COLORS.loader_background
      :
      backgroundColor = selected ? COLORS.white : COLORS.loader_background

    return (
      <View
        style={{
          width: 8,
          height: 8,
          borderRadius: 10,
          marginHorizontal: 3,
          backgroundColor,
        }}
      />
    );
  };

  return (
    <>
      <Onboarding
        DotComponent={Square}
        DoneButtonComponent={Done}
        NextButtonComponent={Next}
        SkipButtonComponent={Skip}
        bottomBarColor={COLORS.primary_color}
        pages={[
          {
            backgroundColor: COLORS.primary_color,
            titleStyles: {
              marginTop: 8,
              color: COLORS.primary_color,
            },
            subTitleStyles: {
              color: COLORS.primary_color,
            },
            image: (
              <Image
                source={require('../../assets/image/w1.webp')}
                style={styles.onbording}
              />
            ),
            title: Strings.HeadingOne,
            subtitle: Strings.DescriptionOne,
          },
          {
            backgroundColor: COLORS.primary_color,
            titleStyles: {
              marginTop: 8,
              color: COLORS.primary_color,
            },
            subTitleStyles: {
              color: COLORS.primary_color
            },
            image: (
              <Image
                source={require('../../assets/image/w2.webp')}
                style={styles.onbording}
              />
            ),
            title: Strings.HeadingTwo,
            subtitle: Strings.DescriptionTwo,
          },
          {
            backgroundColor: COLORS.primary_color,
            titleStyles: {
              marginTop: 8,
              color: COLORS.primary_color,
            },
            subTitleStyles: {
              color: COLORS.primary_color,

            },
            image: (
              <Image
                source={require('../../assets/image/w3.webp')}
                style={styles.onbording}
              />
            ),
            title: Strings.HeadingOne,
            subtitle: Strings.DescriptionOne,
          },
        ]}
      />
    </>
  )
}

export default WizardScreen

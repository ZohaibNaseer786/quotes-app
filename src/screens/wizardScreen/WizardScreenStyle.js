import { StyleSheet } from 'react-native'

import { COLORS } from '../../assets/colors/color'

export default StyleSheet.create({
  onbording: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain'
  },
  buttonTextStyle: {
    color: COLORS.primary_color,
    alignSelf: 'center',
    fontSize: 19,
  },
  skipTextStyle: {
    color: COLORS.white,
    marginLeft: 20,
    alignSelf: 'center',
    fontSize: 18,
  },
  doneSectionStyle: {
    flexDirection: 'row',
    marginBottom: 10,
    width: 110,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  donebuttonStyle: {
    backgroundColor: COLORS.white,
    borderWidth: 0,
    color: COLORS.primary_color,
    borderColor: COLORS.white,
    height: 45,
    elevation: 3,
    width: 300,
    shadowOpacity: 0.3,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 30,
    marginTop: 10,
    marginBottom: 20,
    shadowOffset: {
      width: 1,
      height: 2,
    },
  },
});

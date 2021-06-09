import { StyleSheet, Dimensions } from 'react-native'
import { COLORS } from '../../assets/colors/color';

const windowsWidth = Dimensions.get('window').width
const windowsHeight = Dimensions.get('window').height

export default StyleSheet.create({
    imageBackgroungStyle: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: COLORS.primary_color
    },
    textStyle: {
        color: COLORS.white,
        fontStyle: 'italic',
        fontWeight: '900',
        fontSize: 50,
    },
});
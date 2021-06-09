import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/colors/color';
import { FontFamilyName } from '../../assets/string/String';

export default StyleSheet.create({
    buttonStyle: {
        backgroundColor: COLORS.white,
        borderWidth: 0,
        color: COLORS.white,
        borderColor: COLORS.white,
        marginHorizontal: '2%',
        shadowOpacity: 0.2,
        elevation: 3,
        marginVertical: 4,
        shadowOffset: {
            width: 2,
            height: 2,
        },
    },
    imageStyle: {
        height: 200,
        width: '96%',
        margin: 8,
        backgroundColor: COLORS.loader_background
    },
    textContainer: {
        margin: 8
    },
    contentText: {
        fontSize: 16,
        fontWeight: '900',
        fontStyle: 'italic'
    },
    authorText: {
        alignSelf: 'flex-end',
        fontSize: 12,
        fontWeight: 'bold'
    }
});

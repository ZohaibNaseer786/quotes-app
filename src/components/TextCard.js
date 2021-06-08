import React from 'react';
import {
    View,
    Text,
    Image,
    Platform,
    PermissionsAndroid,
    TouchableOpacity,
    Alert
} from 'react-native';
import styles from './style/ImageCardStyle'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
// import CameraRoll from '@react-native-community/cameraroll';
import RNFetchBlob from 'rn-fetch-blob';

import { COLORS } from '../assets/colors/color'

const ImageCard = (props) => {
    MaterialCommunityIcons.loadFont()
    AntDesign.loadFont()

    return (
        <View style={[styles.buttonStyle, props.buttonstyle]}>
            <TouchableOpacity
                activeOpacity={0.7}>
                <Text>
                    fjdskfhjdshfjasdhgfhgsdahjf
                </Text>
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', margin: 8 }}>
                <AntDesign name={'staro'} size={32} color={COLORS.primary_color} />
                <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                    // onPress={checkPermission}
                    >
                        <MaterialCommunityIcons name={'download-circle'} size={32} color={COLORS.primary_color} />
                    </TouchableOpacity>
                    <MaterialCommunityIcons name={'share-circle'} size={32} color={COLORS.primary_color} />
                </View>
            </View>
        </View>
    );
}

export default ImageCard

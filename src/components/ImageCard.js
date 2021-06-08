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

    const REMOTE_IMAGE_PATH =
        'https://raw.githubusercontent.com/AboutReact/sampleresource/master/gift.png'
    const checkPermission = async () => {

        if (Platform.OS === 'ios') {
            downloadImage();
        } else {
            try {
                const granted = await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
                    {
                        title: 'Storage Permission Required',
                        message:
                            'App needs access to your storage to download Photos',
                    }
                );
                if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                    console.log('Storage Permission Granted.');
                    downloadImage();
                } else {
                    alert('Storage Permission Not Granted');
                }
            } catch (err) {
                console.warn(err);
            }
        }
    };

    const downloadImage = () => {
        let date = new Date();
        let image_URL = REMOTE_IMAGE_PATH;
        let ext = getExtention(image_URL);
        ext = '.' + ext[0];
        const { config, fs } = RNFetchBlob;
        let PictureDir = fs.dirs.PictureDir;
        let options = {
            fileCache: true,
            addAndroidDownloads: {
                useDownloadManager: true,
                notification: true,
                path:
                    PictureDir +
                    '/image_' +
                    Math.floor(date.getTime() + date.getSeconds() / 2) +
                    ext,
                description: 'Image',
            },
        };
        config(options)
            .fetch('GET', image_URL)
            .then(res => {
                console.log('res -> ', JSON.stringify(res));
                alert('Image Downloaded Successfully.');
            });
    };

    const getExtention = filename => {
        return /[.]/.exec(filename) ?
            /[^.]+$/.exec(filename) : undefined;
    };

    return (
        <View style={[styles.buttonStyle, props.buttonstyle]}>
            <TouchableOpacity
                activeOpacity={0.7}>
                <Image
                    resizeMode='contain'
                    source={{ uri: props.url }}
                    style={styles.imageStyle}
                />
            </TouchableOpacity>
            <View style={{ flexDirection: 'row', margin: 8 }}>
                <AntDesign name={'staro'} size={32} color={COLORS.primary_color} />
                <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={checkPermission}
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

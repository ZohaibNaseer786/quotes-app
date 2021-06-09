import React from 'react';
import {
    View,
    Text,
    Image,
    Platform,
    Share,
    PermissionsAndroid,
    TouchableOpacity,
    Alert
} from 'react-native';
import styles from './style/ImageCardStyle'
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
// import CameraRoll from '@react-native-community/cameraroll';
import RNFetchBlob from 'rn-fetch-blob';
import { useSelector, useDispatch } from 'react-redux'

import { FAVOURITE_IMAGE_POST, REMOVE_FAVOURITE_IMAGE_POST } from '../redux/reducers/CurrentUserReducer'
import { COLORS } from '../assets/colors/color'

const ImageCard = (props) => {
    const myFavouritePost = useSelector(state => state.current_user);
    MaterialCommunityIcons.loadFont()
    AntDesign.loadFont()

    const dispatch = useDispatch()

    const saveOrRemovePost = () => {
        checkFavouritePost ?
            removePost()
            :
            savePost()
    }

    const removePost = () => {
        dispatch({
            type: REMOVE_FAVOURITE_IMAGE_POST,
            payload: props.url,
        });
    }

    const savePost = () => {
        dispatch({
            type: FAVOURITE_IMAGE_POST,
            payload: [props.url],
        });
    };

    const getFavouriteItems = () => {
        console.log(checkFavouritePost)
    }

    const checkFavouritePost = myFavouritePost.favouriteImagePost.some(item => item === props.url)

    const onShare = async () => {
        try {
            const result = await Share.share({
                title: 'Post link',
                message: 'Quotes image share to your friends : ',
                url: props.url
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error) {
            alert(error.message);
        }
    };

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
        let image_URL = props.url;
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
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={saveOrRemovePost}>
                    <AntDesign name={checkFavouritePost ? 'star' : 'staro'} size={32} color={COLORS.primary_color} />
                </TouchableOpacity>
                <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={checkPermission}>
                        <MaterialCommunityIcons name={'download-circle'} size={32} color={COLORS.primary_color} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={onShare}>
                        <MaterialCommunityIcons name={'share-circle'} size={32} color={COLORS.primary_color} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default ImageCard

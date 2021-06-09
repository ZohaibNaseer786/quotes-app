import React from 'react';
import {
    View,
    Text,
    ToastAndroid,
    Platform,
    AlertIOS,
    Share,
    TouchableOpacity
} from 'react-native';
import Clipboard from '@react-native-community/clipboard';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons'
import AntDesign from 'react-native-vector-icons/AntDesign'
import { useSelector, useDispatch } from 'react-redux'

import styles from './style/ImageCardStyle'
import { COLORS } from '../assets/colors/color'
import { FAVOURITE_TEXT_POST, REMOVE_FAVOURITE_TEXT_POST } from '../redux/reducers/CurrentUserReducer'

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
            type: REMOVE_FAVOURITE_TEXT_POST,
            payload: props.data,
        });
    }

    const savePost = () => {
        dispatch({
            type: FAVOURITE_TEXT_POST,
            payload: [props.data],
        });
    };

    const getFavouriteItems = () => {
        // console.log(props.data)
        console.log(myFavouritePost.favouriteTextPost)
    }

    const checkFavouritePost = myFavouritePost.favouriteTextPost.some(item => item._id === props.data._id)

    const copyText = () => {
        Clipboard.setString(props.data.content)
        if (Platform.OS === 'android') {
            ToastAndroid.show('Text Copy', ToastAndroid.SHORT)
        } else {
            alert('Text Copy');
        }
    }

    const onShare = async () => {
        try {
            const result = await Share.share({
                title: 'Post link',
                message: 'Quotes image share to your friends : ',
                url: props.data.content
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

    return (
        <View style={[styles.buttonStyle, props.buttonstyle]}>
            <View style={styles.textContainer}>
                <Text style={styles.contentText}>{props.data.content}</Text>
                <Text style={styles.authorText}>{props.data.author.toUpperCase()}</Text>
            </View>

            <View style={{ flexDirection: 'row', margin: 8 }}>
                <TouchableOpacity
                    activeOpacity={0.7}
                    onPress={saveOrRemovePost}
                >
                    <AntDesign name={checkFavouritePost ? 'star' : 'staro'} size={32} color={COLORS.primary_color} />
                </TouchableOpacity>
                <View style={{ flex: 2, flexDirection: 'row', justifyContent: 'flex-end' }}>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={copyText}
                    >
                        <MaterialCommunityIcons name={'download-circle'} size={32} color={COLORS.primary_color} />
                    </TouchableOpacity>
                    <TouchableOpacity
                        activeOpacity={0.7}
                        onPress={onShare}
                    >
                        <MaterialCommunityIcons name={'share-circle'} size={32} color={COLORS.primary_color} />
                    </TouchableOpacity>
                </View>
            </View>
        </View>
    );
}

export default ImageCard

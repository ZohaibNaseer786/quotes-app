import React from 'react';
import { View, Text, FlatList, ScrollView } from 'react-native';
import { useSelector } from 'react-redux'

import style from './FavoritesScreenStyle';
import ImageCard from '../../components/ImageCard'
import TextCard from '../../components/TextCard'

const FavoritesScreen = () => {
  const myFavouritePost = useSelector(state => state.current_user);

  const renderImageItems = ({ item }) => {
    return (
      <ImageCard url={item} />
    )
  }
  const renderTextItems = ({ item }) => {
    return (
      <TextCard data={item} />
    )
  }

  return (
    <ScrollView showsVerticalScrollIndicator={false} style={style.mainBody}>
      <Text style={style.textStyle}>Image Quotes</Text>
      <View style={style.sperator} />
      <FlatList
        showsVerticalScrollIndicator={false}
        nestedScrollEnabled={true}
        keyExtractor={() => (Math.random() * 1000).toString()}
        data={myFavouritePost.favouriteImagePost}
        renderItem={renderImageItems} />
      <Text style={style.textStyle}>Text Quotes</Text>
      <View style={style.sperator} />
      <FlatList
        showsVerticalScrollIndicator={false}
        style={{ marginBottom: 16 }}
        nestedScrollEnabled={true}
        keyExtractor={() => (Math.random() * 1000).toString()}
        data={myFavouritePost.favouriteTextPost}
        renderItem={renderTextItems} />
    </ScrollView>
  );
};

export default FavoritesScreen;

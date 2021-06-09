import React, { useState, useEffect } from 'react';

import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  ActivityIndicator,
  Dimensions,
  ScrollView
} from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view'

import { COLORS } from '../../assets/colors/color'
import ImageCard from '../../components/ImageCard'
import Data from '../../data/ImageQuoties.json'
import QuotesTextScreen from '../QuotesTextScreen/QuotesTextScreen'

const { width, height } = Dimensions.get("window")

const HomeScreen = () => {
  var [movieImageUrls] = useState([])
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'random', title: 'random' },
    { key: 'movies', title: 'movies' },
    { key: 'text', title: 'text' },
  ])

  useEffect(() => {
    for (var i = 1; i <= 10; i++) {
      movieImageUrls.push(`https://web-series-quotes.herokuapp.com/generate/dark/${i}/image?src=dark&size=150&color=yellow`)
    }
  }, []);

  const firstRouteRenderItem = ({ item }) => {
    return (
      <ImageCard url={item} />
    )
  }

  const FirstRoute = () => (
    <View>
      <FlatList
        showsVerticalScrollIndicator={false}
        keyExtractor={() => (Math.random() * 10000).toString()}
        data={Data.love}
        renderItem={firstRouteRenderItem} />
    </View>
  );

  const MoviesRoute = () => {
    return (
      <ScrollView>
        {
          movieImageUrls.map((item) => {
            return (
              <ImageCard url={item} />
            )
          })
        }
      </ScrollView>
    )
  };

  const FourthRoute = () => {
    return (
      <QuotesTextScreen />
    )
  };

  const initialLayout = { width: Dimensions.get('window').width };
  const renderScene = SceneMap({
    random: FirstRoute,
    movies: MoviesRoute,
    text: FourthRoute,
  });
  const renderTabBar = (props) => (
    <TabBar
      {...props}
      scrollEnabled={true}
      indicatorStyle={{ backgroundColor: COLORS.primary_color }}
      style={{ backgroundColor: COLORS.primary_color }}
      renderLabel={({ route, focused, color }) => (
        <View style={{
          backgroundColor: focused ? COLORS.loader_background : COLORS.primary_color,
          borderColor: COLORS.primary_color,
          borderWidth: 0,
          borderRadius: 16,
        }}>
          <Text
            style={{
              color,
              margin: 6,
              fontSize: 16,
            }}>
            {route.title}
          </Text>
        </View>
      )}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <TabView
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
        initialLayout={initialLayout}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  footer: {
    padding: 10,
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
});

export default HomeScreen;

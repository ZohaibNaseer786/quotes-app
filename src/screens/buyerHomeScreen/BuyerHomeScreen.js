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

const App = () => {
  var [movieImageUrls] = useState([])
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [offset, setOffset] = useState(1);
  const [isListEnd, setIsListEnd] = useState(false);
  const [index, setIndex] = useState(0)
  const [routes] = useState([
    { key: 'categories', title: 'categories' },
    { key: 'movies', title: 'movies' },
    { key: 'text', title: 'text' },
    { key: 'new', title: 'new' },
    { key: 'random', title: 'random' },
    { key: 'sticker', title: 'sticker' },
  ])

  useEffect(() => {
    // console.log(Data)
    getData()
    for (var i = 1; i <= 10; i++) {
      movieImageUrls.push(`https://web-series-quotes.herokuapp.com/generate/dark/${i}/image?src=dark&size=150&color=yellow`)
    }
  }, []);

  const getData = () => {
    console.log(offset);
    if (!loading && !isListEnd) {
      // console.log('getData');
      setLoading(true);
      fetch('https://aboutreact.herokuapp.com/getpost.php?offset=' + offset)
        .then(response => response.json())
        .then(responseJson => {
          console.log(responseJson);
          if (responseJson.results.length > 0) {
            setOffset(offset + 1);
            setDataSource([...dataSource, ...responseJson.results]);
            setLoading(false);
          } else {
            setIsListEnd(true);
            setLoading(false);
          }
        })
        .catch(error => {
          console.error(error);
        });
    }
  };

  const renderFooter = () => {
    return (
      <View style={styles.footer}>
        {loading ? (
          <ActivityIndicator color="black" style={{ margin: 15 }} />
        ) : null}
      </View>
    );
  };

  const ItemView = ({ item }) => {
    return (
      <Text style={styles.itemStyle} onPress={() => getItem(item)}>
        {item.id}
        {'.'}
        {item.title.toUpperCase()}
      </Text>
    );
  };

  const ItemSeparatorView = () => {
    return (
      <View
        style={{
          height: 0.5,
          width: '100%',
          backgroundColor: '#C8C8C8',
        }}
      />
    );
  };

  const getItem = item => {
    alert('Id : ' + item.id + ' Title : ' + item.title);
  };

  const firstRouteRenderItem = ({ item }) => {
    return (
      <ImageCard url={item} />
    )
  }

  const FirstRoute = () => (
    <View>
      <FlatList
        keyExtractor={() => (Math.random() * 10000).toString()}
        data={Data.love}
        renderItem={firstRouteRenderItem} />
    </View>
  );

  const SecondRoute = () => (
    <View>
      <Text>Second Route...</Text>
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

  const ThrdRoute = () => (
    <View>
      <Text>ThrdRoute Route...</Text>
    </View>
  );

  const FourthRoute = () => (
    <View>
      <FlatList
        data={dataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        ListFooterComponent={renderFooter}
        onEndReached={getData}
        onEndReachedThreshold={0.5}
      />
    </View>
  );

  const FivthRoute = () => (
    <View>
      <Text>FivthRoute Route...</Text>
    </View>
  );

  const initialLayout = { width: Dimensions.get('window').width };
  const renderScene = SceneMap({
    categories: FirstRoute,
    new: ThrdRoute,
    text: FourthRoute,
    random: FivthRoute,
    sticker: SecondRoute,
    movies: MoviesRoute
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
      {/* <FlatList
        data={dataSource}
        keyExtractor={(item, index) => index.toString()}
        ItemSeparatorComponent={ItemSeparatorView}
        renderItem={ItemView}
        ListFooterComponent={renderFooter}
        onEndReached={getData}
        onEndReachedThreshold={0.5}
      /> */}
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

export default App;

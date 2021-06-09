import React, { useState, useEffect } from 'react';

import {
    SafeAreaView,
    View,
    StyleSheet,
    FlatList,
    ActivityIndicator,
} from 'react-native';

import TextCard from '../../components/TextCard'

const QuotesTextScreen = () => {
    const [loading, setLoading] = useState(false);
    const [dataSource, setDataSource] = useState([]);
    const [offset, setOffset] = useState(1);
    const [isListEnd, setIsListEnd] = useState(false);

    useEffect(() => getData(), []);

    const getData = () => {
        // console.log(offset);
        if (!loading && !isListEnd) {
            setLoading(true);
            fetch('https://api.quotable.io/quotes?page=' + offset)
                .then(response => response.json())
                .then(responseJson => {
                    // console.log(responseJson);
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
            <TextCard data={item} />
        );
    };

    return (
        <SafeAreaView style={{ flex: 1 }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                data={dataSource}
                keyExtractor={(item, index) => index.toString()}
                renderItem={ItemView}
                ListFooterComponent={renderFooter}
                onEndReached={getData}
                onEndReachedThreshold={0.5}
            />
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
    footer: {
        padding: 8,
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
    },
});

export default QuotesTextScreen;
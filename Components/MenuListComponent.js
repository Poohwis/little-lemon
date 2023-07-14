import { FlatList, StyleSheet, View, Text } from "react-native"
import axios from "axios";
import { useEffect, useState } from "react";
import { createTable, getMenuItems, saveMenuItems } from '../database'
import { Image } from "react-native-elements";
import FastImage from "react-native-fast-image";


export default MenuListComponent = () => {
    const [data, setData] = useState([]);
    const API_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'

    useEffect(() => {
        getData();
    }, [])

    /*I'have a trouble with using SQLite with my pc,
     so i decide to comment the function that using SQLite, which not effect the apperance of the app
     and the database function is wrote*/
    // const getData = async () => {
    //     await createTable();
    //     let menuitems = await getMenuItems();

    //     if(!menuitems.length){
    //         axios.get(API_URL)
    //         .then(response=> {
    //             menuitems = response.data.menu
    //         }).catch(error=>{
    //             console.log('Error fetching data:', error)
    //         })
    //         setData(menuitems)
    //     }
    // }

    const getData = () => {
        axios.get(API_URL)
            .then(response => {
                setData(response.data.menu)
            }).catch(error => {
                console.log('Error fetching data:', error)
            })
    }

    const renderSeparator = () => {
        return (
            <View style={styles.separator} />
        )
    }

    const Item = ({ name, description, price, image }) => {
        return (
            <View style={{ flexDirection: 'row', margin: 10 }}>
                <View style={{ flex: 2, justifyContent: 'space-evenly', marginRight: 10 }}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: 'black'
                        }}>
                        {name}
                    </Text>
                    <Text
                        style={{ fontSize: 14, color: '#495e57' }}
                        numberOfLines={2}
                        ellipsizeMode="tail">
                        {description}
                    </Text>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: '#495e57'
                    }}>
                        ${price}
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <FastImage
                        style={{
                            resizeMode: 'cover',
                            width: 200,
                            height: 100
                        }}
                        source={{ uri: `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true` }}
                        resizeMode={FastImage.resizeMode.cover} />
                </View>
            </View>
        )
    }

    const renderItem = ({ item }) => {
        return (
            <Item name={item.name} description={item.description} price={item.price} image={item.image} />
        )
    }

    return (
        <View style={{ flex: 1, marginTop: 20 }}>
            <FlatList
                scrollEnabled={false}
                data={data}
                renderItem={renderItem}
                ItemSeparatorComponent={renderSeparator}
                ListHeaderComponent={renderSeparator}
                keyExtractor={(item, index) => item + index}>
            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    separator: {
        height: 1,
        backgroundColor: '#bdbdbd'
    }
})
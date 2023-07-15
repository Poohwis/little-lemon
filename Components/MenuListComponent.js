import { FlatList, StyleSheet, View, Text } from "react-native"
import axios from "axios";
import { useEffect, useState } from "react";
import { createTable, getMenuItems, saveMenuItems } from '../database'
import { Image } from "react-native-elements";
import FastImage from "react-native-fast-image";

//MenuListComponent.js
export default MenuListComponent = (props) => {
    const { isCategoryToggle, searchBarText } = props
    const [data, setData] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const API_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'

    useEffect(() => {
        getData();
    }, [])

    useEffect(() => {
        filterData();
      }, [isCategoryToggle, searchBarText]);



    /*I'have a trouble with using SQLite with my pc,
     so i decide to comment the function that using SQLite, which not effect the apperance of the app
     and the database function also include in this project file*/
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
                setFilteredData(response.data.menu);
            }).catch(error => {
                console.log('Error fetching data:', error)
            })
    }

    const filterData = () => {
        // Filter based on category toggle and search bar text
        const filteredCategory = Object.entries(isCategoryToggle)
            .filter(([_, value]) => value)
            .map(([category]) => category);

        const filteredByName = data.filter((item) =>
            item.name.toLowerCase().includes(searchBarText.toLowerCase())
        );

        const filteredResult =
            filteredCategory.length > 0
                ? filteredByName.filter((item) =>
                    filteredCategory.includes(item.category)
                )
                : filteredByName;

        setFilteredData(filteredResult);
    };

    const renderSeparator = () => {
        return (
            <View style={styles.separator} />
        )
    }

    const Item = ({ name, description, price, image, category }) => {
        return (
            <View style={{
                flexDirection: 'row',
                padding: 10,
                backgroundColor: isCategoryToggle[category] ? categoryColor[category] : '#ffffff'
            }}>
                <View style={{
                    flex: 2,
                    justifyContent: 'space-evenly',
                    marginRight: 10
                }}>
                    <Text
                        style={{
                            fontSize: 18,
                            fontWeight: 'bold',
                            color: isCategoryToggle[category] ? '#ffffff' : 'black'
                        }}>
                        {name}
                    </Text>
                    <Text
                        style={{
                            fontSize: 14,
                            color: isCategoryToggle[category] ? '#ffffff' : '#495e57'
                        }}
                        numberOfLines={2}
                        ellipsizeMode="tail">
                        {description}
                    </Text>
                    <Text style={{
                        fontSize: 16,
                        fontWeight: 'bold',
                        color: isCategoryToggle[category] ? '#ffffff' : '#495e57'
                    }}>
                        ${price}
                    </Text>
                </View>
                <View style={{ flex: 1, marginRight: 10 }}>
                    <FastImage
                        style={{
                            resizeMode: 'cover',
                            width: 130,
                            height: 100,
                        }}
                        source={{
                            uri:
                                `https://github.com/Meta-Mobile-Developer-PC/Working-With-Data-API/blob/main/images/${image}?raw=true`
                        }}
                        resizeMode={FastImage.resizeMode.cover} />
                </View>
            </View>
        )
    }

    const renderItem = ({ item }) => {
        return (
            <Item name={item.name} description={item.description} price={item.price} image={item.image} category={item.category} />
        )
    }

    return (
        <View style={{ flex: 1, marginTop: 20 }}>
            <FlatList
                scrollEnabled={false}
                data={filteredData}
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

export const categoryColor = {
    starters: '#963f00',
    mains: '#c39c00',
    desserts: '#d8d675',
    drinks: '#ffa06e'
}
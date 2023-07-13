import { View, Text, TouchableOpacity, FlatList } from "react-native";
import { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
// import axios from 'axios';

export default OrderComponent = () => {
    const API_URL = 'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/capstone.json'
    const category = ['Starters', 'Mains', 'Dessert', 'Drinks']
    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', margin: 10 }}>ORDER FOR DELIVERY!</Text>
            <View style={styles.categoryContainer}>
                {category.map(pref => (
                    <TouchableOpacity
                        key={pref}
                        activeOpacity={0.7}
                        style={styles.categoryButton}>
                        <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#495e57' }}>{pref}</Text>
                    </TouchableOpacity>
                ))}
            </View>
            <FlatList
            scrollEnabled={false}>
                
            </FlatList>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    categoryContainer: {
        flexDirection: 'row',
        marginLeft: 12,
        marginRight: 12,
        justifyContent: 'space-evenly'
    },
    categoryButton: {
        backgroundColor: '#edefee',
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 14,
    },
})
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, SafeAreaView, Image, TouchableOpacity, ScrollView } from "react-native";
import { Avatar } from "react-native-elements";
import HeroComponent from "../Components/HeroComponent";
import OrderComponent from "../Components/OrderComponent";
//homescreen.js
export default function HomeScreen({ navigation, route }) {
    const [profileButton, setProfileButton] = useState({
        profileImage: '',
        firstName: '',
        lastName: ''
    })

    useEffect(() => {
        getProfileData();
    }, []);

    useEffect(() => {
        const unsubscribe = navigation.addListener('focus', () => {
            getProfileData();
        });
        return unsubscribe;
    }, [navigation]);

    const getProfileData = async () => {
        try {
            const result = await AsyncStorage.multiGet(['profileImage', 'firstName', 'lastName']);
            const data = {};
            result.forEach(([key, value]) => {
                if (value !== null) {
                    data[key] = value;
                }
            });
            setProfileButton((prevProfileButton) => ({
                ...prevProfileButton,
                profileImage: data.profileImage || '',
                firstName: data.firstName || '',
                lastName: data.lastName || '',
            }));
        } catch (error) {
            console.log('Error retrieving button data from AsyncStorage: ', error);
        }
    };
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <View style={styles.row}>
                </View>
                <View style={styles.headerBanner}>
                    <Image source={require('../assets/Logo.jpg')}
                        style={styles.headerImage} />
                    <Text style={styles.headerText}>LITTLE LEMON</Text>
                </View>
                <TouchableOpacity
                    style={styles.profileBadge}
                    activeOpacity={0.7}
                    onPress={() => { navigation.navigate('Profile') }}>
                    <Avatar
                        size={'medium'}
                        rounded
                        backgroundColor={"#bdbdbd"}
                        titleStyle={{ fontSize: 25 }}
                        title={`${profileButton.firstName[0] || ''}${profileButton.lastName[0] || ''}`}
                        source={profileButton.profileImage !== '' ? { uri: profileButton.profileImage } : null} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <HeroComponent />
                <OrderComponent />
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff'
    },
    headerContainer: {
        flexDirection: 'row',
        marginTop: 10,
        marginBottom: 10
    },
    headerBanner: {
        flex: 3,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    headerImage: {
        width: 20,
        height: 25,
        resizeMode: 'contain',
        marginRight: 12
    },
    headerText: {
        fontSize: 18,
        fontWeight: 'bold',
        letterSpacing: 5,
        textAlign: 'center',
        color: '#495e57',
    },
    row: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    },
    profileBadge: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center'
    }



})

import CheckBox from "@react-native-community/checkbox";
import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, SafeAreaView, Alert, TouchableOpacity, } from "react-native";
import { Avatar, Icon } from '@rneui/themed';
import { MaskedTextInput } from "react-native-mask-text";
import { launchImageLibrary } from "react-native-image-picker";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default function ProfileScreen(props) {
    const { handleOnboardReset } = props
    const [userData, setUserData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        emailPreferences: {
            orderStatus: false,
            passwordChange: false,
            specialOffer: false,
            newsletter: false
        },
        profileImage: ''
    });
    const [placeholder, setPlaceholder] = useState(`${userData.firstName[0] || ''}${userData.lastName[0] || ''}`);

    useEffect(() => {
        getUserData();
    }, [])

    useEffect(() => {
        setPlaceholder(`${userData.firstName[0] || ''}${userData.lastName[0] || ''}`);
    }, [userData.firstName, userData.lastName]);

    const storeUserData = async () => {
        try {
            await AsyncStorage.multiSet([
                ['firstName', userData.firstName],
                ['lastName', userData.lastName],
                ['email', userData.email],
                ['phoneNumber', userData.phoneNumber],
                ['emailPreferences', JSON.stringify(userData.emailPreferences)]
            ]);
            console.log('userData saved successfully')
            if (userData.profileImage !== '' && userData.profileImage !== null) {
                try {
                    await AsyncStorage.setItem('profileImage', userData.profileImage)
                    console.log('profileImage saved successfully')
                } catch (error) {
                    console.log('Error storing profileImage:', error)
                }
            }
        } catch (error) {
            console.log('Error storing userData:', error);
        }
    };

    const getUserData = async () => {
        try {
            const result = await AsyncStorage.multiGet(Object.keys(userData));
            const data = {};
            result.forEach(([key, value]) => {
                if (key === 'emailPreferences') {
                    if (value && typeof value === 'string' && value.trim() !== '') {
                        data[key] = JSON.parse(value);
                    } else {
                        data[key] = {
                            orderStatus: false,
                            passwordChange: false,
                            specialOffer: false,
                            newsletter: false
                        };
                    }
                } else {
                    data[key] = value;
                }
            });
            setUserData({
                firstName: data.firstName || '',
                lastName: data.lastName || '',
                email: data.email || '',
                phoneNumber: data.phoneNumber || '',
                emailPreferences: data.emailPreferences || {
                    orderStatus: false,
                    passwordChange: false,
                    specialOffer: false,
                    newsletter: false
                },
                profileImage: data.profileImage || ''
            });
            console.log('userData retrieved successfully');
        } catch (error) {
            console.log('Error retrieving userData:', error);
        }
    };

    const logOut = async () => {
        try {
            await AsyncStorage.clear()
            handleOnboardReset()
        } catch (error) {
            console.log(error)
        }
        console.log('Cleared all AsyncStorage')
    }

    const selectImage = () => {
        launchImageLibrary(
            {
                mediaType: 'photo',
            },
            (response) => {
                if (!response.didCancel && !response.errorCode) {
                    console.log(response.assets[0].uri)
                    setUserData((prevState) => ({
                        ...prevState,
                        profileImage: response.assets[0].uri
                    }));
                }
            }
        );
    };

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity style={styles.backHomeButton}>
                    <Icon size={10} name="chevron-left" type="font-awesome" />
                    <Text style={styles.backhomeTextAdjust}>Home</Text>
                </TouchableOpacity>
                <Text style={styles.headerText}>Personal Information</Text>
                <View style={styles.container}></View>
            </View>
            <View style={styles.avatarContainer}>
                <Avatar
                    size={'large'}
                    rounded
                    title={placeholder}
                    titleStyle={{ fontSize: 25 }}
                    source={userData.profileImage !== '' ? { uri: userData.profileImage } : null}
                    containerStyle={{ backgroundColor: "#bdbdbd", }}
                >
                    <Avatar.Accessory
                        size={18}
                        type='feather'
                        name='edit-2'
                        onPress={selectImage}
                    /></Avatar>
            </View>
            <Text style={styles.labelText}>First name</Text>
            <TextInput
                style={styles.textInput}
                keyboardType={'default'}
                onChangeText={(text) => {
                    setUserData((prevState) => ({
                        ...prevState,
                        firstName: text
                    }))
                }}
                value={userData.firstName}
                autoCapitalize={'words'} />
            <Text style={styles.labelText}>Last name</Text>
            <TextInput
                style={styles.textInput}
                keyboardType={'default'}
                onChangeText={(text) => {
                    setUserData((prevState) => ({
                        ...prevState,
                        lastName: text
                    }))
                }}
                value={userData.lastName}
                autoCapitalize={'words'} />
            <Text style={styles.labelText}>Email</Text>
            <TextInput
                style={styles.textInput}
                keyboardType={'email-address'}
                onChangeText={(text) => {
                    setUserData((prevState) => ({
                        ...prevState,
                        email: text
                    }))
                }}
                value={userData.email}
                autoCapitalize="none" />
            <Text style={styles.labelText}>Phone number</Text>
            <MaskedTextInput
                mask="(999) 999-9999"
                style={styles.textInput}
                keyboardType={'phone-pad'}
                onChangeText={(text) => {
                    setUserData((prevState) => ({
                        ...prevState,
                        phoneNumber: text
                    }))
                }}
                value={userData.phoneNumber} />
            <View>
                <Text style={[styles.labelText, { fontWeight: 'bold' }]}>Email notifications</Text>
                {preferences.map(pref => (
                    <View key={pref.key} style={[styles.row, { marginLeft: 20 }]}>
                        <CheckBox
                            value={userData.emailPreferences[pref.key]}
                            onValueChange={newValue => {
                                setUserData(prevState => ({
                                    ...prevState,
                                    emailPreferences: {
                                        ...prevState.emailPreferences,
                                        [pref.key]: newValue
                                    }
                                }));
                            }}
                        />
                        <Text>{pref.label}</Text>
                    </View>
                ))}
            </View>
            <View style={[styles.container, { justifyContent: 'flex-end', marginBottom: 15 }]}>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonLogout]}
                        activeOpacity={0.7}
                        onPress={logOut}>
                        <Text style={{ color: '#e5454c' }}>Log out</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.row}>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonDiscard]}
                        activeOpacity={0.7}>
                        <Text style={{ color: '#ffffff' }}>Discard Changes</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        style={[styles.button, styles.buttonSave]}
                        activeOpacity={0.7}
                        onPress={() => {
                            storeUserData()
                            Alert.alert('Saved', 'Your personal information has been saved')
                        }}>
                        <Text style={{ color: '#ffffff' }}>Save Change</Text>
                    </TouchableOpacity>
                </View>
            </View>

        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    headerContainer: {
        padding: 10,
        flexDirection: 'row',
    },
    headerText: {
        flex: 2,
        textAlign: 'center',
        fontWeight: 'bold',
        fontSize: 16,
    },
    backhomeTextAdjust: {
        marginTop: -1.5,
        marginLeft: 1.5
    },
    textInput: {
        marginLeft: 30,
        marginRight: 30,
        fontSize: 14,
        padding: 8,
        height: 35,
        borderWidth: 1,
        borderColor: '#dddddd',
        borderRadius: 8
    },
    labelText: {
        fontSize: 14,
        marginLeft: 30,
        marginTop: 25
    },
    avatarContainer: {
        alignItems: 'center'
    },
    row: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    button: {
        flex: 1,
        alignItems: 'center',
        borderRadius: 8,
        padding: 8,
        marginLeft: 10,
        marginRight: 10,
        marginBottom: 10

    },
    buttonLogout: {
        backgroundColor: '#e3e3e3',
    },
    buttonDiscard: {
        backgroundColor: '#e5454c',
    },
    buttonSave: {
        backgroundColor: '#a1cd44'
    },
    backHomeButton: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
    }


})

const preferences = [
    { key: 'orderStatus', label: 'Order statuses' },
    { key: 'passwordChange', label: 'Password changes' },
    { key: 'specialOffer', label: 'Special offers' },
    { key: 'newsletter', label: 'Newsletter' },
]
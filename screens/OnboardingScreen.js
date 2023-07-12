import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect, useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, SafeAreaView, Image, } from "react-native";
import Animated, { FadeIn } from "react-native-reanimated";

export default function OnboardingScreen(props) {
    const { navigation, handleOnboardComplete } = props;

    const [firstName, setFirstName] = useState('');
    const [email, setEmail] = useState('');
    const [isFormValid, setIsFormValid] = useState({ firstName: false, email: false })

    const handleFisrtNameChange = (data) => {
        setFirstName(data)
        const nameRegex = /^[a-zA-Z]+$/;
        const isNameValid = data.trim() !== '' && nameRegex.test(data);
        setIsFormValid(prevState => ({ ...prevState, firstName: isNameValid }))
    }

    const handleEmailChange = (data) => {
        setEmail(data)
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const isEmailvalid = emailRegex.test(data);
        setIsFormValid(prevState => ({ ...prevState, email: isEmailvalid }))
    }

    const handleNameMemo = async () => {
        const initialUserData = [['firstName', firstName],['email', email]]
        try {
            await AsyncStorage.multiSet(initialUserData)
        } catch (error) {
            console.log('Error saving name memo to AsyncStorage:', error)
        }

    }

    return (
        <SafeAreaView style={styles.container}>
            <Animated.View style={styles.contentContainer}
                entering={FadeIn}>
                <View style={styles.headerContainer}>
                    <Image source={require('../assets/Logo.jpg')}
                        style={styles.headerImage} />
                    <Text style={styles.headerText}>LITTLE LEMON</Text>
                </View>
                <View style={styles.contentContainer}>
                    <Text style={styles.regularText}>Let us get to know you</Text>
                    <Text style={styles.labelText}>First Name</Text>
                    <TextInput style={styles.textInput}
                        keyboardType={'default'}
                        onChangeText={handleFisrtNameChange}
                        value={firstName}
                        autoCapitalize={'words'} />
                    <Text style={styles.labelText}>Email</Text>
                    <TextInput style={styles.textInput}
                        keyboardType={'email-address'}
                        onChangeText={handleEmailChange}
                        value={email}
                        autoCapitalize="none" />
                </View>
                <View style={styles.buttonContainer}>
                    <Pressable
                        style={[styles.button, { backgroundColor: (isFormValid.firstName && isFormValid.email) ? '#a1cd44' : '#b7bbbe' }]}
                        disabled={!isFormValid.firstName && !isFormValid.email}
                        onPress={() => {
                            handleNameMemo()
                            handleOnboardComplete()
                        }}
                    >
                        <Text style={styles.buttonText}>Next</Text>
                    </Pressable>
                </View>
            </Animated.View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#ffffff',
    },
    headerContainer: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
    },
    headerImage: {
        width: 25,
        height: 28,
        resizeMode: 'contain',
        marginRight: 12
    },
    headerText: {
        fontSize: 24,
        fontWeight: 'bold',
        letterSpacing: 5,
        textAlign: 'center',
        color: '#495e57'
    },
    contentContainer: {
        flex: 1,
        marginTop: 10,
        justifyContent: 'center'
    },
    regularText: {
        fontSize: 22,
        textAlign: 'center',
        marginBottom: 50
    },
    labelText: {
        fontSize: 18,
        marginLeft: 30,
        marginTop: 25
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
    buttonContainer: {
        flex: 0.2,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'flex-end',
    },
    button: {
        flex: 1,
        margin: 15,
        paddingVertical: 8,
        borderRadius: 8,
    },
    buttonText: {
        textAlign: 'center',
        fontSize: 18,
        color: '#ffffff'
    }
})

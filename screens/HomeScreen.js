import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, SafeAreaView, Image, } from "react-native";

export default function HomeScreen(props) {
    const { navigation, handleOnboardReset, userData} = props;
    return (
        <SafeAreaView>
            <View>
                <Text>Welcome</Text>
                <Pressable onPress={handleOnboardReset}
                    style={{ padding: 20, backgroundColor: '#dddddd', alignItems: 'center' }}>
                    <Text>Reset</Text>
                </Pressable>
                <Pressable onPress={()=>{navigation.navigate('Profile')}}
                    style={{ padding: 20, backgroundColor: '#eeeeee', alignItems: 'center' }}>
                    <Text>Profile</Text>
                </Pressable>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1
    }
})

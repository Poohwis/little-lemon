import { useEffect } from "react";
import { View, StyleSheet, Text, Image } from "react-native";
import SplashScreen from "react-native-splash-screen";
import Animated, {FadeIn, FadeOut} from "react-native-reanimated";

export default function CustomSplashScreen(){
    return (
        <Animated.View
        style={styles.container}
        entering={FadeIn}
        exiting={FadeOut}
        >
            <Image
                source={require('../assets/little-lemon-logo.png')}
                style={styles.image} />
        </Animated.View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        resizeMode: 'contain',
        width: 200,
        height: 200
    }
})


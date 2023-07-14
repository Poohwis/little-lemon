import { StyleSheet } from "react-native";
import { View, Text, Image } from "react-native";
import { Icon } from "react-native-elements";

export default HeroComponent = () => {
    return (
        <View style={styles.container}>
            <Text
                style={{ fontSize: 40, color: '#f4ce14', marginLeft: 15, fontWeight: 'bold' }}>
                Little Lemon
            </Text>
            <View style={{ flex: 1, flexDirection: 'row', marginLeft: 15 }}>
                <View style={{ flex: 1.25 }}>
                    <Text
                        style={{ fontSize: 35, color: '#ffffff', marginTop: -14, marginBottom: 14, fontWeight: '500'}}>
                        Chicago
                    </Text>
                    <Text
                        style={{ fontSize: 18, color: '#ffffff', }}>
                        We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
                    </Text>
                    <View style={{ backgroundColor: '#ffffff',  alignSelf: 'flex-start', padding: 8, borderRadius: 20, margin: 10}}>
                        <Icon name='search' type="font-awesome" size={24} />
                    </View>
                </View>
                <View style={{ flex: 1 }}>
                    <Image
                        style={styles.heroImage}
                        source={require('../assets/restaurantfood.jpg')} />
                </View>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#495e57',
    },
    heroImage: {
        resizeMode: 'cover',
        width: 150,
        height: 160,
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 8
    }
})
import { useRef } from "react";
import { Pressable, StyleSheet, TextInput } from "react-native";
import { View, Text, Image } from "react-native";
import { Icon } from "react-native-elements";



export default BannerComponent = (props) => {
    const { searchBarText, handleSearchBarChange } = props;
    const textInputRef = useRef(null);

    const handleSearchIconPress = () => {
        if (textInputRef.current) {
            textInputRef.current.focus();
        }
    }
    return (
        <View style={styles.container}>
            <Text
                style={{ fontSize: 40, color: '#f4ce14', marginLeft: 15, fontWeight: 'bold' }}>
                Little Lemon
            </Text>
            <View style={{ flex: 1, flexDirection: 'row', marginLeft: 15 }}>
                <View style={{ flex: 1.25 }}>
                    <Text
                        style={{ fontSize: 35, color: '#ffffff', marginBottom: 14, fontWeight: '500' }}>
                        Chicago
                    </Text>
                    <Text
                        style={{ fontSize: 18, color: '#ffffff', }}>
                        We are a family owned Mediterranean restaurant, focused on traditional recipes served with a modern twist.
                    </Text>
                </View>
                <View style={{ flex: 1 }}>
                    <Image
                        style={styles.bannerImage}
                        source={require('../assets/restaurantfood.jpg')} />
                </View>
            </View>
            <View style={styles.queryContainer}>
                <Pressable onPress={handleSearchIconPress}>
                    <Icon
                        name='search'
                        type="font-awesome"
                        size={24}
                        style={{ paddingLeft: 10 }}
                    />
                </Pressable>
                <TextInput
                    ref={textInputRef}
                    style={styles.textQuery}
                    placeholder="Find your favorite menus here!"
                    value={searchBarText}
                    onChangeText={handleSearchBarChange} />
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#495e57',
    },
    bannerImage: {
        resizeMode: 'cover',
        width: 150,
        height: 160,
        marginTop: 15,
        marginLeft: 10,
        marginRight: 10,
        borderRadius: 8
    },
    queryContainer: {
        flex: 1,
        flexDirection: 'row',
        margin: 15,
        borderRadius: 8,
        alignItems: 'center',
        backgroundColor: '#ffffff',
    },
    textQuery: {
        flex: 1,
        fontSize: 16,
        borderTopRightRadius: 8,
        borderBottomRightRadius: 8,
        paddingLeft: 10
    }
})
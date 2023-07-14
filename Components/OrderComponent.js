import { View, Text, TouchableOpacity } from "react-native";
import { StyleSheet } from "react-native";


export default OrderComponent = (props) => {
    const { handleCategoryToggle, isCategoryToggle } = props

    return (
        <View style={styles.container}>
            <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'black', margin: 10 }}>ORDER FOR DELIVERY!</Text>
            <View style={styles.categoryContainer}>
                {category.map(pref => (
                    <TouchableOpacity
                        onPress={() => {
                            handleCategoryToggle(pref.name)
                        }}
                        key={pref.name}
                        activeOpacity={0.7}
                        style={[styles.categoryButton,
                        {
                            backgroundColor:
                                isCategoryToggle[pref.name] ? pref.color : '#edefee'
                        }]}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: isCategoryToggle[pref.name] ? '#ffffff' : '#495e57'
                            }}>
                            {pref.name.charAt(0).toUpperCase() + pref.name.slice(1)}
                        </Text>
                    </TouchableOpacity>
                ))}
            </View>
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
        justifyContent: 'center',
        paddingVertical: 8,
        paddingHorizontal: 10,
        borderRadius: 14,
    },
})

const category = [
    { name: 'starters', color: '#963f00' },
    { name: 'mains', color: '#ffa06e' },
    { name: 'dessert', color: '#c39c00' },
    { name: 'drinks', color: '#d8d675' }]
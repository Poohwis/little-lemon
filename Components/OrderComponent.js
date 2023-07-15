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
                            handleCategoryToggle(pref.category)
                        }}
                        key={pref.category}
                        activeOpacity={0.7}
                        style={[styles.categoryButton,
                        {
                            backgroundColor:
                                isCategoryToggle[pref.category] ? pref.color : '#edefee'
                        }]}>
                        <Text
                            style={{
                                fontSize: 16,
                                fontWeight: 'bold',
                                color: isCategoryToggle[pref.category] ? '#ffffff' : '#495e57'
                            }}>
                            {pref.category.charAt(0).toUpperCase() + pref.category.slice(1)}
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

export const category = [
    { category: 'starters', color: '#963f00' },
    { category: 'mains', color: '#c39c00' },
    { category: 'desserts', color: '#d8d675' },
    { category: 'drinks', color: '#ffa06e' }]
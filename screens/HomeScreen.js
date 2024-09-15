import { View, StyleSheet, Text } from "react-native";

function HomeScreen() {
    return (
        <View style={styles.container}>  
            <Text>
                Let Start
            </Text>
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})
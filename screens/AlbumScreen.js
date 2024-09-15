import { View, Text, StyleSheet } from "react-native";
function AlbumScreen() {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>No album yet</Text>
        </View>
    )
}

export default AlbumScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20
    }
})
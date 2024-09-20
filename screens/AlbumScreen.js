import { View, Text, StyleSheet } from "react-native";
import QRcode from "../components/UI/QRcode";

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
        backgroundColor: 'white'
    },
    text: {
        fontWeight: 'bold',
        fontSize: 20
    }
})
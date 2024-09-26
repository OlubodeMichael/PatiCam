import { View, Text, StyleSheet } from "react-native";
//import { getAuth } from "firebase/auth";
//import QRcode from "../components/UI/QRcode";

function AlbumScreen() {
    //const auth = getAuth()
    //const user = auth.currentUser

    //console.log(user.uid)
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
import { View, Text, StyleSheet, ScrollView } from "react-native";
import { useContext } from "react";
import { AuthContext } from "../store/auth-context";
import Button from "../components/UI/Button";
import Profile from "../components/UI/Profile";

function SettingScreen() {
    const authCtx = useContext(AuthContext);

    const logoutHandler = () => {
        authCtx.logout();
    };

    return (
        <View style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollViewContent}>
                <Profile />
                <View style={styles.content}>
                    <Text>Name</Text>
                </View>
                <View style={styles.buttonContainer}>
                <Button title="Logout" textStyle={{ color: 'red' }} onPress={logoutHandler} />
            </View>
            </ScrollView>
            
        </View>
    );
}

export default SettingScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    scrollViewContent: {
        flexGrow: 1,
        alignItems: 'center',
    },
    content: {
        alignItems: 'center',
        marginBottom: 20,
    },
    heading: {
        fontSize: 24,
        fontWeight: 'bold',
    },
    buttonContainer: {
        position: 'absolute',
        bottom: 20,
        left: 0,
        right: 0,
        alignItems: 'center',
        paddingHorizontal: 20,
    },
});

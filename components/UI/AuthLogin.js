import { View, StyleSheet, Pressable } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import Button from "./Button";
import { GlobalStyles } from "../../constants/styles";

function AuthLogin({ onPress, title }) {
    return (
        <View style={styles.container}>
            <View style={styles.logoContainer}>
                <Pressable style={styles.iconWrapper}>
                    <Ionicons name="logo-google" size={45} color="green" />
                </Pressable>
                <Pressable style={styles.iconWrapper}>
                    <Ionicons name="logo-facebook" size={45} color="blue" />
                </Pressable>
                <Pressable style={styles.iconWrapper}>
                    <Ionicons name="logo-apple" size={45} color="black" />
                </Pressable>
            </View>
            <View style={styles.buttonContainer}>
                <Button 
                    title={title} 
                    onPress={onPress} 
                    type="primary" 
                    style={{backgroundColor: GlobalStyles.colors.primary500, width: 200, height: 45}}
                    textStyle={{ color: 'white'}}
                />
            </View>
        </View>
    );
}

export default AuthLogin;

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row', // Change to row to align icons and button in a single line
        alignContent: 'stretch',
        marginBottom: 20,
        padding: 20,
        justifyContent: 'center', // Space between icons and button
    },
    logoContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center', // Center icons vertically
    },
    iconWrapper: {
        paddingHorizontal: 10
    },
    buttonContainer: {
        marginLeft: 16, // Add margin to separate button from icons
    }
});
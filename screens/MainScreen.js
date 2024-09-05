import { Text, View, StyleSheet, Image } from "react-native";
import Button from "../components/UI/Button";
import GridImage from "../constants/Image/GridImage.png";  // Adjust the import if necessary

function MainScreen({ navigation}) {
    return (
        <View style={styles.container}>
            <View style={styles.gridImageContainer}>
                <Image source={GridImage} style={styles.gridImage} resizeMode="cover" />
            </View>
            <View style={styles.contentContainer}>
                <Text style={styles.title}>Capture the Magic of Every Moment!</Text>
                <View style={styles.buttonContainer}>
                    <Button title="Sign Up" border="round" type="primary" onPress={() => {navigation.navigate("AuthOverview")}}/>
                    <Button 
                        title="Login" 
                        border="round" 
                        type="secondary"
                        onPress={() => {
                            navigation.navigate("AuthOverview", {
                                screen: "LoginScreen"
                            });
                        }}
                    />
                </View>
            </View>
        </View>
    );
}

export default MainScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#3269F0',
    },
    gridImageContainer: {
        flex: 2,  // Takes up 2/3 of the screen
        width: '100%',
        backgroundColor: '#3269F0', 
    },
    gridImage: {
        width: '100%',
        height: '100%',
    },
    contentContainer: {
        flex: 1,  // Takes up 1/3 of the screen
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#3269F0',
        padding: 20,
    },
    title: {
        color: 'white',
        fontSize: 32,
        fontWeight: '700',
        textAlign: 'center',
        marginBottom: 20,
        fontFamily: 'new-york',
        width: 300,
    },
    buttonContainer: {
        alignItems: 'center',
    },
});

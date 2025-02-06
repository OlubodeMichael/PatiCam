import { View, StyleSheet, Pressable, Text } from "react-native";
import { Ionicons } from 'react-native-vector-icons';
import { useNavigation } from "@react-navigation/native";

function HomeScreen() {
    const navigation = useNavigation();
    
    const handleClick = () => {
        navigation.navigate('AddScreen');
    };

    return (
        <View style={styles.container}>
            <View style={styles.emptyStateContainer}>
                <Ionicons name="images-outline" size={80} color="#CCC" />
                <Text style={styles.emptyText}>No Photos Yet</Text>
                <Text style={styles.subText}>Tap the button below to add photos</Text>
            </View>
            
            <Pressable 
                onPress={handleClick} 
                style={({pressed}) => [
                    styles.addButton,
                    pressed && styles.pressed
                ]}
            >
                <View style={styles.buttonContent}>
                    <Ionicons 
                        name="add-outline" 
                        size={32} 
                        color="white"
                    />
                </View>
            </Pressable>
        </View>
    );
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
    },
    emptyStateContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 24,
    },
    emptyText: {
        fontSize: 20,
        fontWeight: 'bold',
        color: '#333',
        marginTop: 16,
    },
    subText: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginTop: 8,
    },
    addButton: {
        position: 'absolute',
        bottom: 32,
        right: 32,
        backgroundColor: '#3269F0',
        borderRadius: 30,
        width: 60,
        height: 60,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,
        elevation: 5,
    },
    buttonContent: {
        width: '100%',
        height: '100%',
        justifyContent: 'center',
        alignItems: 'center',
    },
    pressed: {
        opacity: 0.7,
        transform: [{ scale: 0.98 }],
    },
});
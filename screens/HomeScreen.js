import { View, StyleSheet, Pressable } from "react-native";
import { Ionicons } from 'react-native-vector-icons';
import { useNavigation } from "@react-navigation/native";



function HomeScreen() {
    const navigation = useNavigation()
    const handleClick = () => {
        navigation.navigate('AddScreen')
    }
    return (
        <View style={styles.container}>  
            <Pressable onPress={handleClick} style={({pressed}) => pressed && styles.opacity}>
                <Ionicons name="add-outline" size={40}/>
            </Pressable>
        </View>
    )
}

export default HomeScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'white'
    },
    opacity: {
        opacity: 0.5
    }
})
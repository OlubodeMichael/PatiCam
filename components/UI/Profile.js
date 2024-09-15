import { View, Image, StyleSheet, Text } from "react-native"
import ProfileImage from "../../constants/Image/profile.jpg"

function Profile() {
    return (
        <View style={styles.profileContainer}>
            <Image source={ProfileImage} style={styles.image}/>
        </View>
    )
}

export default Profile

const styles = StyleSheet.create({
    profileContainer: {
        borderRadius: '50%',
        marginTop: 40
    },
    image: {
        width: 200,
        height: 200,
    }
})
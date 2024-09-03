import { View, Text, StyleSheet } from "react-native";

function Title({ title }) {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>{title}</Text>
        </View>
    )
}

export default Title

const styles = StyleSheet.create({
    container: {
        margin: 20
    },
    text: {
        fontSize: 30,
        fontWeight: 'normal'
    }
})
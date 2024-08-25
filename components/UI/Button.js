import { Pressable, View, Text, StyleSheet } from "react-native";

function Button({ title, onPress, type }) {  // Fixed the typo from `omPress` to `onPress`
    return (
        <Pressable onPress={onPress} style={({ pressed }) => [
            styles.button,
            pressed ? styles.buttonPressed : null
        ]}>
            <View>
                <Text style={styles.buttonText}>{title}</Text>
            </View>
        </Pressable>
    );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#fff', // White background
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: 300,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  buttonText: {
    color: '#3269F0', // Blue text color
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonPressed: {
    opacity: 0.7, // Slightly dim the button when pressed
  },
});

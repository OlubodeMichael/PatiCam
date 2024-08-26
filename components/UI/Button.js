import { Pressable, View, Text, StyleSheet } from "react-native";

function Button({ title, onPress, border, type }) {

  const extraStyle = [styles.button]

 

  if (border === 'round') {
    extraStyle.push(styles.roundButton)
  }

  if (border === 'rounded') {
    extraStyle.push(styles.roundedButton)
  }

  if (border === 'roundedXl') {
    extraStyle.push(styles.roundedXlButton)
  }

  if (type === 'primary') {
    extraStyle.push(styles.primaryButton)
  }

  if (type === 'secondary') {
    extraStyle.push(styles.secondaryButton)
  }

    return (
        <Pressable onPress={onPress} style={({ pressed }) => [
          ...extraStyle,  
            pressed ? styles.buttonPressed : null
        ]}>
            <View>
                <Text style={[styles.buttonText, type === 'primary' ? styles.primaryButtonText : styles.secondaryButtonText]}>{title}</Text>
            </View>
        </Pressable>
    );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    paddingVertical: 14,
    paddingHorizontal: 20,
    width: 300,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16
  },
  buttonText: { 
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonPressed: {
    opacity: 0.7, 
  },
  roundButton: {
    borderRadius: 16,
  }, 
  roundedButton: {
    borderRadius: 20,
  },
  roundedXlButton: {
    borderRadius: 24,
  },
  primaryButton: {
    backgroundColor: '#fff', 
    color: '#3269F0',
  },
  secondaryButton: {
    color: '#fff',
  },
  primaryButtonText: {
    color: '#3269F0',
  },
  secondaryButtonText: {
    color: '#fff',
  }

});

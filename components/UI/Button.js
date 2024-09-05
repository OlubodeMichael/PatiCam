import { Pressable, Text, StyleSheet } from "react-native";

function Button({ 
  title, 
  onPress, 
  type = 'primary', 
  size = 'medium', 
  style, 
  textStyle 
}) {
  const buttonStyles = [styles.button, styles[`${type}Button`], styles[`${size}Button`], style];
  const textStyles = [styles.buttonText, styles[`${type}ButtonText`], styles[`${size}Text`], textStyle];

  return (
    <Pressable 
      onPress={onPress} 
      style={({ pressed }) => [
        ...buttonStyles,
        pressed ? styles.buttonPressed : null
      ]}
    >
      <Text style={textStyles}>{title}</Text>
    </Pressable>
  );
}

export default Button;

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
    borderRadius: 20,
  },
  buttonText: { 
    fontWeight: 'bold',
  },
  buttonPressed: {
    opacity: 0.7,
  },
  primaryButton: {
    backgroundColor: 'white',
  },
  secondaryButton: {
    backgroundColor: '#3269F0',
  },
  primaryButtonText: {
    color: '#3269F0',
  },
  secondaryButtonText: {
    color: 'white',
  },
  smallButton: {
    paddingVertical: 8,
    paddingHorizontal: 12,
    width: 150,
  },
  mediumButton: {
    paddingVertical: 12,
    paddingHorizontal: 18,
    width: 250,
  },
  largeButton: {
    paddingVertical: 18,
    paddingHorizontal: 30,
    width: 350,
  },
  smallText: {
    fontSize: 14,
  },
  mediumText: {
    fontSize: 16,
  },
  largeText: {
    fontSize: 18,
  },
});
import React from 'react';
import { View, Text, TextInput, StyleSheet } from 'react-native';
import { GlobalStyles } from '../../constants/styles';

function Input({ label, textInputConfig, isInvalid }) {

    return (
        <View style={styles.container}>
            <Text style={[styles.label, isInvalid && styles.invalid]}>{label}</Text>
            <TextInput {...textInputConfig} style={styles.textInput} />
        </View>
    );
}

export default Input;

const styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        marginVertical: 10,  
    },
    label: {
        fontSize: 16,  
        marginBottom: 4, 
        color: '#333',  
    },
    textInput: {
        padding: 10,
        borderWidth: 1,
        borderColor: '#676767',  
        borderRadius: 4,  
        fontSize: 16,  
        color: '#000',  
        backgroundColor: '#f5f5f5',  
    },
    invalid: {
        color: GlobalStyles.colors.error500
    }
});

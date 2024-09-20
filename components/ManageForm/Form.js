import { View, StyleSheet, Alert } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { useState } from "react"
import { useNavigation } from "@react-navigation/native";

function Form() {
  const navigation = useNavigation();
  const [albumName, setAlbumName] = useState({
    value: '',
    isInvalid: false
  });


  handleClose = () => {
    navigation.goBack();
  }

  handleSubmit = () => {
    const albumNameIsValid = albumName.value.length > 6;
    setAlbumName((prev) => ({
        ...prev,
        isInvalid: !albumNameIsValid
      }));

    if (!albumNameIsValid) {
        Alert.alert('Invalid input', 'Enter a valid album name')
        return
    }
    navigation.goBack()
  }
  return (
    <View style={styles.container}>
        <View style={styles.inputContainer}>
            <Input 
            label="Album name"
            isInvalid={albumName.isInvalid}
            textInputConfig={{
            placeholder: "Susan's Party",
            value: albumName.value,
            onChangeText: (text) => {
                setAlbumName({
                  value: text,
                  isInvalid: false 
                });
              }
            }}
        />
        <View style={styles.buttonContainer}>
            <Button title="Add" style={{
                width: 200
            }}
            onPress={handleSubmit}
            />
        </View>
        </View>
      <View style={styles.buttonContainer}>
        <Button title="Cancel" textStyle={{color: 'red'}} onPress={handleClose}/>
      </View>
    </View>
  )
}

export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between', 
    padding: 20, 
  },
  inputContainer: {
    //alignItems: 'center'
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginBottom: 20, 
  },
});

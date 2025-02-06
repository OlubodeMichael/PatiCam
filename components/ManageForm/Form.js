import { View, StyleSheet, Alert, ActivityIndicator } from "react-native";
import Input from "./Input";
import Button from "../UI/Button";
import { useState, useContext } from "react";
import { useNavigation } from "@react-navigation/native";
import { AlbumContext } from "../../store/album-context";
import { AuthContext } from '../../store/auth-context';
import { auth } from '../../Utils/firebase';

function Form() {
  const navigation = useNavigation();
  const albumCtx = useContext(AlbumContext);
  const authCtx = useContext(AuthContext);
  const [isLoading, setIsLoading] = useState(false);

  const [albumName, setAlbumName] = useState({
    value: '',
    isInvalid: false
  });

  const handleClose = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
    const albumNameIsValid = albumName.value.trim().length >= 3;
    
    setAlbumName((prev) => ({
      ...prev,
      isInvalid: !albumNameIsValid
    }));

    if (!albumNameIsValid) {
      Alert.alert(
        'Invalid input', 
        'Please enter an album name with at least 3 characters'
      );
      return;
    }

    setIsLoading(true);
    try {
      console.log('Auth state when creating album:', {
        firebaseUser: auth.currentUser?.uid,
        authCtxToken: authCtx.token,
        isAuthenticated: authCtx.isAuthenticated
      });

      await albumCtx.addAlbum(albumName.value.trim());
      Alert.alert(
        'Success',
        'Album created successfully!',
        [
          {
            text: 'OK',
            onPress: () => navigation.goBack()
          }
        ]
      );
    } catch (error) {
      console.error('Error details:', error);
      Alert.alert(
        'Error',
        error.message || 'Could not create album. Please try again later.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleTextChange = (text) => {
    setAlbumName({
      value: text,
      isInvalid: false 
    });
  };

  if (isLoading) {
    return (
      <View style={[styles.container, styles.loadingContainer]}>
        <ActivityIndicator size="large" color="#3269F0" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.inputContainer}>
          <Input 
            label="Album name"
            isInvalid={albumName.isInvalid}
            textInputConfig={{
              placeholder: "Enter album name",
              value: albumName.value,
              onChangeText: handleTextChange,
              autoCapitalize: "words",
              autoCorrect: false,
              maxLength: 50,
            }}
          />
        </View>
        
        <View style={styles.buttonsContainer}>
          <Button 
            title="Add Album"
            type="secondary"
            size="medium"
            onPress={handleSubmit}
          />
          <Button 
            title="Cancel"
            type="primary"
            size="medium"
            onPress={() => navigation.goBack()}
          />
        </View>
      </View>
    </View>
  );
}

export default Form;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  loadingContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  inputContainer: {
    marginTop: 20,
  },
  buttonsContainer: {
    gap: 12,
    marginBottom: 20,
    alignItems: 'center',
  },
});

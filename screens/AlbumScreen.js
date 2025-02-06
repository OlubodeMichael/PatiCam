import React, { useContext, useEffect } from "react";
import { SafeAreaView, View, Text, StyleSheet, FlatList } from "react-native";
import { Ionicons } from '@expo/vector-icons'; // Make sure to install expo/vector-icons
//import { getAuth } from "firebase/auth";
//import QRcode from "../components/UI/QRcode";
import { AlbumContext } from "../store/album-context";
import AlbumCard from '../components/Album/AlbumCard';
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

// This is the main screen that shows the album list
function AlbumListScreen({ navigation }) {
    const albumCtx = useContext(AlbumContext);
    const albums = albumCtx.albums;

    // Add debug logs
    useEffect(() => {
        console.log('AlbumContext:', albumCtx);
        console.log('Albums from context:', albums);
    }, [albumCtx, albums]);

    const renderAlbumItem = ({ item }) => {
        console.log('Rendering album item:', item); // Debug individual album
        return (
            <AlbumCard 
                album={item} 
                onPress={() => {
                    console.log('Album clicked:', item);
                }}
            />
        );
    };

    // Add loading state
    if (!albums) {
        return (
            <SafeAreaView style={styles.safeContainer}>
                <View style={styles.emptyContainer}>
                    <Text style={styles.emptyText}>Loading albums...</Text>
                </View>
            </SafeAreaView>
        );
    }

    return (
        <SafeAreaView style={styles.safeContainer}>
            <View style={styles.container}>
                {albums && albums.length > 0 ? (
                    <FlatList
                        data={albums}
                        renderItem={renderAlbumItem}
                        keyExtractor={(item) => item.id}
                        contentContainerStyle={styles.listContainer}
                        numColumns={2}
                        showsVerticalScrollIndicator={false}
                    />
                ) : (
                    <View style={styles.emptyContainer}>
                        <Ionicons name="images-outline" size={80} color="#CCC" />
                        <Text style={styles.emptyText}>No albums yet</Text>
                        <Text style={styles.subText}>
                            Create an album to start organizing your photos
                        </Text>
                    </View>
                )}
            </View>
        </SafeAreaView>
    );
}

// This is the stack navigator that will handle the album navigation
function AlbumStack() {
    return (
        <Stack.Navigator>
            <Stack.Screen
                name="Albums"
                component={AlbumListScreen}
                options={{
                    headerTitle: "My Albums"
                }}
            />
        </Stack.Navigator>
    );
}

export default AlbumStack;

const styles = StyleSheet.create({
    safeContainer: {
        flex: 1,
        backgroundColor: 'white',
    },
    container: {
        flex: 1,
        paddingHorizontal: 20,
        paddingTop: 20,
        paddingBottom: 10,
    },
    listContainer: {
        paddingBottom: 20,
    },
    emptyContainer: {
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
    }
});

import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

function AlbumCard({ album, onPress }) {
  const { name, photos } = album;

  return (
    <Pressable 
      style={({ pressed }) => [
        styles.albumCard,
        pressed && styles.pressed
      ]}
      onPress={onPress}
    >
      <View style={styles.iconContainer}>
        <Ionicons name="images" size={40} color="#3269F0" />
      </View>
      <Text style={styles.albumName} numberOfLines={1}>
        {name}
      </Text>
      <Text style={styles.photoCount}>
        {photos ? photos.length : 0} photos
      </Text>
    </Pressable>
  );
}

export default AlbumCard;

const styles = StyleSheet.create({
  albumCard: {
    flex: 1,
    margin: 8,
    padding: 16,
    backgroundColor: '#F8F9FA',
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 160,
    aspectRatio: 1,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  pressed: {
    opacity: 0.7,
  },
  iconContainer: {
    marginBottom: 12,
  },
  albumName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    textAlign: 'center',
    marginBottom: 4,
  },
  photoCount: {
    fontSize: 14,
    color: '#666',
  },
}); 
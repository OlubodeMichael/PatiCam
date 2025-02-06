import { createContext, useState, useContext } from 'react';
import { database } from '../Utils/firebase';
import { ref, set, get, remove, update } from 'firebase/database';
import { AuthContext } from './auth-context';
import { auth } from '../Utils/firebase';

export const AlbumContext = createContext({
    albums: [],
    addAlbum: (name) => {},
    editAlbum: (id, newName) => {},
    deleteAlbum: (id) => {},
    getAlbum: (id) => {},
});

function AlbumContextProvider({ children }) {
    const [albums, setAlbums] = useState([]);
    const authCtx = useContext(AuthContext);

    const getUserIdFromToken = (token) => {
        try {
            const tokenParts = token.split('.');
            const payload = JSON.parse(atob(tokenParts[1]));
            return payload.user_id || payload.sub;
        } catch (error) {
            console.error('Error decoding token:', error);
            throw new Error('Invalid authentication token');
        }
    };

    async function addAlbum(name) {
        if (!auth.currentUser) {
            throw new Error('User must be logged in to create an album');
        }

        try {
            const userId = auth.currentUser.uid;
            console.log('Creating album for user:', userId);

            const timestamp = new Date().getTime();
            const newAlbumId = `album_${timestamp}`;
            
            const newAlbum = {
                name: name,
                createdAt: new Date().toISOString(),
                updatedAt: new Date().toISOString(),
                photos: {},
                userId: userId
            };

            const albumRef = ref(database, `users/${userId}/albums/${newAlbumId}`);
            await set(albumRef, newAlbum);
            
            setAlbums(currentAlbums => [...currentAlbums, { id: newAlbumId, ...newAlbum }]);
            return newAlbumId;
        } catch (error) {
            console.error('Error in addAlbum:', error);
            if (error.message.includes('permission_denied')) {
                throw new Error('Permission denied. Please check if you are properly authenticated.');
            }
            throw error;
        }
    }

    async function editAlbum(albumId, newName) {
        if (!authCtx.isAuthenticated || !authCtx.token) {
            throw new Error('User must be logged in to edit an album');
        }

        try {
            const userId = getUserIdFromToken(authCtx.token);
            const albumRef = ref(database, `users/${userId}/albums/${albumId}`);
            
            const updates = {
                name: newName,
                updatedAt: new Date().toISOString()
            };

            await update(albumRef, updates);
            
            setAlbums(currentAlbums => {
                return currentAlbums.map(album => {
                    if (album.id === albumId) {
                        return { ...album, ...updates };
                    }
                    return album;
                });
            });
        } catch (error) {
            console.error('Error updating album:', error);
            throw error;
        }
    }

    async function deleteAlbum(albumId) {
        if (!authCtx.isAuthenticated || !authCtx.token) {
            throw new Error('User must be logged in to delete an album');
        }

        try {
            const userId = getUserIdFromToken(authCtx.token);
            const albumRef = ref(database, `users/${userId}/albums/${albumId}`);
            
            await remove(albumRef);
            
            setAlbums(currentAlbums => 
                currentAlbums.filter(album => album.id !== albumId)
            );
        } catch (error) {
            console.error('Error deleting album:', error);
            throw error;
        }
    }

    function getAlbum(albumId) {
        return albums.find(album => album.id === albumId);
    }

    const value = {
        albums,
        addAlbum,
        editAlbum,
        deleteAlbum,
        getAlbum,
    };

    return (
        <AlbumContext.Provider value={value}>
            {children}
        </AlbumContext.Provider>
    );
}

export { AlbumContextProvider };
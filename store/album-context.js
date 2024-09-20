import { createContext, useState } from 'react';

export const AlbumContext = createContext({
    albums: [],
    albumName: '',
    addAlbum: () => {},
    editAlbum: () => {},
    deleteAlbum: () => {},
});

function AlbumContextProvider({ children }) {

}

export default AlbumContextProvider;
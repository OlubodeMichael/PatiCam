import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';

// Your web app's Firebase configuration
const firebaseConfig = {
    // Your config here
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export async function createUser(email, password) {
    try {
        const response = await createUserWithEmailAndPassword(auth, email, password);
        const token = await response.user.getIdToken();
        
        if (!token) {
            throw new Error('Failed to get authentication token');
        }
        
        return {
            token: token,
            userData: response.user
        };
    } catch (error) {
        if (error.code === 'auth/email-already-in-use') {
            // Handle this specific error differently if needed
            console.log('Email already in use');
        }
        console.error('Create user error:', error);
        throw error;
    }
}

export async function login(email, password) {
    try {
        const response = await signInWithEmailAndPassword(auth, email, password);
        const token = await response.user.getIdToken();
        return token;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}
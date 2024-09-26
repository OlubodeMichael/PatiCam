import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { API_KEY} from "@env"

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: "your-auth-domain",
  projectId: "paticam",
  storageBucket: "your-storage-bucket",
  messagingSenderId: "your-messaging-sender-id",
  appId: "your-app-id",
};


const app = initializeApp(firebaseConfig);


export const auth = getAuth(app);

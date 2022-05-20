
import { initializeApp } from "firebase/app";

const firebaseConfig = {


        apiKey: "AIzaSyCjd6zn0Kn3Roc1IAMsJZWsB7q61n9x4cY",
      
        authDomain: "proyectofing-a7930.firebaseapp.com",
      
        projectId: "proyectofing-a7930",
      
        storageBucket: "proyectofing-a7930.appspot.com",
      
        messagingSenderId: "966476705725",
      
        appId: "1:966476705725:web:776b72e5d71b8241b8acd4"
      
    
      
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const getFirestoreApp = () => {
  return app
}
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  signInWithRedirect,
  GoogleAuthProvider,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAD-rok4vFU73u_qR7HzqWzjwi5S1o9QBw",
  authDomain: "crwn-clothing-db-999a0.firebaseapp.com",
  projectId: "crwn-clothing-db-999a0",
  storageBucket: "crwn-clothing-db-999a0.appspot.com",
  messagingSenderId: "7625474846",
  appId: "1:7625474846:web:6985b84e8e2afc9852bf0f",
};

const firebaseApp = initializeApp(firebaseConfig);

const provider = new GoogleAuthProvider();

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

export const db = getFirestore();
export const createUserDocumentFromAuth = async (userAuth) => {
  const userDocRef = await doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);

  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
      });
    } catch (error) {
      console.error("There was an error creating the user", error.message);
    }
  }

  return userDocRef;
};

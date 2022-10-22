// Module imports
import { initializeApp } from "firebase/app";
import {
  getAuth,
  signInWithPopup,
  GoogleAuthProvider,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";

//Initial firebase app configuration

const firebaseConfig = {
  apiKey: "AIzaSyAD-rok4vFU73u_qR7HzqWzjwi5S1o9QBw",
  authDomain: "crwn-clothing-db-999a0.firebaseapp.com",
  projectId: "crwn-clothing-db-999a0",
  storageBucket: "crwn-clothing-db-999a0.appspot.com",
  messagingSenderId: "7625474846",
  appId: "1:7625474846:web:6985b84e8e2afc9852bf0f",
};

const firebaseApp = initializeApp(firebaseConfig);

// ------------  AUTHENTICATION USING FIREBASE  ------------
export const auth = getAuth();
// Create users using Google Authentication in firebase
// AUTHENTICATION PROVIDERS
//Create Google Provider
const Googleprovider = new GoogleAuthProvider();
//Setting its custom parameters
Googleprovider.setCustomParameters({
  prompt: "select_account",
});
// Create the Sign In With Google Popup method
export const signInWithGooglePopup = () =>
  signInWithPopup(auth, Googleprovider);

// Create users using Email and password using Firebase Authentication
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(auth, email, password);
};

export const signInUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) throw new Error("No username or password provided");
  return await signInWithEmailAndPassword(auth, email, password);
};

// ------------  DATABASE CONNECTION  ------------
export const db = getFirestore();
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalDetails = {}
) => {
  //If no user is given by Firebase, exit the function
  if (!userAuth) return;
  const userDocRef = await doc(db, "users", userAuth.uid);
  const userSnapshot = await getDoc(userDocRef);
  //Check if a user exists based of Firebase Authentication callback
  //If the user does not exist we try and create one in our Database
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        //Pass any information that didn't come from the userAuth
        ...additionalDetails,
      });
    } catch (error) {
      console.error("There was an error creating the user", error.message);
    }
  }
  //Else if the user does exist, return the user data from the database
  return userDocRef;
};

export const signOutUser = () => signOut(auth);

export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

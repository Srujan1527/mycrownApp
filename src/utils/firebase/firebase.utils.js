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

//this doc method allows us to do is retrieve documents inside of our fire store
// how do we retrieve the documents data for that we use getDoc(get data of the document not the document) and setDoc(set data  of the document not the document ) methods
//we need to instantiate our firestore instance like getAuth so here we will use getFirestore

import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  writeBatch,
  query,
  getDocs,
} from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyA1CqdAWJwOaEu_vtES67Ad6nnbQuuvRT8",
  authDomain: "crwn-clothing-db-38dc8.firebaseapp.com",
  projectId: "crwn-clothing-db-38dc8",
  storageBucket: "crwn-clothing-db-38dc8.appspot.com",
  messagingSenderId: "507650134156",
  appId: "1:507650134156:web:5e5a21b7bdb9fcf9c12ba9",
};

// Initialize Firebase

const firebaseApp = initializeApp(firebaseConfig);

//here we use new operator because this GoogleAuthProvider is a class that we get from firebase/auth

const provider = new GoogleAuthProvider();

//so these custom parameters takes some kind of configuration object and with it we can tell different ways that we want this google auth provider to behave so generally specking the main one that we want is really just prompt

provider.setCustomParameters({
  prompt: "select_account",
});

export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, provider);

//This below function is used to add collection or data to database here first argument is collectionKey which id like users in our DB which is a string type and second arg is the actual data which is object type

export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach((object) => {
    //first we need to get the docReference
    const docRef = doc(collectionRef, object.title.toLowerCase());
    batch.set(docRef, object);
  });

  await batch.commit();
  console.log("done");
};

//now we need to get the  categorie data from database using the below method
export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, "categories");
  //this gives me some object that I can get a snapshot
  const q = query(collectionRef);

  const querySnapshot = await getDocs(q);
  const categoryMap = querySnapshot.docs.reduce((acc, docSnapshot) => {
    const { title, items } = docSnapshot.data();
    acc[title.toLowerCase()] = items;
    return acc;
  }, {});
  return categoryMap;
};

// now  we have instantiated our fire store, now we can use it in order to actially access our database

const db = getFirestore();

//we want some function that will take that data we're getting from the authentication service, and then we're going to store that inside of firestore that's the main functionality of the below function

// first we need to do first is we need to see if there is an existing document reference or not
// Here this doc method takes three args first one is the Database second is the collections, and third is the unique identifier
// this userAuth is the response object when we signin using google account from sign-in components file inside that object there will an unique identifier which is uid
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;
  const userDocRef = doc(db, "users", userAuth.uid);

  const userSnapshot = await getDoc(userDocRef);

  // console.log(userSnapshot.exists()); // false

  // lets write a  pseudo code of what we need to do now
  // 1) If user doesn't exits
  // 2) create/set the document with the data from userAuth in my collection

  if (!userSnapshot.exists()) {
    //if user data does'nt exist we need to create that data in databse
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // we are gonna try to set the document
      // first arg is userDocRef and second Arg is the dat that we want to set here displayName,email,createdAt
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (e) {
      console.log("error creating the user", e.message);
    }
  }
  //3) if user data exists
  //4) return userDocRef

  return userDocRef;
};

export const createAuthUserEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await createUserWithEmailAndPassword(
    auth,

    email,
    password
  );
};

export const signInAuthUserEmailAndPassword = async (email, password) => {
  if (!email || !password) return;
  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

//onAuthStateChanged method takes two arguments first is auth and second is callback that you want to call every time when auth state changes
export const onAuthStateChangedListener = (callback) =>
  onAuthStateChanged(auth, callback);

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import Constants from "expo-constants";
// Firebase config
//const firebaseConfig = {
//  apiKey: Constants.expoConfig.extra.apiKey,
//  authDomain: Constants.expoConfig.extra.authDomain,
//  projectId: Constants.expoConfig.extra.projectId,
//  storageBucket: Constants.expoConfig.extra.storageBucket,
//  messagingSenderId: Constants.expoConfig.extra.messagingSenderId,
//  appId: Constants.expoConfig.extra.appId,
//  databaseURL: Constants.expoConfig.extra.databaseURL,
//  //   @deprecated is deprecated Constants.manifest
//};

const firebaseConfig = {
  apiKey: "AIzaSyB4JejYdcs6IEmfAumtBZSZxX_l6UgXGfk",
  authDomain: "read-buddy-react.firebaseapp.com",
  projectId: "read-buddy-react",
  storageBucket: "read-buddy-react.appspot.com",
  messagingSenderId: "875875157768",
  appId: "1:875875157768:web:9e1c6bf1bc4c094dff0ebd",
  measurementId: "G-XBK3M2LRDF"
};


// initialize firebase
initializeApp(firebaseConfig);
export const auth = getAuth();
export const database = getFirestore();

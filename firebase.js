import { initializeApp } from "firebase/app";
import Constants from "expo-constants";
import { getFirestore, collection, getDocs } from "firebase/firestore/lite";

// initializeApp() is called before getAuth() for sure

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: Constants.manifest?.extra?.firebaseApiKey,
  authDomain: Constants.manifest?.extra?.firebaseAuthDomain,
  projectId: Constants.manifest?.extra?.firebaseProjectId,
  storageBucket: Constants.manifest?.extra?.firebaseStorageBucket,
  messagingSenderId: Constants.manifest?.extra?.firebaseMessagingSenderId,
  appId: Constants.manifest?.extra?.firebaseAppId,
};

export const db = getFirestore(app);

async function getUsers(db) {
  const citiesCol = collection(db, "users");
  const citySnapshot = await getDocs(citiesCol);
  const cityList = citySnapshot.docs.map((doc) => doc.data());
  return cityList;
}

console.log(getUsers());

// Initialize Firebase

const app = initializeApp(firebaseConfig);

export default app;

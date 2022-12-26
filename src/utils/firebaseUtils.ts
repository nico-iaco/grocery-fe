import {initializeAnalytics} from "firebase/analytics";
import {initializeApp} from "firebase/app";
import firebase from "firebase/compat";
import auth = firebase.auth;

const apiKey = process.env.REACT_APP_API_KEY;
const messagingSenderId = process.env.REACT_APP_MESSAGING_SENDER_ID;
const appId = process.env.REACT_APP_APP_ID;
const measurementId = process.env.REACT_APP_MEASUREMENT_ID;

const firebaseConfig = {
    apiKey,
    authDomain: "foody-me.firebaseapp.com",
    projectId: "foody-me",
    storageBucket: "foody-me.appspot.com",
    messagingSenderId,
    appId,
    measurementId,
};

export const app = initializeApp(firebaseConfig);
export const analytics = initializeAnalytics(app);

export const getFirebaseUserToken = async () => {
    const user = auth().currentUser;
    if (user) {
        return await user.getIdToken();
    }
    return null;
}



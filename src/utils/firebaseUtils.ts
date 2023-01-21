import {initializeAnalytics} from "firebase/analytics";
import {initializeApp} from "firebase/app";
import {getAuth, User} from "firebase/auth";

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
    const user = getAuth().currentUser;
    if (user) {
        return await user.getIdToken();
    }
    return null;
}

export const refreshFirebaseUser = async (user: User | null) => {
    return getAuth().updateCurrentUser(user);
}

export const isFirebaseUser = (user: any): user is User => {
    return "uid" in user;
}



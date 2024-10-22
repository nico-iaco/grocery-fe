import {initializeAnalytics} from "firebase/analytics";
import {initializeApp} from "firebase/app";
import {getAuth, User as FirebaseUser} from "firebase/auth";
import {getPerformance} from "firebase/performance";
import {User} from "../model/user";

const apiKey = import.meta.env.VITE_API_KEY;
const messagingSenderId = import.meta.env.VITE_MESSAGING_SENDER_ID;
const appId = import.meta.env.VITE_APP_ID;
const measurementId = import.meta.env.VITE_MEASUREMENT_ID;

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
export const auth = getAuth();
export const perf = getPerformance(app);

export const getFirebaseUserToken = async () => {
    const user = getAuth().currentUser;
    if (user) {
        return await user.getIdToken();
    }
    return null;
}

export const refreshFirebaseUser = async (user: FirebaseUser | null) => {
    return getAuth().updateCurrentUser(user);
}

export const isFirebaseUser = (user: any): user is FirebaseUser => {
    return "uid" in user;
}

export const mapFirebaseUserToUser = (user: FirebaseUser): User => {
    return {
        id: user.uid,
        email: user.email ?? "",
        displayName: user.displayName ?? "",
    }
}





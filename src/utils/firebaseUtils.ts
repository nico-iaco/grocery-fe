import { Analytics, initializeAnalytics } from "firebase/analytics";
import { FirebaseApp, initializeApp } from "firebase/app";

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

export let analytics: Analytics;

export const initializeFirebase = () => {
    const app = initializeApp(firebaseConfig)
    return app;
}

export const initializeFirebaseAnalytics = (app: FirebaseApp) => {
    analytics = initializeAnalytics(app);
}

import {useState} from "react";
import {getAuth} from "firebase/auth";

export const useIsUserAuthenticated = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const auth = getAuth();

    auth.onAuthStateChanged((user) => {
        if (user) {
            setIsAuthenticated(true);
        } else {
            setIsAuthenticated(false);
        }
    });


    return isAuthenticated;
}
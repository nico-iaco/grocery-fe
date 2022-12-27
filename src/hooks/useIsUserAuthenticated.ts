import {getFirebaseUserToken} from "../utils/firebaseUtils";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getUser} from "../selector/Selector";

export const useIsUserAuthenticated = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const currentUser = useSelector(getUser);


    useEffect(() => {
        const controller = new AbortController();
        getFirebaseUserToken()
            .then(value => {
                console.log("Firebase user token: ", value);
                console.log("Current user: ", currentUser);
                setIsAuthenticated(value !== null && currentUser !== undefined);
            })
            .catch(reason => {
                console.error(reason);
                setIsAuthenticated(false);
            });
        return () => controller.abort();
    }, [currentUser]);

    return isAuthenticated;
}
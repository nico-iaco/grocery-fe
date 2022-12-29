import {getFirebaseUserToken, refreshFirebaseUser} from "../utils/firebaseUtils";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getUser, isUserPersisted} from "../selector/Selector";
import { User } from "firebase/auth";

export const useIsUserAuthenticated = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const currentUser = useSelector(getUser);
    const isPersisted = useSelector(isUserPersisted);

    const isFirebaseUser = (user: any): user is User => {
        return "uid" in user;
    }


    useEffect(() => {

        if (isPersisted) {
            console.log("User is persisted");
            const userRaw = localStorage.getItem("user");
            if (userRaw) {
                const user = JSON.parse(userRaw);
                if (isFirebaseUser(user)) {
                    console.log("User is firebase user");
                    refreshFirebaseUser(user)
                        .then(() => {
                            console.log("User refreshed");
                            getFirebaseUserToken()
                                .then(value => {
                                    console.log("User token : " + value);
                                    setIsAuthenticated(value !== null && currentUser !== undefined);
                                })
                                .catch(reason => {
                                    console.error(reason);
                                    setIsAuthenticated(false);
                                });
                        })
                        .catch(reason => {
                            console.error(reason);
                        });
                }
            }
        } else {
            console.log("User is not persisted");
            getFirebaseUserToken()
                .then(value => {
                    console.log("User token : " + value);
                    setIsAuthenticated(value !== null && currentUser !== undefined);
                })
                .catch(reason => {
                    console.error(reason);
                    setIsAuthenticated(false);
                });
        }
    }, [currentUser, isPersisted]);

    return isAuthenticated;
}
import {getFirebaseUserToken, refreshFirebaseUser} from "../utils/firebaseUtils";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import {getUser} from "../selector/Selector";
import { User } from "firebase/auth";

export const useIsUserAuthenticated = (isPersisted: boolean) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const currentUser = useSelector(getUser);

    const isFirebaseUser = (user: any): user is User => {
        return "uid" in user;
    }


    useEffect(() => {

        if (isPersisted) {
            const userRaw = localStorage.getItem("user");
            if (userRaw) {
                const user = JSON.parse(userRaw);
                if (isFirebaseUser(user)) {
                    refreshFirebaseUser(user)
                        .then(() => {
                            getFirebaseUserToken()
                                .then(value => {
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
            getFirebaseUserToken()
            .then(value => {
                setIsAuthenticated(value !== null && currentUser !== undefined);
            })
            .catch(reason => {
                console.error(reason);
                setIsAuthenticated(false);
            });
        }
    }, [currentUser]);

    return isAuthenticated;
}
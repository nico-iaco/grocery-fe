import {logEvent} from "firebase/analytics";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { analytics } from "../utils/firebaseUtils";



const logCurrentPage = () => {
    logEvent(analytics, 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
    });
  };
  
export const AnalyticsComponent = () => {
    const location = useLocation();
    useEffect(() => {
        logCurrentPage(); // Log page view on initial load
    }, [location]);
    return (<div></div>);
};



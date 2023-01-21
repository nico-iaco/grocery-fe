import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { logCurrentPage } from "../utils/analyticsUtils";


  
export const AnalyticsComponent = () => {
    const location = useLocation();
    useEffect(() => {
        logCurrentPage(); // Log page view on initial load
    }, [location]);
    return (<div></div>);
};



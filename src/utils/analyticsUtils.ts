import { getAnalytics, logEvent } from "firebase/analytics";
import { Metric } from "web-vitals";
import { app } from "../utils/firebaseUtils";


export const logCurrentPage = () => {
    const analytics = getAnalytics(app);
    logEvent(analytics, 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_path: window.location.pathname
    });
};

export const sendToAnalytics = ({id, name, value}: Metric) => {
    const analytics = getAnalytics(app);
    logEvent(analytics, name, {
        eventCategory: 'Web Vitals',
        eventAction: name,
        eventValue: Math.round(name === 'CLS' ? value * 1000 : value),
        eventLabel: id,
        nonInteraction: true,
    });
}
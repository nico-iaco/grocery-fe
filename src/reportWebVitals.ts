import {onCLS, onINP, onLCP} from 'web-vitals';
import {sendToAnalytics} from "./utils/analyticsUtils";

onCLS(sendToAnalytics);
onINP(sendToAnalytics);
onLCP(sendToAnalytics);
interface ImportMetaEnv {
    readonly VITE_BASE_URL_FT: string;
    readonly VITE_BASE_URL: string;
    readonly VITE_VERSION: string;
    readonly VITE_AVAILABLE_UNITS: string;
    readonly REACT_APP_API_KEY: string;
    readonly REACT_APP_MESSAGING_SENDER_ID: string;
    readonly REACT_APP_APP_ID: string;
    readonly REACT_APP_MEASUREMENT_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}


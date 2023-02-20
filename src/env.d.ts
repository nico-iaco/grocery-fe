interface ImportMetaEnv {
    readonly VITE_BASE_URL_FT: string;
    readonly VITE_BASE_URL: string;
    readonly VITE_VERSION: string;
    readonly VITE_AVAILABLE_UNITS: string;
    readonly VITE_API_KEY: string;
    readonly VITE_MESSAGING_SENDER_ID: string;
    readonly VITE_APP_ID: string;
    readonly VITE_MEASUREMENT_ID: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}


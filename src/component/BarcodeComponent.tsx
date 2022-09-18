import {Html5QrcodeScanner, Html5QrcodeScanType} from "html5-qrcode";
import {useEffect} from "react";
import {QrcodeErrorCallback, QrcodeSuccessCallback} from "html5-qrcode/core";

export interface BarcodeComponentProps {
    fps: number
    qrbox: number
    qrCodeSuccessCallback: QrcodeSuccessCallback
    qrCodeErrorCallback?: QrcodeErrorCallback
}

export const BarcodeComponent = (props: BarcodeComponentProps) => {

    const regionId = "html5qr-code-full-region"

    const config = {
        fps: props.fps,
        qrbox: props.qrbox,
        supportedScanTypes: [Html5QrcodeScanType.SCAN_TYPE_CAMERA, Html5QrcodeScanType.SCAN_TYPE_FILE]
    }

    useEffect(() => {
        const html5QrcodeScanner = new Html5QrcodeScanner(
            regionId, config, false);
        html5QrcodeScanner.render(
            props.qrCodeSuccessCallback,
            props.qrCodeErrorCallback);
    }, [])

    return <div id={regionId}/>
}

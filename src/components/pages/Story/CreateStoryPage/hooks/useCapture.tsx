import { message } from "antd";
import { useRef } from "react";
import domtoimage from 'dom-to-image';
import { StoryType } from "../types";

const useCapture = () => {
    const captureAreaRef = useRef(null);

    const getCapture = async (storyType: StoryType) => {
        if (captureAreaRef.current == null) {
            message.error("Create story error!");
            return null;
        }

        if (storyType == "text")
            (captureAreaRef.current as HTMLDivElement).innerHTML = '<div class="preview-div-bordered"></div>';

        try {
            const dataUrl = await domtoimage.toJpeg(captureAreaRef.current, { quality: 0.95, style: { 'overflow': 'hidden' } });
            const blob = dataURLToBlob(dataUrl);
            return blob;
        } catch (error) {
            message.error("Error capturing image");
            return null;
        }
    };

    const dataURLToBlob = (dataUrl: any) => {
        let arr = dataUrl.split(','), mime = arr[0].match(/:(.*?);/)[1],
            bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
        while (n--) {
            u8arr[n] = bstr.charCodeAt(n);
        }
        return new Blob([u8arr], { type: mime });
    };

    return { captureAreaRef, getCapture };
}

export default useCapture;
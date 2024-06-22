import { PlusOutlined } from "@ant-design/icons";
import { Upload, Slider, UploadFile, UploadProps, Collapse } from "antd";
import { RcFile } from "antd/es/upload";
import { useState } from "react";

type ImageStorySettingsProps = {
    setImage: React.Dispatch<React.SetStateAction<string | undefined>>;
    handleImageWidthChange: (value: number) => void;
    handleImageRotateChange: (value: number) => void;
}

const ImageStorySettings = ({ setImage, handleImageWidthChange, handleImageRotateChange }: ImageStorySettingsProps) => {
    const [fileList, setFileList] = useState<UploadFile[]>();

    const handleImageChange = (file: UploadFile | null) => {
        if (!file) {
            setImage(undefined);
            return;
        }
        if (!file.url && !file.preview) {
            file.preview = URL.createObjectURL(file.originFileObj as RcFile);
        }
        setImage(file.url || (file.preview as string));
    };

    const handleImageFileListChange: UploadProps['onChange'] = ({ fileList: newFileList }) => {
        setFileList(newFileList);
        handleImageChange(newFileList.length > 0 ? newFileList[0] : null);
    };
    return (
        <Collapse items={[
            {
                key: '1',
                label: 'Image settings',
                children: <>
                    <Upload
                        showUploadList={{ showPreviewIcon: false }}
                        fileList={fileList}
                        onChange={handleImageFileListChange}
                        beforeUpload={() => false}
                        accept="image/*"
                        listType="picture-card"
                        maxCount={1}>
                        <div>
                            <PlusOutlined />
                            <div style={{ marginTop: 8 }}>Upload</div>
                        </div>
                    </Upload>
                    <p>Scale: </p>
                    <Slider defaultValue={30} onChange={handleImageWidthChange} min={0} max={500} />
                    <p>Rotate: </p>
                    <Slider defaultValue={30} onChange={handleImageRotateChange} min={0} max={360} />
                </>
            }]} className="story-settings-collapce"/>

    );
}

export default ImageStorySettings;
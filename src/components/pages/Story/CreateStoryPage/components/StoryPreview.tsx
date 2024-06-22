import { Card, Flex } from "antd";
import Draggable from 'react-draggable';
import { StoryType } from "../types";

type StoryPreviewProps = {
    storyType: StoryType
    width: number;
    rotate: number;
    image: string | undefined;
    text: string | undefined;
    textFontSize: string;
    textColorString: string | undefined;
    background: string;
    captureAreaRef: React.MutableRefObject<null>
}

const StoryPreview = ({ storyType, width, rotate, image, text, textFontSize, textColorString, background, captureAreaRef }: StoryPreviewProps) => {
    return (
        <Card title="Preview" style={{ width: '100%' }}>
            <div className="preview-div" style={{ background: background }}>
                <div ref={captureAreaRef} style={{ background: background }}>
                    <div className="preview-div-bordered" >
                        {storyType == "image" && (
                            <>
                                <Draggable>
                                    <img alt="Your story image" style={{ width: `${width}%`, rotate: `${rotate}deg` }} src={image} />
                                </Draggable>
                                <Draggable>
                                    <p style={{ cursor: 'pointer', color: `${textColorString}` }}>{text}</p>
                                </Draggable>
                            </>
                        )}
                        {storyType == "text" && (
                            <Flex justify="center" align="center" style={{ height: '100%', width: '90%', margin: '0 auto' }}>
                                <p style={{ color: `${textColorString}`, fontSize: `${textFontSize}px`, maxWidth: '90%' }}>{text}</p>
                            </Flex>
                        )}
                    </div>
                </div>
            </div>
        </Card>
    );
}

export default StoryPreview;
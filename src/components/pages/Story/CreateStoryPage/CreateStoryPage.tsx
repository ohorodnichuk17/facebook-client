import { Button, Card, Flex, message } from "antd";
import settingsIcon from "../../../../assets/story/settings.png";
import defaultAvatar from "../../../../assets/avatar.png";
import { useState } from "react";
import './CreateStoryPage.css'
import { apiClient } from "../../../../utils/api/apiClient";
import ImageStorySettings from "./components/ImageStorySettings";
import useCapture from "./hooks/useCapture";
import SelectStoryType from "./components/SelectStoryType";
import { useAppSelector } from "../../../../hooks/redux";
import ImageStoryPreview from "./components/ImageStoryPreview";
import BackgroundSelect from "./components/BackgroundSelect";

export const CreateStoryPage = () => {
    const account = useAppSelector(state => state.account);

    const [storyType, setStoryType] = useState<"image" | "text" | null>(null);
    const [image, setImage] = useState<string>();
    const [background, setBackground] = useState<string>('gray');

    const [width, setWidth] = useState<number>(30);
    const [rotate, setRotate] = useState<number>(0);

    const { captureAreaRef, getCapture } = useCapture();

    const handleImageWidthChange = (value: number) => setWidth(value);
    const handleImageRotateChange = (value: number) => setRotate(value);

    const postStory = async () => {
        const story = await getCapture();

        const formData = new FormData();
        formData.append("Content", "some content");
        formData.append("Image", story as Blob);
        formData.append("UserId", account.user?.id ?? '');

        apiClient.post('http://localhost:5181/api/Story/create', formData)
            .then((res) => {
                console.log(res)
                message.success("Story successfully posted!");
            })
            .catch((error) => {
                console.log(error);
                message.error("Post story error!")
            })
    }

    return (
        <Flex style={{ height: '100%' }} gap="middle">
            <Card style={{ overflow: 'auto' }}>
                <Flex style={{ height: '100%' }} vertical justify="space-between">


                    <Flex vertical>
                    <Card>
                        <Flex justify="space-between" align="center">
                            <p>Your story</p>
                            <div className="settings-icon-div">
                                <img src={settingsIcon} alt="Settings icon" />
                            </div>
                        </Flex>
                        <Flex className="avatar-div">
                            <img src={defaultAvatar} alt="User avatar image" />
                            <p>{account.user?.firstName + ' ' + account.user?.lastName}</p>
                        </Flex>
                    </Card>

                    {storyType != null && (
                        <>
                        {storyType == "image" && (
                            <ImageStorySettings setImage={setImage}
                            handleImageWidthChange={handleImageWidthChange}
                            handleImageRotateChange={handleImageRotateChange} />
                        )}
                            <BackgroundSelect setBackground={setBackground} />
                        </>
                        )}
                        </Flex>


                    {storyType != null && (
                        <Flex gap="small">
                            <Button className="gray-button" onClick={() => setStoryType(null)}>Cancel</Button>
                            <Button onClick={postStory}>Share</Button>
                        </Flex>
                    )}
                </Flex>
            </Card>

            {storyType == null && (
                <SelectStoryType setStoryType={setStoryType} />
            )}

            {storyType == "image" && (
                <ImageStoryPreview
                    image={image}
                    background={background}
                    width={width}
                    rotate={rotate}
                    captureAreaRef={captureAreaRef} />
            )}

            {storyType == "text" && (
                <>
                    It`s text
                </>
            )}
        </Flex>
    );
};

import { Button, Card, ColorPickerProps, Flex, message } from "antd";
import settingsIcon from "../../../../assets/story/settings.png";
import defaultAvatar from "../../../../assets/authentication/avatar.png";
import { useMemo, useState } from "react";
import './CreateStoryPage.css'
import { apiClient } from "../../../../utils/api/apiClient";
import ImageStorySettings from "./components/ImageStorySettings";
import useCapture from "./hooks/useCapture";
import SelectStoryType from "./components/SelectStoryType";
import { useAppSelector } from "../../../../hooks/redux";
import BackgroundSelect from "./components/BackgroundSelect";
import TextSettingsCollapce from "./components/TextSettingsCollapce";
import StoryPreview from "./components/StoryPreview";
import { StoryType } from "./types";
import StoryPrivacyModal from "./components/StoryPrivacyModal";
import { useNavigate } from "react-router-dom";
import CancelStoryModal from "./components/CancelStoryModal";

export const CreateStoryPage = () => {
   const navigate = useNavigate();

   const account = useAppSelector(state => state.account);

   const [storyType, setStoryType] = useState<StoryType | null>(null);
   const [image, setImage] = useState<string>();
   const [text, setText] = useState<string>();
   const [textFontSize, setTextFontSize] = useState<string>('16');

   const [textColor, setTextColor] = useState<ColorPickerProps['value']>('black');
   const textColorString = useMemo(
      () => (typeof textColor === 'string' ? textColor : textColor?.toHexString()),
      [textColor],
   );

   const [background, setBackground] = useState<string>('gray');

   const [width, setWidth] = useState<number>(30);
   const [rotate, setRotate] = useState<number>(0);

   const { captureAreaRef, getCapture } = useCapture();

   const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);
   const [isCancelModalOpen, setIsCancelModalOpen] = useState(false);

   const showPrivacyModal = () => setIsPrivacyModalOpen(true);
   const hidePrivacyModal = () => setIsPrivacyModalOpen(false);

   const showCancelModal = () => setIsCancelModalOpen(true);
   const onCancelCancelModal = () => setIsCancelModalOpen(false);
   const onOkCancelModal = () => {
      setIsPrivacyModalOpen(false);
      navigate("/");
   }

   const handleImageWidthChange = (value: number) => setWidth(value);
   const handleImageRotateChange = (value: number) => setRotate(value);

   const postStory = async () => {
      if (storyType == null) return;
      const story = await getCapture(storyType);

      const formData = new FormData();
      formData.append("Content", text ?? "");
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
      <Flex gap="middle" className="create-story-page">
         <Card style={{ overflow: 'auto' }}>
            <Flex style={{ height: '100%' }} vertical justify="space-between">
               <Flex vertical>
                  <Card>
                     <Flex justify="space-between" align="center">
                        <p>Your story</p>
                        <div className="settings-icon-div" onClick={showPrivacyModal}>
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
                        <TextSettingsCollapce setText={setText}
                           textFontSize={textFontSize}
                           setTextFontSize={setTextFontSize}
                           textColor={textColor}
                           setTextColor={setTextColor} />
                        <BackgroundSelect setBackground={setBackground} />
                     </>
                  )}
               </Flex>

               {storyType != null && (
                  <Flex gap="small" className="story-buttons-div">
                     <Button className="gray-button" onClick={showCancelModal}>Cancel</Button>
                     <Button onClick={postStory}>Share</Button>
                  </Flex>
               )}
            </Flex>
         </Card>

         {storyType == null && (
            <SelectStoryType setStoryType={setStoryType} />
         )}

         {storyType != null && (
            <StoryPreview
               storyType={storyType}
               image={image}
               text={text}
               textFontSize={textFontSize}
               textColorString={textColorString}
               background={background}
               width={width}
               rotate={rotate}
               captureAreaRef={captureAreaRef}
            />
         )}
         <StoryPrivacyModal isModalOpen={isPrivacyModalOpen} hideModal={hidePrivacyModal} />
         <CancelStoryModal
            isCancelModalOpen={isCancelModalOpen}
            onOkCancelModal={onOkCancelModal}
            onCancelCancelModal={onCancelCancelModal} />
      </Flex>
   );
};

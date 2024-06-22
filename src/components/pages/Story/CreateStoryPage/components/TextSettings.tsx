import { ColorPicker, Flex, Input } from "antd";
import { ColorValueType } from "antd/es/color-picker/interface";

type TextSettingsProps = {
    setText: React.Dispatch<React.SetStateAction<string | undefined>>;
    textFontSize: string;
    setTextFontSize: React.Dispatch<React.SetStateAction<string>>;
    textColor: ColorValueType | undefined;
    setTextColor: React.Dispatch<React.SetStateAction<ColorValueType | undefined>>
}

const TextSettings = ({ setText, textFontSize, setTextFontSize, textColor, setTextColor }: TextSettingsProps) => {
    return (
        <Flex vertical gap="small">
            <Input.TextArea
                onChange={(e) => setText(e.target.value)} />
            <Flex align="center" gap="small">
                <span>Font size: </span>
                <Input type="number" defaultValue={textFontSize} onChange={(e)=>setTextFontSize(e.target.value)}/>
            </Flex>
            <Flex align="center" gap="small">
                <span>Color:</span>

                <ColorPicker

                    format="hex"
                    value={textColor}
                    onChange={setTextColor}
                />
            </Flex>
        </Flex>
    );
}

export default TextSettings;
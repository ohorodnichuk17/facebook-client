import { Collapse } from "antd";
import BackgroundOptions from "./BackgroundOptions";

type BackgroundSelectProps={
    setBackground: React.Dispatch<React.SetStateAction<string>>;
}

const BackgroundSelect = ({ setBackground }:BackgroundSelectProps) => {
    const items = [
        {
            key: '1',
            label: 'Background',
            children: <BackgroundOptions setBackground={setBackground}/>
        }];

    return (
        <Collapse items={items} className="story-settings-collapce"/>
    );
}

export default BackgroundSelect;
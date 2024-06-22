import { Modal } from "antd";

type StoryPrivacyModalProps = {
    isModalOpen: boolean;
    hideModal: () => void;
}

const StoryPrivacyModal = ({ isModalOpen, hideModal }: StoryPrivacyModalProps) => {
    return (
        <Modal title="Privacy of story"
            open={isModalOpen}
            onOk={hideModal}
            okText="Save"
            okType="default"
            onCancel={hideModal}
            cancelButtonProps={{ className: "gray-button" }}>
            <p>Who can see your story?</p>
            <p>Your story will be visible on Quilt for 24 hours.</p>
        </Modal>
    );
}

export default StoryPrivacyModal;
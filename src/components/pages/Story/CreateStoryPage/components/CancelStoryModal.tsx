import { Modal } from "antd";

type CancelStoryModalProps = {
    isCancelModalOpen: boolean;
    onOkCancelModal: () => void;
    onCancelCancelModal: () => void;
}

const CancelStoryModal = ({ isCancelModalOpen, onOkCancelModal, onCancelCancelModal }: CancelStoryModalProps) => {
    return (
        <Modal title="Cancel story?"
            open={isCancelModalOpen}
            onOk={onOkCancelModal}
            okText="Cancel"
            okType="default"
            onCancel={onCancelCancelModal}
            cancelText="Continue editing"
            cancelButtonProps={{ className: "gray-button" }}>
            <p>Are you sure you want to cancel this story? It will not be saved.</p>
        </Modal>
    );
}

export default CancelStoryModal;
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
} from "@nextui-org/react";

interface ConfirmationModalProps {
  isOpen: boolean;
  Title: string;
  description: string;
  leftLabel: string;
  rightLabel: string;
  onPress: () => void;
  onClose: () => void;
}

const ConfirmationModal = ({
  isOpen,
  Title,
  description,
  leftLabel,
  rightLabel,
  onPress,
  onClose,
}: ConfirmationModalProps) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      classNames={{
        base: "bg-gray-500",
      }}
    >
      <ModalContent>
        {() => (
          <>
            <ModalHeader className="flex flex-col gap-1">{Title}</ModalHeader>
            <ModalBody>{description}</ModalBody>
            <ModalFooter>
              <Button color="danger" variant="light" onPress={onClose}>
                {leftLabel}
              </Button>
              <Button color="primary" onPress={onPress}>
                {rightLabel}
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;

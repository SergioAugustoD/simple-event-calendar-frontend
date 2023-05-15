import {
  Button,
  List,
  ListItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";

interface ParticipantModalProps {
  participants: { id: number; name_participant: string }[] | null;
  handleClose: () => void;
  isOpen: boolean;
}

const ParticipantModal: React.FC<ParticipantModalProps> = ({
  participants,
  isOpen,
  handleClose,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <Modal isOpen={isOpen} onClose={handleClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Lista de Participantes</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {participants ? (
            <List spacing={3}>
              {participants.map((participant) => (
                <ListItem
                  key={participant.id}
                  py={2}
                  px={4}
                  borderRadius="md"
                  bg="gray.100"
                >
                  {participant.name_participant}
                </ListItem>
              ))}
            </List>
          ) : (
            <Text>Nenhum participante registrado.</Text>
          )}
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleClose}
            variant="outline"
          >
            Fechar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ParticipantModal;

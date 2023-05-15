import {
  Button,
  CircularProgress,
  Flex,
  Heading,
  useToast,
} from "@chakra-ui/react";
import Comments from "components/Event/Comments";
import EventDetails from "components/Event/Detail";
import { IComment } from "interfaces/IComment";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { EventService } from "services/EventService";
import {
  CommentButton,
  CommentForm,
  CommentInput,
  CommentSectionContainer,
  Container,
} from "./styles";

const EventDetailPage = () => {
  const useLoc = useLocation();
  const { id_user, id } = useLoc.state.event;

  const toast = useToast();

  const [participants, setParticipants] = useState([] || null);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [comments, setComments] = useState<IComment[]>([]);
  const [commentInput, setCommentInput] = useState("");
  const [currentPage, setCurrentPage] = useState(0);
  const [commentsPerPage] = useState(3);

  useEffect(() => {
    const fetchComments = async () => {
      setIsLoading(true);
      try {
        const [commentsResponse] = await Promise.all([
          EventService.getCommentEvent(parseInt(id)),
        ]);
        setComments(commentsResponse);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchComments();
  }, [id]);

  const handleCommentInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCommentInput(e.target.value);
  };

  const handleAddComment = async () => {
    const currentUser = localStorage.getItem("given_name");
    const comment = {
      author: currentUser,
      comment: commentInput,
      idEvent: parseInt(id),
      idUser: parseInt(id_user),
    };

    try {
      const res = await EventService.addComment(comment);
      console.log(res);
      toast({
        title: res.msg,
        status: res.status === 200 ? "success" : "error",
      });
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  //
  // Paginação dos comentários
  const indexOfLastComment = (currentPage + 1) * commentsPerPage;
  const indexOfFirstComment = indexOfLastComment - commentsPerPage;
  const currentComments = comments.slice(
    indexOfFirstComment,
    indexOfLastComment
  );

  const handleNext = (): void => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = (): void => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <Container p={4} borderWidth={1} borderRadius="md" shadow="md">
      <Heading as="h1" size="xl" mb={4}>
        Detalhes do Evento
      </Heading>
      <EventDetails />

      <CommentSectionContainer>
        <Heading as="h2" size="md" mb={4}>
          Comentários
        </Heading>
        {isLoading && <CircularProgress isIndeterminate />}
        <Comments comments={currentComments} />
        <Flex justify="center" mt={4}>
          {currentPage > 0 && (
            <Button
              colorScheme="blue"
              variant="outline"
              onClick={handlePrevious}
              mr={2}
            >
              Anterior
            </Button>
          )}
          {comments.length > (currentPage + 1) * commentsPerPage && (
            <Button
              colorScheme="blue"
              variant="outline"
              onClick={handleNext}
              ml={2}
            >
              Próxima
            </Button>
          )}
        </Flex>

        <CommentForm>
          <CommentInput
            placeholder="Digite seu comentário"
            value={commentInput}
            onChange={handleCommentInputChange}
          />
          <CommentButton onClick={handleAddComment}>Comentar</CommentButton>
        </CommentForm>
      </CommentSectionContainer>
    </Container>
  );
};

export default EventDetailPage;

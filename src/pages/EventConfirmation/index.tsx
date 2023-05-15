import {
  Button,
  CircularProgress,
  Flex,
  Heading,
  Text,
  useToast,
} from "@chakra-ui/react";
import EventList from "components/Event/EventList";
import { IEvent } from "interfaces/IEvent";
import { useCallback, useEffect, useMemo, useState } from "react";
import { EventService } from "services/EventService";
import { dateFormat } from "util/dateFormat";
import { Container } from "./styles";

const EventConfirmation = () => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState<IEvent[]>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [eventsPerPage] = useState(3);
  const toast = useToast();
  const dateNow = dateFormat(new Date());

  useEffect(() => {
    const fetchData = async () => {
      const userId = parseInt(localStorage.getItem("dd"));
      const response = await EventService.getEventsParticipant({
        id_user: userId,
      });
      if (response) {
        setEvents(response);
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleConfirm = useCallback(
    async ({ name_participant, id_user, id_event, confirme_until }: any) => {
      setLoading(true);
      try {
        const response = await EventService.confirmEvent({
          name_participant,
          id_user,
          id_event,
          confirmed: "true",
          confirme_until,
        });

        if (response.status === 200) {
          toast({ title: response.msg, status: "success", duration: 3000 });
          window.location.reload();
        } else {
          toast({ title: response.err, status: "error", duration: 3000 });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    },
    [toast]
  );

  // Pagination logic
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = useMemo(
    () => events?.slice(indexOfFirstEvent, indexOfLastEvent),
    [events, indexOfFirstEvent, indexOfLastEvent]
  );

  const paginate = (pageNumber: number) => setCurrentPage(pageNumber);

  return (
    <Container>
      <Heading as="h1" size="xl" mb={4}>
        Meus Eventos
      </Heading>
      {loading ? (
        <CircularProgress alignSelf="center" size="70px" isIndeterminate />
      ) : events?.length > 0 ? (
        <>
          <EventList
            currentEvents={currentEvents}
            handleConfirm={handleConfirm}
          />
          <Pagination
            eventsPerPage={eventsPerPage}
            totalEvents={events?.length}
            paginate={paginate}
            currentPage={currentPage}
          />
        </>
      ) : (
        <Text>Participando de nenhum evento.</Text>
      )}
    </Container>
  );
};

export default EventConfirmation;

interface PaginationProps {
  eventsPerPage: number;
  totalEvents: number;
  paginate: (pageNumber: number) => void;
  currentPage: number;
}

const Pagination = ({
  eventsPerPage,
  totalEvents,
  paginate,
  currentPage,
}: PaginationProps) => {
  const pageNumbers = useMemo(() => {
    const pageCount = Math.ceil(totalEvents / eventsPerPage);
    return Array.from({ length: pageCount }, (_, i) => i + 1);
  }, [totalEvents, eventsPerPage]);

  return (
    <Flex mt={4} justify="center">
      {pageNumbers.map((number) => (
        <Button
          key={number}
          colorScheme={currentPage === number ? "blue" : "gray"}
          onClick={() => paginate(number)}
        >
          {number}
        </Button>
      ))}
    </Flex>
  );
};

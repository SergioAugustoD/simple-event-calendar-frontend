import React, { ChangeEvent, useCallback, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FiSearch } from "react-icons/fi";
import EventItem from "components/Event/EventItem";
import { IEvent } from "interfaces/IEvent";
import { EventService } from "services/EventService";

const EventListPage: React.FC = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState<IEvent[]>([]);
  const [page, setPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const handleCreate = (): void => {
    navigate("/create-event");
  };

  const handleNext = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  const handlePrevious = (): void => {
    setPage((prevPage) => prevPage - 1);
  };

  const handleSearch = useCallback(
    (event: ChangeEvent<HTMLInputElement>): void => {
      setSearchTerm(event.target.value);
    },
    []
  );

  useEffect(() => {
    const fetchEvents = async (): Promise<void> => {
      try {
        const data: IEvent[] = await EventService.listEvents();
        setEvents(data);
        setIsLoading(false);
      } catch (error) {
        console.error("Erro ao buscar os eventos:", error);
        setIsLoading(false);
      }
    };

    fetchEvents();
  }, []);

  return (
    <div className="py-8 px-4">
      <div className="flex justify-between mb-6">
        <h1 className="text-2xl font-bold">Lista de Eventos</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={handleCreate}
        >
          Criar Evento
        </button>
      </div>
      <div className="relative mb-4">
        <input
          type="text"
          placeholder="Buscar evento por título, descrição, data ou localização"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-blue-500 focus:border-blue-500"
        />
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <FiSearch className="text-gray-400" />
        </div>
      </div>
      {isLoading ? (
        <div className="text-center">Carregando...</div>
      ) : (
        <>
          {events.length > 0 ? (
            <>
              <EventItem
                events={events}
                navigate={navigate}
                page={page}
                searchTerm={searchTerm}
              />
              <div className="flex justify-center mt-4">
                {page > 0 && (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mr-2"
                    onClick={handlePrevious}
                  >
                    Anterior
                  </button>
                )}
                {events.length > (page + 1) * 12 && (
                  <button
                    className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                    onClick={handleNext}
                  >
                    Próximo
                  </button>
                )}
              </div>
            </>
          ) : (
            <p className="text-center">Nenhum evento encontrado</p>
          )}
        </>
      )}
    </div>
  );
};

export default EventListPage;

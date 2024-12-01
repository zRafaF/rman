import { FunctionComponent, useCallback, useMemo, useState } from "react";
import { motion } from "framer-motion";
import {
  Calendar,
  EventProps,
  momentLocalizer,
  View,
  Views,
} from "react-big-calendar";
import moment from "moment";

// @ts-expect-error Missing type definitions
import "moment/dist/locale/pt-br";
import React from "react";
import { getAllReservations } from "@/lib/firebase/reservations";
import { useQuery } from "@tanstack/react-query";
import ReservationDocument from "@/lib/firebase/schemas/ReservationDocument";
import { ReactBigCalendarEvent } from "@/types/ReactBigCalendar";
import { translateAreasEnum } from "@/lib/enums-translators";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";

const EventBody: FunctionComponent<
  EventProps<
    ReactBigCalendarEvent<
      QueryDocumentSnapshot<ReservationDocument, DocumentData>
    >
  >
> = ({ event }) => {
  if (!event.resource) {
    return <div>{event.title}</div>;
  }
  const translatedArea = translateAreasEnum(event.resource.data().area);

  return (
    <div className={`border-l-8 p-1  ${translatedArea.color}`}>
      <div className="px-1 flex gap-2 align-middle">
        {event.title}

        {translatedArea.icon}
      </div>
    </div>
  );
};

interface ScheduleProps {}

const Schedule: FunctionComponent<ScheduleProps> = () => {
  const reservations = useQuery({
    queryKey: ["reservations"],
    queryFn: async () => await getAllReservations(),
  });

  const localizer = momentLocalizer(moment);
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [view, setView] = useState<View>(Views.MONTH);
  const onView = useCallback((newView: View) => setView(newView), [setView]);
  const onNavigate = useCallback(
    (newDate: Date) => setSelectedDate(newDate),
    [setSelectedDate]
  );

  const events:
    | ReactBigCalendarEvent<
        QueryDocumentSnapshot<ReservationDocument, DocumentData>
      >[]
    | undefined = useMemo(
    () =>
      reservations.data?.docs.map((reservation) => ({
        title: translateAreasEnum(reservation.data().area).title,
        start: reservation.data().startTime.toDate(),
        end: reservation.data().endTime.toDate(),
        resource: reservation,
      })),
    [reservations.data]
  );

  const { components } = useMemo(
    () => ({
      components: {
        event: EventBody,
      },
    }),
    []
  );

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 to-blue-100 dark:[#273C4E] dark:[#EA0D44]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-screen pt-16 px-1 sm:px-4 text-foreground w-full max-w-7xl"
      >
        <motion.div
          initial={{ scale: 0.9 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
          className="rounded-lg shadow-lg overflow-hidden border border-border w-full"
        >
          <Calendar
            localizer={localizer}
            events={events}
            startAccessor="start"
            endAccessor="end"
            className="custom-calendar"
            style={{
              height: "70vh", // Dynamic height for responsiveness
              minHeight: 400, // Ensures usability on very small screens
            }}
            messages={{
              next: ">",
              previous: "<",
              today: "Hoje",
              month: "Mês",
              week: "Semana",
              day: "Dia",
              noEventsInRange: "Nenhum evento",
              allDay: "Dia inteiro",
              agenda: "Agenda",
              date: "Data",
              time: "Hora",
              event: "Evento",
              showMore: (total) => `+${total} mais`,
              tomorrow: "Amanhã",
              yesterday: "Ontem",
            }}
            components={components}
            onView={onView}
            view={view}
            views={["month", "day", "agenda"]}
            selectable={true}
            date={selectedDate}
            onNavigate={onNavigate}
            onSelectSlot={(SlotInfo) => {
              setSelectedDate(SlotInfo.start);
              setView(Views.DAY);
            }}
            dayLayoutAlgorithm={"no-overlap"}
            onSelectEvent={(event) => {
              console.log("Selected event:", event);
            }}
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Schedule;

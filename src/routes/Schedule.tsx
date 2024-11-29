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

const events = [
  {
    title: "Big Meeting",
    allDay: false,
    start: new Date(2024, 10, 22, 9, 15),
    end: new Date(2024, 10, 22, 9, 30),
  },
  {
    title: "Second Big Meeting",
    allDay: false,
    start: new Date(2024, 10, 22, 9, 45),
    end: new Date(2024, 10, 22, 10, 30),
  },
  {
    title: "Serraria1",
    allDay: false,
    start: new Date(2024, 10, 22, 8, 45),
    end: new Date(2024, 10, 22, 10, 30),
  },
  {
    title: "Serraria",
    allDay: false,
    start: new Date(2024, 10, 22, 9, 45),
    end: new Date(2024, 10, 22, 10, 15),
  },
  {
    title: "Big Meeting",
    allDay: false,
    start: new Date(2024, 10, 22, 9, 15),
    end: new Date(2024, 10, 22, 9, 30),
  },
  {
    title: "Second Big Meeting",
    allDay: false,
    start: new Date(2024, 10, 22, 9, 45),
    end: new Date(2024, 10, 22, 10, 30),
  },
  {
    title: "Serraria",
    allDay: false,
    start: new Date(2024, 10, 22, 8, 45),
    end: new Date(2024, 10, 22, 10, 30),
  },
  {
    title: "Serraria",
    allDay: false,
    start: new Date(2024, 10, 22, 9, 45),
    end: new Date(2024, 10, 22, 10, 15),
  },
  {
    title: "Big Meeting",
    allDay: false,
    start: new Date(2024, 10, 22, 9, 15),
    end: new Date(2024, 10, 22, 9, 30),
  },
  {
    title: "Second Big Meeting",
    allDay: false,
    start: new Date(2024, 10, 22, 9, 45),
    end: new Date(2024, 10, 22, 10, 30),
  },
  {
    title: "Serraria",
    allDay: false,
    start: new Date(2024, 10, 22, 8, 45),
    end: new Date(2024, 10, 22, 10, 30),
  },
  {
    title: "Serraria",
    allDay: false,
    start: new Date(2024, 10, 22, 9, 45),
    end: new Date(2024, 10, 22, 10, 15),
  },
  {
    title: "Big Meeting",
    allDay: false,
    start: new Date(2024, 10, 22, 9, 15),
    end: new Date(2024, 10, 22, 9, 30),
  },
  {
    title: "Second Big Meeting",
    allDay: false,
    start: new Date(2024, 10, 22, 9, 45),
    end: new Date(2024, 10, 22, 10, 30),
  },
  {
    title: "Serraria",
    allDay: false,
    start: new Date(2024, 10, 22, 8, 45),
    end: new Date(2024, 10, 22, 10, 30),
  },
  {
    title: "Serraria",
    allDay: false,
    start: new Date(2024, 10, 22, 9, 45),
    end: new Date(2024, 10, 22, 10, 15),
  },
];

const EventBody: FunctionComponent<EventProps<any>> = ({ event }) => {
  return <div className="border-b-4 border-indigo-500">{event.title}</div>;
};

interface ScheduleProps {}

const Schedule: FunctionComponent<ScheduleProps> = () => {
  const localizer = momentLocalizer(moment);
  const [selectedDate, setSelectedDate] = React.useState<Date>(new Date());
  const [view, setView] = useState<View>(Views.MONTH);
  const onView = useCallback((newView: View) => setView(newView), [setView]);
  const onNavigate = useCallback(
    (newDate: Date) => setSelectedDate(newDate),
    [setSelectedDate]
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
            // views={["month", "day", "agenda"]}
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

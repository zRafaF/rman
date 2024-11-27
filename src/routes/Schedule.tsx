import { FunctionComponent } from "react";
import { motion } from "framer-motion";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";

const localizer = momentLocalizer(moment);

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
];

interface ScheduleProps {}

const Schedule: FunctionComponent<ScheduleProps> = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="h-screen pt-16 px-4 sm:px-8 bg-background text-foreground"
    >
      <motion.h1
        initial={{ y: -20 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-3xl font-bold mb-4 text-primary-foreground"
      >
        Lab Schedule
      </motion.h1>
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
        className="rounded-lg shadow-lg overflow-hidden border border-border"
      >
        <Calendar
          localizer={localizer}
          events={events}
          startAccessor="start"
          endAccessor="end"
          className="custom-calendar"
          style={{ height: 500 }}
        />
      </motion.div>
    </motion.div>
  );
};

export default Schedule;

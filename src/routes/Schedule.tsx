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
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-teal-100 to-blue-100 dark:[#273C4E] dark:[#EA0D44]">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="h-screen pt-16 px-1 sm:px-4 text-foreground w-full max-w-7xl"
      >
        {/* <motion.h1
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="text-2xl sm:text-3xl font-bold mb-4 text-[#273C4E]-foreground"
        >
          Agendamento
        </motion.h1> */}
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
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default Schedule;

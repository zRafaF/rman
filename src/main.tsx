import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter, Routes, Route } from "react-router";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./styles/CalendarStyles.css";
import "react-phone-number-input/style.css";

import App from "./App.tsx";
import Schedule from "./routes/Schedule.tsx";
import Home from "./routes/Home.tsx";
import Login from "./routes/Login.tsx";
import Reserve from "./routes/Reserve.tsx";
import Admin from "./routes/Admin.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />}>
          <Route index element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Routes>
    </BrowserRouter>
  </StrictMode>
);

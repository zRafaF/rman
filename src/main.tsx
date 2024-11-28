import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";
import "./index.css";
import "react-big-calendar/lib/css/react-big-calendar.css";
import "./styles/CalendarStyles.css";
import "react-phone-number-input/style.css";

import Layout from "./Layouts/Layout.tsx";
import Schedule from "./routes/Schedule.tsx";
import Home from "./routes/Home.tsx";
import Login from "./routes/Login.tsx";
import Reserve from "./routes/Reserve.tsx";
import Admin from "./routes/Admin.tsx";
import NotAuthenticated from "./routes/NotAuthenticated.tsx";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/schedule" element={<Schedule />} />
          <Route path="/login" element={<Login />} />
          <Route path="/reserve" element={<Reserve />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="/not-authenticated" element={<NotAuthenticated />} />
        </Route>
      </Routes>
    </BrowserRouter>
    <ToastContainer />
  </StrictMode>
);

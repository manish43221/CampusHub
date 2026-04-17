import { useState, useEffect } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import { Toaster } from "react-hot-toast";

import NavBar from "./components/NavBar";
import LoginPage from "./pages/LoginPage";
import EventPage from "./pages/EventPage";
import EventDetailsPage from "./pages/EventDetailsPage";
import MyRegistrationPage from "./pages/MyRegistrationPage";
import HelpPage from "./pages/HelpPage";
import Footer from "./components/Footer";
import FindFriendPage from "./pages/FindFriendPage";
import ProfilePage from "./pages/ProfilePage";
import DashboardPage from "./pages/DashboardPage";
import FloatingHelpButton from "./components/FloatingHelpButton";

import { motion, AnimatePresence } from "framer-motion";

// ✅ Animation Wrapper
const PageWrapper = ({ children }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -40 }}
      transition={{ duration: 0.4 }}
    >
      {children}
    </motion.div>
  );
};

// ✅ Main Content
function AppContent({
  user,
  setUser,
  registeredEvents,
  setRegisteredEvents,
  eventRegistrations,
  setEventRegistrations,
}) {
  const location = useLocation();

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 dark:bg-slate-900 transition-all duration-500">

      {/* Navbar */}
      {user && <NavBar user={user} setUser={setUser} />}

      {/* Main Content */}
      <main className="flex-grow w-full max-w-7xl mx-auto px-4 py-8">
        
        <AnimatePresence mode="wait">
          <Routes location={location} key={location.pathname}>

            {/* Login */}
            <Route
              path="/login"
              element={
                !user ? (
                  <PageWrapper>
                    <LoginPage setUser={setUser} />
                  </PageWrapper>
                ) : (
                  <Navigate to="/" />
                )
              }
            />

            {/* Public */}
            <Route
              path="/help"
              element={
                <PageWrapper>
                  <HelpPage />
                </PageWrapper>
              }
            />

            <Route
              path="/find-friend"
              element={
                <PageWrapper>
                  <FindFriendPage />
                </PageWrapper>
              }
            />

            {/* Profile */}
            <Route
              path="/profile"
              element={
                user ? (
                  <PageWrapper>
                    <ProfilePage user={user} setUser={setUser} registeredEvents={registeredEvents} />
                  </PageWrapper>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* Dashboard */}
            <Route
              path="/dashboard"
              element={
                user ? (
                  <PageWrapper>
                    <DashboardPage user={user} registeredEvents={registeredEvents} />
                  </PageWrapper>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* Home */}
            <Route
              path="/"
              element={
                user ? (
                  <PageWrapper>
                    <EventPage />
                  </PageWrapper>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* Event Details */}
            <Route
              path="/events/:id"
              element={
                user ? (
                  <PageWrapper>
                    <EventDetailsPage
                      user={user}
                      registeredEvents={registeredEvents}
                      setRegisteredEvents={setRegisteredEvents}
                      eventRegistrations={eventRegistrations}
                      setEventRegistrations={setEventRegistrations}
                    />
                  </PageWrapper>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* My Registrations */}
            <Route
              path="/my-registrations"
              element={
                user ? (
                  <PageWrapper>
                    <MyRegistrationPage
                      user={user}
                      registeredEvents={registeredEvents}
                      registrations={eventRegistrations}
                      setRegisteredEvents={setRegisteredEvents}
                      setRegistrations={setEventRegistrations}
                    />
                  </PageWrapper>
                ) : (
                  <Navigate to="/login" />
                )
              }
            />

            {/* Fallback */}
            <Route
              path="*"
              element={<Navigate to={user ? "/" : "/login"} replace />}
            />
          </Routes>
        </AnimatePresence>

        {/* ✅ Floating Button OUTSIDE animation */}
        <FloatingHelpButton />

      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

// ✅ Root App
export default function App() {
  const [user, setUser] = useState(null);

  const [registeredEvents, setRegisteredEvents] = useState(() => {
    return JSON.parse(localStorage.getItem("registeredEvents")) || [];
  });

  const [eventRegistrations, setEventRegistrations] = useState(() => {
    return JSON.parse(localStorage.getItem("eventRegistrations")) || {};
  });

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("registeredEvents", JSON.stringify(registeredEvents));
    localStorage.setItem("eventRegistrations", JSON.stringify(eventRegistrations));
  }, [registeredEvents, eventRegistrations]);

  return (
    <BrowserRouter>
      <Toaster position="top-center" />

      <AppContent
        user={user}
        setUser={setUser}
        registeredEvents={registeredEvents}
        setRegisteredEvents={setRegisteredEvents}
        eventRegistrations={eventRegistrations}
        setEventRegistrations={setEventRegistrations}
      />
    </BrowserRouter>
  );
}
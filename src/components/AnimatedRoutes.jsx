import { Route, Routes, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import EventsPage from "../pages/EventsPage.jsx";
import EventDetailsPage from "../pages/EventDetailsPage.jsx";
import AddEventPage from "../pages/AddEventPage.jsx";
import EditEventPage from "../pages/EditEventPage.jsx";
import UserProfilePage from "../pages/UserProfilePage.jsx";
import AnimatedRoute from "./AnimatedRoute.jsx";

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                    <AnimatedRoute>
                        <HomePage />
                    </AnimatedRoute>
                }/>
                <Route path="/login" element={
                    <AnimatedRoute>
                        <LoginPage />
                    </AnimatedRoute>
                }/>
                <Route path="/events" element={
                    <AnimatedRoute>
                        <EventsPage />
                    </AnimatedRoute>
                }/>
                <Route path="/events/:eventId" element={
                    <AnimatedRoute>
                        <EventDetailsPage />
                    </AnimatedRoute>
                }/>
                <Route path="/events/add" element={
                    <AnimatedRoute>
                        <AddEventPage />
                    </AnimatedRoute>
                }/>
                <Route path="/events/edit/:eventId" element={
                    <AnimatedRoute>
                        <EditEventPage />
                    </AnimatedRoute>
                }/>
                <Route path="/attendees/profile/:attendeeId" element={
                    <AnimatedRoute>
                        <UserProfilePage />
                    </AnimatedRoute>
                }/>
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;

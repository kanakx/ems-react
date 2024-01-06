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
import ProtectedRoute from "./ProtectedRoute.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode={'wait'}>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                    <AnimatedRoute>
                        <HomePage />
                    </AnimatedRoute>
                }/>
                <Route path="/register" element={
                    <AnimatedRoute>
                        <RegisterPage />
                    </AnimatedRoute>
                }/>
                <Route path="/login" element={
                    <AnimatedRoute>
                        <LoginPage />
                    </AnimatedRoute>
                }/>
                <Route path="/events" element={
                    <AnimatedRoute>
                        <ProtectedRoute>
                            <EventsPage />
                        </ProtectedRoute>
                    </AnimatedRoute>
                }/>
                <Route path="/events/:eventId" element={
                    <AnimatedRoute>
                        <ProtectedRoute>
                            <EventDetailsPage />
                        </ProtectedRoute>
                    </AnimatedRoute>
                }/>
                <Route path="/events/add" element={
                    <AnimatedRoute>
                        <ProtectedRoute>
                            <AddEventPage />
                        </ProtectedRoute>
                    </AnimatedRoute>
                }/>
                <Route path="/events/edit/:eventId" element={
                    <AnimatedRoute>
                        <ProtectedRoute>
                            <EditEventPage />
                        </ProtectedRoute>
                    </AnimatedRoute>
                }/>
                <Route path="/attendees/profile/:attendeeId" element={
                    <AnimatedRoute>
                        <ProtectedRoute>
                            <UserProfilePage />
                        </ProtectedRoute>
                    </AnimatedRoute>
                }/>
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;

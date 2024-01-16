import {Route, Routes, useLocation} from "react-router-dom";
import {AnimatePresence} from "framer-motion";
import HomePage from "../pages/HomePage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import EventsPage from "../pages/EventsPage.jsx";
import EventDetailsPage from "../pages/EventDetailsPage.jsx";
import AddEventPage from "../pages/AddEventPage.jsx";
import EditEventPage from "../pages/EditEventPage.jsx";
import UserProfilePage from "../pages/UserProfilePage.jsx";
import RedirectAnimation from "./RedirectAnimation.jsx";
import ProtectedRoute from "./ProtectedRoute.jsx";
import RegisterPage from "../pages/RegisterPage.jsx";
import AdminPanelPage from "../pages/AdminPanelPage.jsx";
import AttendeesPage from "../pages/AttendeesPage.jsx";
import AttendeeEventsPage from "../pages/AttendeeEventsPage.jsx";
import AttendeeDetailsPage from "../pages/AttendeeDetailsPage.jsx";
import EditAttendeePage from "../pages/EditAttendeePage.jsx";
import AddAttendeePage from "../pages/AddAttendeePage.jsx";

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode={'wait'}>
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={
                    <RedirectAnimation>
                        <HomePage/>
                    </RedirectAnimation>
                }/>

                <Route path="/register" element={
                    <RedirectAnimation>
                        <RegisterPage/>
                    </RedirectAnimation>
                }/>

                <Route path="/login" element={
                    <RedirectAnimation>
                        <LoginPage/>
                    </RedirectAnimation>
                }/>

                <Route path="/admin" element={
                    <RedirectAnimation>
                        <ProtectedRoute>
                            <AdminPanelPage/>
                        </ProtectedRoute>
                    </RedirectAnimation>
                }/>

                <Route path="/attendees" element={
                    <RedirectAnimation>
                        <ProtectedRoute>
                            <AttendeesPage/>
                        </ProtectedRoute>
                    </RedirectAnimation>
                }/>

                <Route path="/attendees/:idAttendee" element={
                    <RedirectAnimation>
                        <ProtectedRoute>
                            <AttendeeDetailsPage/>
                        </ProtectedRoute>
                    </RedirectAnimation>
                }/>

                <Route path="/attendees/add" element={
                    <RedirectAnimation>
                        <ProtectedRoute>
                            <AddAttendeePage/>
                        </ProtectedRoute>
                    </RedirectAnimation>
                }/>

                <Route path="/attendees/edit/:idAttendee" element={
                    <RedirectAnimation>
                        <ProtectedRoute>
                            <EditAttendeePage/>
                        </ProtectedRoute>
                    </RedirectAnimation>
                }/>

                <Route path="/attendees-events" element={
                    <RedirectAnimation>
                        <ProtectedRoute>
                            <AttendeeEventsPage/>
                        </ProtectedRoute>
                    </RedirectAnimation>
                }/>

                <Route path="/events" element={
                    <RedirectAnimation>
                        <ProtectedRoute>
                            <EventsPage/>
                        </ProtectedRoute>
                    </RedirectAnimation>
                }/>

                <Route path="/events/:idEvent" element={
                    <RedirectAnimation>
                        <ProtectedRoute>
                            <EventDetailsPage/>
                        </ProtectedRoute>
                    </RedirectAnimation>
                }/>

                <Route path="/events/add" element={
                    <RedirectAnimation>
                        <ProtectedRoute>
                            <AddEventPage/>
                        </ProtectedRoute>
                    </RedirectAnimation>
                }/>

                <Route path="/events/edit/:idEvent" element={
                    <RedirectAnimation>
                        <ProtectedRoute>
                            <EditEventPage/>
                        </ProtectedRoute>
                    </RedirectAnimation>
                }/>

                <Route path="/attendees/edit/:idAttendee" element={
                    <RedirectAnimation>
                        <ProtectedRoute>
                            <EditAttendeePage/>
                        </ProtectedRoute>
                    </RedirectAnimation>
                }/>

                <Route path="/attendees/profile/:attendeeId" element={
                    <RedirectAnimation>
                        <ProtectedRoute>
                            <UserProfilePage/>
                        </ProtectedRoute>
                    </RedirectAnimation>
                }/>
            </Routes>
        </AnimatePresence>
    );
};

export default AnimatedRoutes;

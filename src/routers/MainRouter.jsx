import HomePage from "../pages/HomePage.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import EventsPage from "../pages/EventsPage.jsx";
import EditEventPage from "../pages/EditEventPage.jsx";
import AddEventPage from "../pages/AddEventPage.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import EventDetailsPage from "../pages/EventDetailsPage.jsx";

const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/events" element={<EventsPage />} />
                <Route path="/events/:eventId" element={<EventDetailsPage />} />
                <Route path="/events/add" element={<AddEventPage />} />
                <Route path="/events/edit/:eventId" element={<EditEventPage />} />
                {/*<Route path="/workouts/add" element={<AddWorkoutForm />} />*/}
            </Routes>
        </BrowserRouter>
    );
};

export default MainRouter;
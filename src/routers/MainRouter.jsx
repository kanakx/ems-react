import HomePage from "../pages/HomePage.jsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import EventsPage from "../pages/EventsPage.jsx";

const MainRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/events" element={<EventsPage />} />
                {/*<Route path="/workouts/add" element={<AddWorkoutForm />} />*/}
            </Routes>
        </BrowserRouter>
    );
};

export default MainRouter;
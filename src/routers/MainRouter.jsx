import {BrowserRouter} from "react-router-dom";
import AnimatedRoutes from "../components/AnimatedRoutes.jsx";

const MainRouter = () => {
    return (
        <BrowserRouter>
            <AnimatedRoutes/>
        </BrowserRouter>
    );
};

export default MainRouter;
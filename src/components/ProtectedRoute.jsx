import { Navigate } from 'react-router-dom';
import {useUserContext} from "../contexts/UserContext.jsx";
import PropTypes from "prop-types";

const ProtectedRoute = ({ children }) => {
    const { isAuth } = useUserContext();

    if (!isAuth) {
        // Redirect to the login page if not authenticated
        return <Navigate to="/login" replace />;
    }

    return children;
};

ProtectedRoute.propTypes = {
    children: PropTypes.object.isRequired
};

export default ProtectedRoute;

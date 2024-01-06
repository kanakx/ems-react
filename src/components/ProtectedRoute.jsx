import { Navigate } from 'react-router-dom';
import {useUserContext} from "../contexts/UserContext.jsx";

const ProtectedRoute = ({ children }) => {
    const { isAuth } = useUserContext();

    if (!isAuth) {
        // Redirect to the login page if not authenticated
        return <Navigate to="/login" replace />;
    }

    return children;
};

export default ProtectedRoute;

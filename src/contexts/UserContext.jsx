import {createContext, useContext, useState} from "react";
import PropTypes from "prop-types";
import authService from "../services/authService.js";

const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
    //TODO Change initial values to the actual
    const userData = {
        idAttendee: '1',
        fullName: 'John Doe'
    };
    const [user, setUser] = useState(userData);
    const [isAuth, setIsAuth] = useState(false);

    const loginUser = (credentials) => {
        authService.login(credentials)
            .then(userData => {
                setUser(userData); // Assuming userData contains user details
                setIsAuth(true);
            })
            .catch(error => {
                console.error('Login failed:', error);
                // Optionally, handle login failure with additional logic
            });
    };

    const logoutUser = () => {
        authService.logout()
            .then(message => {
                console.log(message);
                setUser(null);
                setIsAuth(false);
            })
            .catch(error => {
                console.error('Logout failed:', error);
                // Optionally, handle logout failure with additional logic
            });
    };

    return (
        <UserContext.Provider value={{ user, isAuth, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};

UserContextProvider.propTypes = {
    children: PropTypes.object.isRequired
};

export const useUserContext = () => useContext(UserContext);

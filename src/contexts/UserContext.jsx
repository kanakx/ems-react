import {createContext, useContext, useState} from "react";
import PropTypes from "prop-types";
import authService from "../services/authService.js";
import {getAttendeeById} from "../services/attendeeService.js";
import {jwtDecode} from "jwt-decode";

const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {

    const [attendee, setAttendee] = useState(null);
    const [isAuth, setIsAuth] = useState(false);

    const loginUser = (credentials) => {
        return authService.login(credentials)
            .then(response => {
                localStorage.setItem('token', response.token);
                const decodedToken = jwtDecode(response.token);
                const idAttendee = decodedToken.sub;

                return getAttendeeById(idAttendee);
            })
            .then(fetchedAttendee => {
                setAttendee(fetchedAttendee);
                setIsAuth(true);
            })
            .catch(error => {
                console.error('Login failed:', error);
            });
    };

    const logoutUser = () => {
        return authService.logout()
            .then(message => {
                console.log(message);
                setAttendee(null);
                setIsAuth(false);
            })
            .catch(error => {
                console.error('Logout failed:', error);
            });
    };

    return (
        <UserContext.Provider value={{ attendee, isAuth, loginUser, logoutUser }}>
            {children}
        </UserContext.Provider>
    );
};

UserContextProvider.propTypes = {
    children: PropTypes.object.isRequired
};

export const useUserContext = () => useContext(UserContext);

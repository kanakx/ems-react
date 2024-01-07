import {createContext, useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import authService, {validateToken} from "../services/authService.js";
import {getAttendeeById} from "../services/attendeeService.js";
import {jwtDecode} from "jwt-decode";
import {toast} from "react-toastify";

const UserContext = createContext(null);

export const UserContextProvider = ({children}) => {

    const [attendee, setAttendee] = useState(null);
    const [isAuth, setIsAuth] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        // Initial token validation check
        checkTokenValidity();

        // Subsequent periodic checks
        const interval = setInterval(() => {
            checkTokenValidity();
        }, 60 * 1000); // every minute

        return () => clearInterval(interval);
    }, []);

    const registerUser = (credentials) => {
        return authService.register(credentials)
            .then(response => {
                console.log('Register successful:', response);
            })
            .catch(error => {
                console.log('Register failed:', error);
            })
    };

    const loginUser = (credentials) => {
        return authService.login(credentials)
            .then(response => {
                localStorage.setItem('token', response.token);
                const decodedToken = jwtDecode(response.token);
                const idUser = decodedToken.sub;
                return getAttendeeById(idUser);
            })
            .then(fetchedAttendee => {
                setAttendee(fetchedAttendee);
                setIsAuth(true);
            })
            .catch(error => {
                console.error('Login failed:', error);
                throw error;
            });
    };

    const checkTokenValidity = () => {
        const token = localStorage.getItem('token');
        const tokenDto = {
            token: token
        };

        if (token) {
            validateToken(tokenDto)
                .then(validationResponse => {
                    if (!validationResponse.isValid) {
                        logoutUser()
                            .then(() => {
                                setIsAuth(false);
                            })
                            .catch(error => {
                                console.error('Logout failed', error);
                            });
                    }
                })
                .catch(error => {
                    console.error('Token validation failed', error);
                    toast.error('Token validation failed.');
                })
                .finally(() => setIsLoading(false));
        } else {
            setIsLoading(false);
        }
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
        <UserContext.Provider value={{attendee, isAuth, isLoading, registerUser, loginUser, logoutUser}}>
            {children}
        </UserContext.Provider>
    );
};

UserContextProvider.propTypes = {
    children: PropTypes.object.isRequired
};

export const useUserContext = () => useContext(UserContext);

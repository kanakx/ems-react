import {createContext, useContext, useEffect, useState} from "react";
import PropTypes from "prop-types";
import authService, {validateToken} from "../services/authService.js";
import {getAttendeeById} from "../services/attendeeService.js";
import {jwtDecode} from "jwt-decode";
import {toast} from "react-toastify";

const UserContext = createContext(null);

export const UserContextProvider = ({children}) => {

    const [isAuth, setIsAuth] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);
    const [attendee, setAttendee] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        checkTokenValidity();
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

                const isUserAdmin = decodedToken.roles.includes('ADMIN');
                setIsAdmin(isUserAdmin);

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
            .then(() => {
                setAttendee(null);
                setIsAuth(false);
            })
            .catch(error => {
                console.error('Logout failed:', error);
            });
    };

    return (
        <UserContext.Provider value={{isAuth, isAdmin, attendee, isLoading, registerUser, loginUser, logoutUser}}>
            {children}
        </UserContext.Provider>
    );
};

UserContextProvider.propTypes = {
    children: PropTypes.object.isRequired
};

export const useUserContext = () => useContext(UserContext);

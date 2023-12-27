import {createContext, useContext, useState} from "react";
import PropTypes from "prop-types";
import authService from "../services/authService.js";

const UserContext = createContext(null);

export const UserContextProvider = ({ children }) => {
    //TODO Change initial values to the actual
    const userData = {
        idAttendee: '1',
        fullName: 'John Doe',
        attendeeEventDtoList: [
            {
                "idAttendeeEvent": 1,
                "eventDto": {
                    "idEvent": 1,
                    "name": "Tech Conference 2023",
                    "type": "CONFERENCE",
                    "startTimestamp": "2023-03-15T09:00:00",
                    "endTimestamp": "2023-03-15T17:00:00",
                    "locationName": "New York",
                    "description": "An annual conference for tech enthusiasts and professionals.",
                    "isPublic": true
                },
                "status": "ACCEPTED",
                "invited": false
            },
            {
                "idAttendeeEvent": 2,
                "eventDto": {
                    "idEvent": 2,
                    "name": "Art & Design Expo",
                    "type": "EXHIBITION",
                    "startTimestamp": "2023-04-22T10:00:00",
                    "endTimestamp": "2023-04-22T18:00:00",
                    "locationName": "San Francisco",
                    "description": "Explore the latest trends in art and design.",
                    "isPublic": true
                },
                "status": "DECLINED",
                "invited": false
            }
        ]

    };
    const [user, setUser] = useState(userData);
    const [isAuth, setIsAuth] = useState(true);

    const loginUser = (credentials) => {
        authService.login(credentials)
            .then(userData => {
                setUser(userData);
                setIsAuth(true);
            })
            .catch(error => {
                console.error('Login failed:', error);
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

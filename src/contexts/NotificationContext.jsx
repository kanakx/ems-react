import React, {createContext, useState} from 'react';
import Notification from '../components/Notification';
import PropTypes from "prop-types";

const NotificationContext = createContext();

export const NotificationContextProvider = ({ children }) => {
    const [notification, setNotification] = useState({ message: '', type: '', show: false });

    const showNotification = (message, type) => {
        setNotification({ message, type, show: true });
        setTimeout(() => {
            setNotification({ message: '', type: '', show: false });
        }, 3000);
    };

    return (
        <NotificationContext.Provider value={{ showNotification }}>
            {notification.show && (
                <Notification message={notification.message} type={notification.type} />
            )}
            {children}
        </NotificationContext.Provider>
    );
};

NotificationContextProvider.propTypes = {
    children: PropTypes.object.isRequired
};

export const useNotificationContext = () => React.useContext(NotificationContext);

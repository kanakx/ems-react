import styled from 'styled-components';
import PropTypes from "prop-types";

const SuccessMessage = styled.div`
    padding: 10px;
    background-color: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
    border-radius: 5px;
    margin: 10px 0;
`;

const ErrorMessage = styled.div`
    padding: 10px;
    background-color: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
    border-radius: 5px;
    margin: 10px 0;
`;

const Notification = ({ message, type }) => {
    if (type === 'success') {
        return <SuccessMessage>{message}</SuccessMessage>;
    }
    if (type === 'error') {
        return <ErrorMessage>{message}</ErrorMessage>;
    }
    return null;
};

Notification.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.string.isRequired
};

export default Notification;

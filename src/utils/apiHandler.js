import {toast} from "react-toastify";

export const handleApiResponse = response => {
    return response.data;
};

export const handleApiError = (error) => {
    console.error('API Error: ', error);
    if (error.message === "Network Error" || error.response === undefined) {
        toast.error("Unable to connect to the server. Please try again later.");
    } else {
        if (error.response.status === 401) {
            // Handle invalid credentials specifically
            const invalidCredentialsMessage = error.response?.data?.message || 'Invalid credentials. Please try again.';
            toast.error(invalidCredentialsMessage);
        } else if (error.response.status === 403) {
            toast.error('No permission to access this resource.');
        } else if (error.response.status === 404) {
            // toast.error('Resource not found.');
        } else {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
            toast.error(errorMessage);
        }
    }
    throw error;
};


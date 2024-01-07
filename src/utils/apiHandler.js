import {toast} from "react-toastify";

export const handleApiResponse = response => {
    return response.data;
};

export const handleApiError = error => {
    console.error('API Error: ', error);
    if (error.message === "Network Error" || error.response === undefined) {
        toast.error("Unable to connect to the server. Please try again later.");
    } else {
        if (error.response.status === 401 || error.response.status === 403) {
            toast.error("No permission to access resource. ");
        } else {
            const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
            toast.error(errorMessage);
        }
    }
    throw error;
};

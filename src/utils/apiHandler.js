import { toast } from "react-toastify";

export const handleApiResponse = response => {
    return response.data;
};

export const handleApiError = error => {
    console.error('API Error: ', error);
    const errorMessage = error.response?.data?.message || 'An unexpected error occurred.';
    toast.error(errorMessage);
    throw error;
};

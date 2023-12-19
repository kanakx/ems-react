const API_URL = 'YOUR_API_URL'; // Replace with your actual API URL

const login = (credentials) => {
    return fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(credentials)
    })
        .then(response => {
            if (!response.ok) {
                throw new Error('Failed to login');
            }
            return response.json();
        })
        .then(data => {
            localStorage.setItem('token', data.token); // Store the token
            return data; // This should include user data
        })
        .catch(error => {
            console.error('Error logging in:', error);
            throw error; // Re-throw to allow catching in context or components
        });
};

//TODO how does it exactly work
const logout = () => {
    return new Promise((resolve, reject) => {
        try {
            localStorage.removeItem('token'); // Remove the token
            resolve('Logged out successfully');
        } catch (error) {
            console.error('Error logging out:', error);
            reject(error);
        }
    });
};

const authService = {
    login,
    logout
};

export default authService;

import axios from 'axios';

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post("http://localhost:8080/api/auth/login", {
            email,
            password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }
};

export const registerUser = async (email, password) => {
    try {
        const response = await axios.post("http://localhost:8080/api/auth/register", {
            email,
            password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }
};
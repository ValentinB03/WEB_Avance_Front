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
        const { accessToken, refreshToken} = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        const user = await getUser(response.data.user.id);
        localStorage.setItem('user', JSON.stringify(user));
        console.log(user);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }
};

export const registerUser = async (name, email, password, userType, addressString, referralBy, siretNumber, IBAN) => {
    try {
        const response = await axios.post("http://localhost:8080/api/auth/register", {
            name,
            email,
            password,
            userType,
            addressString,
            referralBy,
            siretNumber,
            IBAN
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }
};

export const createRestaurant = async (name, addressString, email, description, ownerId) => {
    try {
        console.log(localStorage.getItem('accessToken'))
        const response = await axios.post("http://localhost:8080/api/restaurants/", {
            name,
            addressString,
            email,
            description,
            ownerId
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }
};

export const addDocumentRestaurant = async (restaurantId, name, file) => {
    try {
        console.log(localStorage.getItem('accessToken'))
        const response = await axios.post(`http://localhost:8080/api/restaurants/${restaurantId}/documents`, {
            name,
            file
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }
};

export const getUser = async (idUser) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/users/${idUser}`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }
};

export const getRestaurantByOwner = async (idUser) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/restaurants/owner/${idUser}`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }
};

export const getBanniereByOwner = async (idOwner) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/restaurants/owner/${idOwner}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        // Accédez aux données de la réponse
        const { id, documentId } = response.data[0];
        const response2 = await axios.get(`http://localhost:8080/api/restaurants/${id}/documents/${documentId}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        return response2.data;
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }
};
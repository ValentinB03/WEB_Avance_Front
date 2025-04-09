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
        await getUser(response.data.user.id);
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
        localStorage.setItem('user', JSON.stringify(response.data));
        console.log(response.data);
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }
};

export const DeleteUser = async (idUser) => {
    try {
        await axios.delete(`http://localhost:8080/api/users/${idUser}`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        localStorage.clear();
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }
};

export const DeleteResto = async (idUser) => {
    try {
        const response = await axios.get(`http://localhost:8080/api/restaurants/owner/${idUser}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        // Accédez aux données de la réponse
        const { id } = response.data[0];
        console.log(id);
        await axios.delete(`http://localhost:8080/api/users/${idUser}`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        await axios.delete(`http://localhost:8080/api/restaurants/${id}`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        localStorage.clear();
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }
};

export const getAllResto = async () => {
    try {
        const response = await axios.get(`http://localhost:8080/api/restaurants/`,{
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

export const editNameUser = async (idOwner, name) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/users/${idOwner}`, {
            name
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

export const editPasswordUser = async (idOwner, password) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/users/${idOwner}`, {
            password
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

export const editEmailUser = async (idOwner, email) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/users/${idOwner}`, {
            email
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

export const editIbanUser = async (idOwner, IBAN) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/users/${idOwner}`, {
            IBAN
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

export const editAddressUser = async (idOwner, addressString) => {
    try {
        const response = await axios.put(`http://localhost:8080/api/users/${idOwner}`, {
            addressString
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

export const editNameResto = async (idOwner, name) => {
    try {
        await axios.put(`http://localhost:8080/api/users/${idOwner}`, {
            name
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        const response = await getRestaurantByOwner(idOwner);

        await axios.put(`http://localhost:8080/api/restaurants/${response[0].id}`, {
            name
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }

};

export const editPasswordResto = async (idOwner, password) => {
    try {
        await axios.put(`http://localhost:8080/api/users/${idOwner}`, {
            password
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }

};

export const editEmailResto = async (idOwner, email) => {
    try {
        await axios.put(`http://localhost:8080/api/users/${idOwner}`, {
            email
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        const response = await getRestaurantByOwner(idOwner);

        await axios.put(`http://localhost:8080/api/restaurants/${response[0].id}`, {
            email
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }

};

export const editAddressResto = async (idOwner, addressString) => {
    try {
        await axios.put(`http://localhost:8080/api/users/${idOwner}`, {
            addressString
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        const response = await getRestaurantByOwner(idOwner);

        await axios.put(`http://localhost:8080/api/restaurants/${response[0].id}`, {
            addressString
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }

};

export const editIbanResto = async (idOwner, IBAN) => {
    try {
        await axios.put(`http://localhost:8080/api/users/${idOwner}`, {
            IBAN
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }

};
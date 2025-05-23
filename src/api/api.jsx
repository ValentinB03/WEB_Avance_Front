import axios from 'axios';

export const loginUser = async (email, password) => {
    try {
        const response = await axios.post("/api/auth/login", {
            email,
            password
        }, {
            headers: {
                "Content-Type": "application/json"
            }
        });
        const { accessToken, refreshToken, user} = response.data;
        localStorage.setItem('accessToken', accessToken);
        localStorage.setItem('refreshToken', refreshToken);
        const response2 = await axios.get(`/api/users/${user.id}`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        localStorage.setItem('user', JSON.stringify(response2.data));
        return response.data;
    } catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }
};

export const registerUser = async (name, email, password, userType, addressString, referralBy, siretNumber, IBAN) => {
    try {
        const response = await axios.post("/api/auth/register", {
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
        const response = await axios.post("/api/restaurants/", {
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
        const response = await axios.post(`/api/restaurants/${restaurantId}/documents`, {
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
        const response = await axios.get(`/api/users/${idUser}`,{
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

export const getAllUsers = async () => {
    try {
        console.log(localStorage.getItem('accessToken'))
        const response = await axios.get(`/api/users/`,{
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

export const getLogs = async () => {
    try {
        const response = await axios.get(`/api/auth/logs`,{
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

export const getSystemHealth = async () => {
    try {
        const response = await axios.get(`/api/auth-health/all/`,{
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

export const DeleteUser = async (idUser) => {
    try {
        await axios.delete(`/api/users/${idUser}`,{
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

export const DeleteResto = async (idUser) => {
    try {
        const response = await axios.get(`/api/restaurants/owner/${idUser}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        // Accédez aux données de la réponse
        const { id } = response.data[0];
        console.log(id);
        await axios.delete(`/api/users/${idUser}`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        await axios.delete(`/api/restaurants/${id}`,{
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
        const response = await axios.get(`/api/restaurants/`,{
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
        const response = await axios.get(`/api/restaurants/owner/${idUser}`,{
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

export const getRestaurantById = async (id) => {
    try {
        const response = await axios.get(`/api/restaurants/${id}`,{
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
        const response = await axios.get(`/api/restaurants/owner/${idOwner}`, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        // Accédez aux données de la réponse
        const { id, documentId } = response.data[0];
        console.log(response.data[0]);
        if (!documentId) {
            return null; // ou une valeur par défaut
        }
        const response2 = await axios.get(`/api/restaurants/${id}/documents/${documentId}`, {
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
        const response = await axios.put(`/api/users/${idOwner}`, {
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

export const editActiveUser = async (idOwner, isActive) => {
    try {
        const response = await axios.put(`/api/users/${idOwner}`, {
            isActive
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
        const response = await axios.put(`/api/users/${idOwner}`, {
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
        const response = await axios.put(`/api/users/${idOwner}`, {
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
        const response = await axios.put(`/api/users/${idOwner}`, {
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
        const response = await axios.put(`/api/users/${idOwner}`, {
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

export const editRefferalCodeUser = async (idOwner, referralCode) => {
    try {
        const response = await axios.put(`/api/users/${idOwner}`, {
            referralCode
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
        await axios.put(`/api/users/${idOwner}`, {
            name
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        const response = await getRestaurantByOwner(idOwner);

        await axios.put(`/api/restaurants/${response[0].id}`, {
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
        await axios.put(`/api/users/${idOwner}`, {
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
        await axios.put(`/api/users/${idOwner}`, {
            email
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        const response = await getRestaurantByOwner(idOwner);

        await axios.put(`/api/restaurants/${response[0].id}`, {
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
        await axios.put(`/api/users/${idOwner}`, {
            addressString
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });

        const response = await getRestaurantByOwner(idOwner);

        await axios.put(`/api/restaurants/${response[0].id}`, {
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
        await axios.put(`/api/users/${idOwner}`, {
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


export const createArticle = async (name, description, price, restaurantId, menuId) => {
    try {
        await axios.post(`/api/articles/`, {
            name,
            description,
            price,
            restaurantId,
            menuId
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

export const createArticleNoMenu = async (name, description, price, restaurantId) => {
    try {
        await axios.post(`/api/articles/`, {
            name,
            description,
            price,
            restaurantId
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

export const createMenu = async (name, description, price, restaurantId) => {
    try {
        await axios.post(`/api/menus/`, {
            name,
            description,
            price,
            restaurantId,
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

export const getAllMenuRestoById = async (restaurantId) => {
    try {
        const response = await axios.get(`/api/menus/restaurant/${restaurantId}`,{
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

export const getAllArticleRestoById = async (restaurantId) => {
    try {
        const response = await axios.get(`/api/articles/restaurant/${restaurantId}`,{
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

export const getArticleById = async (article_id) => {
    try {
        const response = await axios.get(`/api/articles/${article_id}`,{
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

export const getMenuById = async (menu_id) => {
    try {
        const response = await axios.get(`/api/menus/${menu_id}`,{
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

export const postImgArticle = async (name, file) => {
    try {
        await axios.post(`/api/menus/`, {
            name,
            file
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


export const DeleteArticle = async (id) => {
    try {
        await axios.delete(`/api/articles/${id}`,{
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

export const DeleteMenu = async (id) => {
    try {
        await axios.delete(`/api/menus/${id}`,{
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

export const createOrder = async (clientId, restaurantId) => {
    try {
        const response = await axios.post(`/api/orders/`, {
            clientId,
            restaurantId
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
}

export const getOrderById = async (Id) => {
    try {
        const response = await axios.get(`/api/orders//${Id}`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }
}

export const getAllOrder = async () => {
    try {
        const response = await axios.get(`/api/orders/`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }
}

export const getOrderByClientId = async (clientId) => {
    try {
        const response = await axios.get(`/api/orders/ByClient/${clientId}`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }
}

export const getOrderByRestoId = async (RestoId) => {
    try {
        const response = await axios.get(`/api/orders/ByRestaurant/${RestoId}`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }
}

export const getOrderByLivreurId = async (LivreurId) => {
    try {
        const response = await axios.get(`/api/orders/ByDeliverer/${LivreurId}`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }
}

export const updateOrderStatus = async (orderId, status) => {
    try {
        await axios.patch(`/api/orders/${orderId}/status`,{
            status
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
    }
    catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }
}

export const updateOrderForPaiement = async (orderId, price, status, totalAmount) => {
    try {
        await axios.put(`/api/orders/${orderId}`,{
            price,
            status,
            totalAmount
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
    }
    catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }
}

export const updateOrderForLivreur = async (orderId, status, delivererId) => {
    try {
        await axios.put(`/api/orders/${orderId}`,{
            status,
            delivererId
        }, {
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
    }
    catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }
}

export const addArticleOrder = async (orderId, articleId) => {
    try {
        const response = await axios.post(`/api/orderItems/`, {
            orderId,
            articleId
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
}

export const addMenuOrder = async (orderId, menuId) => {
    try {
        const response = await axios.post(`/api/orderItems/`, {
            orderId,
            menuId
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
}

export const getOrderItemsByIdOrder = async (order_id) => {
    try {
        const response = await axios.get(`/api/orderItems/${order_id}`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }
}

export const DeleteOrderItemById = async (idOrderItem) => {
    try {
        await axios.delete(`/api/orderItems/${idOrderItem}`,{
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

export const getNotification = async (userId) => {
    try {
        const response = await axios.get(`/api/notifications/user/${userId}`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }
}



export const getNotificationLivreur = async () => {
    try {
        const response = await axios.get(`/api/notifications/livreur`,{
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${localStorage.getItem('accessToken')}`
            }
        });
        return response.data;
    }
    catch (error) {
        console.error("Erreur lors de la connexion :", error);
        throw error;
    }
}


export const addNotification = async (userId, message) => {
    try {
         const response = await axios.post(`/api/notifications/`, {
            userId,
            message
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
}

export const addNotificationLivreur = async (userId, livreur, message) => {
    try {
        await axios.post(`/api/notifications/`, {
            userId,
            livreur,
            message
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
}

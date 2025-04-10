import React, {useEffect, useState} from "react";
import {getNotification} from "../api/api.jsx";

function Notification() {

    const [items, setItems] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    useEffect(() => {
        const interval = setInterval(() => {
            const fetchNotifications = async () => {
                try {
                    const response = await getNotification(user.id);
                    const formattedItems = response.notifications?.map(item => ({
                        formattedDateTime: (item.createdAt.split('T')[0] + ' ' + item.createdAt.split('T')[1].split('.')[0]).slice(0, -1),
                        message: item.message
                    }));
                    console.log(formattedItems);
                    setItems(formattedItems);
                } catch (error) {
                    console.error("Erreur lors de la récupération des notifications :", error);
                }
            }
            fetchNotifications();
            // Appelez ici votre méthode
        }, 2000);

        // Nettoyage de l'intervalle lorsque le composant est démonté
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="notification">
            {items?.map(item => (
                <div key={item.id}>
                    <p className="notification-date">{item?.formattedDateTime}:</p>
                    <p className="notification-message">{item?.message}</p>
                </div>
            ))}
        </div>
    );
}

export default Notification;
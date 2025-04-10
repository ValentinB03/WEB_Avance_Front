import React, {useEffect, useState} from "react";
import {getNotificationByUserId} from "../api/api.jsx";


function Notification() {

    const [notifications, setNotifications] = useState([]);
    const userId = JSON.parse(localStorage.getItem('user')).id;

    useEffect(() => {
        const fetchNotifications = async () => {
            try {
                const response = await getNotificationByUserId(userId);
                setNotifications(response);
            } catch (error) {
                console.error("Erreur lors de la récupération des notifications :", error);
            }
        };
        fetchNotifications();
    }, [userId]);



    return (
        <div className="notification">
            {notifications.length > 0 ? (
                notifications.map((notification) => (
                    <div key={notification.id}>
                        <p className="notification-date">{notification.date}:</p>
                        <p className="notification-message">{notification.message}</p>
                    </div>
                ))
            ) : (
                <p>Aucune notification</p>
            )}
        </div>
    );
}

export default Notification;
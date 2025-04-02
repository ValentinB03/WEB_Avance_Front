import React, {useState} from "react";

function Notification() {

    const [items] = useState([
        { id: 1, date: '10/02/2025 15h20', message: 'message notification 1'},
        { id: 2, date: '10/02/2025 15h25', message: 'message notification 2'},
        { id: 3, date: '10/02/2025 15h30', message: 'message notification 3'}
    ]);

    return (
        <div className="notification">
            {items.map(item => (
                <div key={item.id}>
                    <p className="notification-date">{item.date}:</p>
                    <p className="notification-message">{item.message}</p>
                </div>
            ))}
        </div>
    );
}

export default Notification;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { IoNotifications } from "react-icons/io5";
import Notification from "../Notification/notification.jsx";
import '../notification/notification.css'

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleNotification = () => {
        setNotificationOpen(!notificationOpen);
    };

    return (
        <div className="Nav-bar">
            <div className="Nav-left">
                <Link to="/"><h1>CES'eat</h1></Link>
            </div>
            <div className="Nav-right">
                <Link to="/">Accueil</Link>
                <a href="/panier">Panier</a>
                <a href="/connexion">Se connecter</a>
                <IoNotifications className={"notification-button"} onClick={toggleNotification}/>
            </div>
            <button className="menu-button" onClick={toggleMenu}>
                Menu
            </button>
            {menuOpen && (
                <div className="dropdown-menu">
                    <Link to="/">Home</Link>
                    <a href="/panier">Panier</a>
                    <a href="/connexion">Se connecter</a>
                    <IoNotifications className={"notification-button"} onClick={toggleNotification}/>
                </div>
            )}
            {notificationOpen && (
                <div className="notification-popup">
                    <Notification />
                </div>
            )}
        </div>
    );
}

export default NavBar;
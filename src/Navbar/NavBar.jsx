import React, {useEffect, useState} from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';
import { IoNotifications } from "react-icons/io5";
import Notification from "../Notification/notification.jsx";
import '../notification/notification.css'
import { useNavigate } from "react-router-dom";

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [notificationOpen, setNotificationOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {                                                       // Récupérer l'utilisateur depuis le localStorage
        const storedUser = localStorage.getItem('user');                    // Vérifier si l'utilisateur est connecté
        if (storedUser != null) {                                                      // Si l'utilisateur est connecté
            try {
                const parsedUser = JSON.parse(storedUser); // Parse l'objet user
                setUser(parsedUser);
            } catch (error) {
                console.error("Erreur lors du parsing de l'objet user", error);
            }
        }
    }, []);


    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    const toggleNotification = () => {
        setNotificationOpen(!notificationOpen);
    };

    const logout = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        setUser(null);
        navigate("/");
    }

    return (
        <div className="Nav-bar">
            <div className="Nav-left">
                <Link to="/"><h1>CES'eat</h1></Link>
            </div>
            <div className="Nav-right">
                <Link to="/">Accueil</Link>
                <Link to="/panier">Panier</Link>
                {user ? (
                    <div className="user-menu">
                        {user.userType === 'restaurateur' && <Link to="/restaurant/profil-restaurant">Profil</Link>}
                        {user.userType === 'livreur' && <Link to="/livreur/profil-livreur">Profil</Link>}
                        {user.userType === 'client' && <Link to="/client/profil-client">Profil</Link>}
                        {user.userType === 'commercial' && <Link to="/service-commercial">Profil</Link>}
                        {user.userType === 'technique' && <Link to="/service-technique">Profil</Link>}
                        {user.userType === 'admin' && <Link to="/service-technique">Profil</Link>}
                        {user.userType === 'developpeur' && <Link to="/developpeur/profil-developpeur">Profil</Link>}

                        <a onClick={logout}>Se déconnecter</a>
                    </div>
                ) : (
                    <Link to="/connexion">Se connecter</Link>
                )}
                <IoNotifications className={"notification-button"} onClick={toggleNotification}/>
            </div>
            <button className="menu-button" onClick={toggleMenu}>
                Menu
            </button>
            {menuOpen && (
                <div className="dropdown-menu">
                    <Link to="/">Home</Link>
                    <Link to="/panier">Panier</Link>
                    {user ? (
                        <div className="user-menu">
                            {user.userType === 'restaurateur' && <Link to="/restaurant/profil-restaurant">Profil</Link>}
                            {user.userType === 'livreur' && <Link to="/livreur/profil-livreur">Profil</Link>}
                            {user.userType === 'client' && <Link to="/client/profil-client">Profil</Link>}
                            {user.userType === 'commercial' && <Link to="/service-commercial">Profil</Link>}
                            {user.userType === 'technique' && <Link to="/service-technique">Profil</Link>}
                            {user.userType === 'admin' && <Link to="/service-technique">Profil</Link>}
                            {user.userType === 'developpeur' && <Link to="/developpeur/profil-developpeur">Profil</Link>}

                            <a onClick={logout}>Se déconnecter</a>
                        </div>
                    ) : (
                        <Link to="/connexion">Se connecter</Link>
                    )}
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
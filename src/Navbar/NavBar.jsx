import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './NavBar.css';

function NavBar() {
    const [menuOpen, setMenuOpen] = useState(false);

    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className="Nav-bar">
            <div className="Nav-left">
                <h1>CES'eat</h1>
            </div>
            <div className="Nav-right">
                <Link to="/">Home</Link>
                <a href="#about">About</a>
                <a href="/panier">Panier</a>
                <a href="/connexion">Se connecter</a>
            </div>
            <button className="menu-button" onClick={toggleMenu}>
                Menu
            </button>
            {menuOpen && (
                <div className="dropdown-menu">
                    <Link to="/">Home</Link>
                    <a href="#about">About</a>
                    <a href="/panier">Panier</a>
                    <a href="/connexion">Se connecter</a>
                </div>
            )}
        </div>
    );
}

export default NavBar;
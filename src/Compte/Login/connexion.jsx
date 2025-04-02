import React from 'react';
import './connexion.css';
import NavBar from '../../Navbar/NavBar.jsx';
import Footer from '../../Footer/Footer.jsx';
import Marbre from '../../assets/img/marbre.jpg'

function Inscription() {


    return (
        <div className="App">
            <NavBar />
            <img src={Marbre} alt="Background" className="background-image-connexion" />

            <h1 className="titre-connexion">Se connecter</h1>
                <div className={"liste-info"}>
                    <form>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Votre email" required />
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" id="password" name="password" placeholder="Votre mot de passe" required />
                        <button className={"connexion-button"}>Se connecter</button>
                        <a href={"/inscription"}>S'inscrire</a>
                    </form>
                </div>
            <Footer />
        </div>
    );
}

export default Inscription;
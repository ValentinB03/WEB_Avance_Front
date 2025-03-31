import React from 'react';
import './inscription.css';
import NavBar from '../../Navbar/NavBar.jsx';
import Footer from '../../Footer/Footer.jsx';
import Marbre from '../../assets/img/marbre.jpg'

function Inscription() {


    return (
        <div className="App">
            <NavBar />
            <h1 className="titre-inscription">S'inscrire</h1>
            <div className="content-inscription">
                <img src={Marbre} alt="Background" className="background-image-inscription" />
            </div>
                <div className={"liste-info"}>
                    <form>
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" placeholder="Votre email" required />
                        <label htmlFor="password">Mot de passe</label>
                        <input type="password" id="password" name="password" placeholder="Votre mot de passe" required />
                        <label htmlFor="adresse">Adresse</label>
                        <input type="adresse" id="adresse" name="adresse" placeholder="Votre adresse" required />
                        <label htmlFor="ville-codepostal">Ville, code postal</label>
                        <input type="ville-codepostal" id="ville-codepostal" name="ville-codepostal" placeholder="Votre ville, code postal" required />
                        <label htmlFor="statut">Statut</label>
                        <select id="statut" name="statut" required>
                            <option value="">Sélectionnez un statut</option>
                            <option value="client">Client</option>
                            <option value="livreur">Livreur</option>
                            <option value="restaurant">Restaurant</option>
                        </select>
                        <label htmlFor="code-parrainage">Code de parrainage</label>
                        <input type="code-parrainage" id="code-parrainage" name="code-parrainage" placeholder="Code de parrainage" required />
                        <button className={"inscription-button"}>S'inscrire</button>
                    </form>
                </div>
            <Footer />
        </div>
    );
}

export default Inscription;
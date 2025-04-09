import React, {useState} from 'react';
import './profil-developpeur.css';
import NavBar from '../Navbar/NavBar.jsx';
import Footer from '../Footer/Footer.jsx';
import Developpeur from '../assets/img/humain.jpg'
import {DeleteUser, editEmailUser, editNameUser, editPasswordUser, getUser} from "../api/api.jsx";
import {useNavigate} from "react-router-dom";


function ProfilDeveloppeur() {

    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const navigate = useNavigate();

    const modifUserName = () => {
        const account_name = document.getElementById("account_name").value;
        editNameUser(user.id, account_name);
        getUser(user.id);
    }
    const modifUserPassword = () => {
        const password = document.getElementById("password").value;
        editPasswordUser(user.id, password);
        getUser(user.id);
    }
    const modifUserEmail = () => {
        const email_address = document.getElementById("email_address").value;
        editEmailUser(user.id, email_address);
        getUser(user.id);
    }

    const deleteProfil = () => {
        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.");
        if (confirmation) {
            // Appel à la fonction pour supprimer le profil
            // deleteUser(user.id);
            DeleteUser(user.id);
            alert("Votre compte a été supprimé avec succès.");
            navigate('/');
        }
    }

    const [items_profil_developpeur] = useState([
        { email_address: user.email, account_name: user.name},
    ]);

    return (
        <div className="App">
            <NavBar />


            <img src={Developpeur} alt="Background" className="background-image-profil_developpeur" />


            <h1 className="titre-profil_developpeur">Profil développeur</h1>

            <div className="form-developpeur">
                <div className="container_top">
                    <div className={"modifier-profil_developpeur"}>
                            <h2 className="titre-modifier_profil_developpeur">Modifier profil</h2>
                            <label htmlFor="email">Email</label>
                            <div className="modifier_email">
                                <input className={"input-modif-profil-dev"} type="email" id="email_address" name="email_address" placeholder={items_profil_developpeur[0].email_address} required />
                                <button className={"save-button"} onClick={modifUserEmail}>Enregistrer</button>
                            </div>


                            <label htmlFor="password">Mot de passe</label>
                            <div className="modifier-password">
                                <input className={"input-modif-profil-dev"} type="password" id="password" name="password" placeholder="xxxxxxxxxxx" required />
                                <button className={"save-button"} onClick={modifUserPassword}>Enregistrer</button>
                            </div>


                            <label htmlFor="email">Nom d'utilisateur</label>
                            <div className="modifier-account_name">
                                <input className={"input-modif-profil-dev"} type="nom.prenom" id="account_name" name="account_name" placeholder={items_profil_developpeur[0].account_name} required />
                                <button className={"save-button"} onClick={modifUserName}>Enregistrer</button>
                            </div>
                    </div>


                    <div className="supprimer-profil_developpeur">
                            <h2 className="titre-supprimer_profil_developpeur">Supprimer profil</h2>
                            <button className={"delete-button"} onClick={deleteProfil}>Supprimer</button>
                    </div>
                </div>

                <div className="container-consulter_composants">
                    <h2>Consulter les composants disponibles</h2>
                    <div className="grid-composants">
                        <div className="composant-service_paiement">
                            <div className="composant-box_1"><h4>Composant : Service de paiement</h4></div>
                            <button className="consulter-button">Consulter</button>
                        </div>
                        <div className="composant-liste_restaurants">
                            <div className="composant-box_2"><h4>Composant : Liste des restaurants</h4></div>
                            <button className="consulter-button">Consulter</button>
                        </div>
                        <div className="composant-suivi_livraison">
                            <div className="composant-box_3"> <h4>Composant : Suivi de livraison</h4></div>
                            <button className="consulter-button">Consulter</button>
                        </div>
                    </div>
                </div>
            </div>


            <Footer />
        </div>
    );
}

export default ProfilDeveloppeur;
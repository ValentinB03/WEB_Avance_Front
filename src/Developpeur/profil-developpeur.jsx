import React, {useState} from 'react';
import './profil-developpeur.css';
import NavBar from '../Navbar/NavBar.jsx';
import Footer from '../Footer/Footer.jsx';
import Developpeur from '../assets/img/developpeur.jpg'


function ProfilDeveloppeur() {

    const [items_profil_developpeur] = useState([
        { email_address: "quentinc92@exemple.com", account_name: "quentin.c"},
    ]);

    return (
        <div className="App">
            <NavBar />


            <img src={Developpeur} alt="Background" className="background-image-profil_developpeur" />


            <h1 className="titre-profil_developpeur">Profil développeur</h1>

            <form>
                <div className="container_top">
                    <div className={"modifier-profil_developpeur"}>
                            <h2 className="titre-modifier_profil_developpeur">Modifier profil</h2>
                            <label htmlFor="email">Email</label>
                            <div className="modifier_email">
                                <input type="email" id="email_address" name="email_address" placeholder={items_profil_developpeur[0].email_address} required />
                                <button className={"save-button"}>Enregistrer</button>
                            </div>


                            <label htmlFor="password">Mot de passe</label>
                            <div className="modifier-password">
                                <input type="password" id="password" name="password" placeholder="xxxxxxxxxxx" required />
                                <button className={"save-button"}>Enregistrer</button>
                            </div>


                            <label htmlFor="email">Nom d'utilisateur</label>
                            <div className="modifier-account_name">
                                <input type="nom.prenom" id="account_name" name="account_name" placeholder={items_profil_developpeur[0].account_name} required />
                                <button className={"save-button"}>Enregistrer</button>
                            </div>
                    </div>


                    <div className="supprimer-profil_developpeur">
                            <h2 className="titre-modifier_profil_developpeur">Supprimer profil</h2>
                            <button className={"delete-button"}>Supprimer</button>
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
            </form>


            <Footer />
        </div>
    );
}

export default ProfilDeveloppeur;
import React, {useState} from 'react';
import './profil-livreur.css';
import NavBar from '../../Navbar/NavBar.jsx';
import Footer from '../../Footer/Footer.jsx';
import Livreur from '../../assets/livraison-resto.jpg'


function ProfilLivreur() {

    const [items_profil_livreur] = useState([
        { email_address: "emmanuel@exemple.com", account_name: "emmanuel.jid94", adresse_postale: "123 Rue de la liberté,94000 Créteil", iban: "FR7612345678901234567890321"},
    ]);
    const [items_profil_livreur_parrainage] = useState([
        {code_parrainage: "ADL-41D-8E4B"},
    ]);
    const [items_profil_livreur_commande_en_cours] = useState([
        {id:1, id_commande: "340003015", date_commande: "2023-10-01", statut_commande: "En cours de livraison", restaurant: "Bella Pizza", client_address: "123 avenue de la paix, 75013 Paris",prix_commande: "15.00€", client_name: "Jean Dupont", client_phone: "0606060606"},
        {id:2, id_commande: "340003016", date_commande: "2023-10-02", statut_commande: "En cours de préparation", restaurant: "Big Bite Burger", client_address: "45 avenue du Général de Gaule, 92320 Chatillon", prix_commande: "20.00€", client_name: "Marie Curie", client_phone: "0707070707"},
        {id:3, id_commande: "340003017", date_commande: "2023-10-03", statut_commande: "Annulée", restaurant: "Sakura Sushi", client_address: "67 boulevard du massacre, 93300 Aubervilliers", prix_commande: "25.00€", client_name: "Albert Einstein", client_phone: "0808080808"},
    ]);
    const [items_profil_livreur_historique_commandes] = useState([
        {id:1, id_commande: "340003015", date_commande: "2023-10-01", statut_commande: "En cours", restaurant: "Bella Pizza", gain_livraison: "1.20€", client_name:"Edouard Manet"},
        {id:2, id_commande: "340003016", date_commande: "2023-10-02", statut_commande: "Livrée", restaurant: "Big Bite Burger", gain_livraison: "1.24€", client_name:"Claude Monet"},
        {id:3, id_commande: "340003017", date_commande: "2023-10-03", statut_commande: "Annulée", restaurant: "Sakura Sushi", gain_livraison: "1.16€", client_name:"Henri Matisse"},
        {id:4, id_commande: "340003018", date_commande: "2023-10-04", statut_commande: "En cours", restaurant: "Sakura Sushi", gain_livraison: "0.94€", client_name:"Edgar Degas"},
        {id:5, id_commande: "340003019", date_commande: "2023-10-05", statut_commande: "Livrée", restaurant: "Pasta Fresca", gain_livraison: "1.45€", client_name:"Paul Cézanne"},
        {id:6, id_commande: "340003020", date_commande: "2023-10-06", statut_commande: "Annulée", restaurant: "Bella Pizza", gain_livraison: "1.13€", client_name:"Georges Braque"},
        {id:7, id_commande: "340003021", date_commande: "2023-10-07", statut_commande: "En cours", restaurant: "Big Bite Burger", gain_livraison: "2.34€", client_name:"Pablo Picasso"},
        {id:8, id_commande: "340003022", date_commande: "2023-10-08", statut_commande: "Livrée", restaurant: "Sakura Sushi", gain_livraison: "1.53€", client_name:"Henri Rousseau"},
        {id:9, id_commande: "340003023", date_commande: "2023-10-09", statut_commande: "Annulée", restaurant: "Pasta Fresca", gain_livraison: "1.43€", client_name:"Giorgio de Chirico"},
    ]);

    return (
        <div className="App">
            <NavBar />


            <img src={Livreur} alt="Background" className="background-image-profil_livreur" />


            <h1 className="titre-profil_livreur">Mon profil</h1>


            <form className="form-profil_livreur">
                <div className="container_top-profil_livreur">
                    <div className={"modifier-profil_livreur"}>
                        <h2 className="titre-modifier_profil_livreur">Modifier profil</h2>
                        <label htmlFor="email_livreur">Email</label>
                        <div className="modifier_email_livreur">
                            <input type="email" id="email_address" name="email_address" placeholder={items_profil_livreur[0].email_address} required />
                            <button className={"save-button_profil_livreur"}>Enregistrer</button>
                        </div>


                        <label htmlFor="password">Mot de passe</label>
                        <div className="modifier-password_profil_livreur">
                            <input type="password" id="password" name="password" placeholder="xxxxxxxxxxx" required />
                            <button className={"save-button_profil_livreur"}>Enregistrer</button>
                        </div>


                        <label htmlFor="email">Nom d'utilisateur</label>
                        <div className="modifier-account_name_profil_livreur">
                            <input type="nom.prenom" id="account_name_livreur" name="account_name_livreur" placeholder={items_profil_livreur[0].account_name} required />
                            <button className={"save-button_profil_livreur"}>Enregistrer</button>
                        </div>

                        <label htmlFor="Adresse">Adresse postale</label>
                        <div className="modifier-adresse_postale_profil_livreur">
                            <input type="adresse" id="postal_address_livreur" name="postal_address_livreur" placeholder={items_profil_livreur[0].adresse_postale} required />
                            <button className={"save-button_profil_livreur"}>Enregistrer</button>
                        </div>
                        <label htmlFor="Adresse">IBAN</label>
                        <div className="modifier-iban_profil_livreur">
                            <input type="iban" id="iban_livreur" name="iban_livreur" placeholder={items_profil_livreur[0].iban} required />
                            <button className={"save-button_profil_livreur"}>Enregistrer</button>
                        </div>
                    </div>

                    <div className="container_top_right-profil_livreur">
                        <div className="parrainage-profil_livreur">
                            <h2 className="titre-parrainage_profil_livreur">Parrainage</h2>
                            <p className="code_parrainage_livreur">Mon code : {items_profil_livreur_parrainage[0].code_parrainage} </p>
                        </div>
                        <div className="supprimer-profil_livreur">
                            <h2 className="titre-supprimer_profil_livreur">Supprimer profil</h2>
                            <button className={"delete-button_profil_livreur"}>Supprimer</button>
                        </div>
                        <div className="commencer_livraison-profil_livreur">
                            <h2 className="titre-supprimer_profil_livreur">Début de service</h2>
                            <button className="commencer_livraison-button_profil_livreur">Voir les commandes disponibles</button>
                        </div>

                    </div>
                </div>


                <div className="container-profil_livreur-commande_en_cours">
                    <h2 className="titre-profil_livreur-commande_en_cours">Commande en cours</h2>
                    <div className="tableau-profil_livreur-commande_en_cours">
                        <div className="content-profil_livreur-commande_en_cours">
                            {items_profil_livreur_commande_en_cours.map(items_profil_livreur_commande_en_cours => (
                            <div key={items_profil_livreur_commande_en_cours.id} className="liste-profil_livreur-commande_en_cours">
                                <div className="liste_commandes-profil_livreur">
                                    <p><b>Commande N°</b> {items_profil_livreur_commande_en_cours.id_commande}</p>
                                    <p><b>Date : </b>{items_profil_livreur_commande_en_cours.date_commande}</p>
                                    <p><b>Etat de la commande </b>{items_profil_livreur_commande_en_cours.statut_commande} </p>
                                    <p><b>Restaurant : </b>{items_profil_livreur_commande_en_cours.restaurant}</p>
                                    <p><b>Nom client : </b>{items_profil_livreur_commande_en_cours.client_name}</p>
                                    <p><b>Adresse de livraison : </b>{items_profil_livreur_commande_en_cours.client_address}</p>
                                    <p><b>Numéro téléphone client : </b>{items_profil_livreur_commande_en_cours.client_phone}</p>
                                </div>
                                    <button className="visualiser_button-profil_livreur-commande_en_cours">Visualiser</button>
                            </div>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="container-profil_livreur-historique_commandes">
                    <h2 className="titre-profil_livreur-historique_commandes">Historique des commandes</h2>
                    <div className="tableau-profil_livreur-historique_commandes">
                        <div className="content-profil_livreur-historique_commandes">
                            <div className="content-profil_livreur-historique_commandes-header">
                                <div className={"profil_livreur-case-tableau"}>Nom du restaurant</div>
                                <div  className={"profil_livreur-case-tableau"}>N° de commande</div>
                                <div className={"profil_livreur-case-tableau"}>Etat de la commande</div>
                                <div className={"profil_livreur-case-tableau"}>Client</div>
                                <div className={"profil_livreur-case-tableau"}>Gain de la livraison</div>
                            </div>
                            {items_profil_livreur_historique_commandes.map(items_profil_livreur_historique_commandes => (
                                <div key={items_profil_livreur_historique_commandes.id} className="content-profil_livreur-historique_commandes-line">
                                    <p className={"profil_livreur-case-tableau"}>{items_profil_livreur_historique_commandes.restaurant}</p>
                                    <p className={"profil_livreur-case-tableau"}>{items_profil_livreur_historique_commandes.id_commande}</p>
                                    <p className={"profil_livreur-case-tableau"}>{items_profil_livreur_historique_commandes.statut_commande}</p>
                                    <p className={"profil_livreur-case-tableau"}>{items_profil_livreur_historique_commandes.client_name}</p>
                                    <p className={"profil_livreur-case-tableau"}>{items_profil_livreur_historique_commandes.gain_livraison}</p>
                                </div>
                            ))}
                        </div>
                    </div>`
                </div>
            </form>
            <Footer />
        </div>
    );
}

export default ProfilLivreur;
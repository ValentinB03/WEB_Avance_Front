import React, {useState} from 'react';
import './profil-client.css';
import NavBar from '../Navbar/NavBar.jsx';
import Footer from '../Footer/Footer.jsx';
import Client from '../assets/img/humain.jpg'


function ProfilClient() {

    const [items_profil_client] = useState([
        { email_address: "quentinc92@exemple.com", account_name: "quentin.c"},
    ]);
    const [items_profil_client_parrainage] = useState([
            {code_parrainage: "QUENTIN92"},
    ]);
    const [items_profil_client_commandes_en_cours] = useState([
        {id_commande: "340003015", restaurant: "Big Bite Burger", date_commande: "2023-10-01", statut_commande: "En cours", livreur: "Jean Dupont", prix_total: "15.00€"},
    ]);
    const [items_profil_client_historique_commandes] = useState([
        {id:1, id_commande: "340003015", restaurant: "Big Bite Burger", date_commande: "2023-10-01", statut_commande: "En cours", livreur: "Jean Dupont", prix_total: "15.00€"},
        {id:2, id_commande: "340003016", restaurant: "Bella Pizza", date_commande: "2023-10-02", statut_commande: "Livrée", livreur: "Marie Dupont", prix_total: "20.00€"},
        {id:3, id_commande: "340003017", restaurant: "Sakura Sushi", date_commande: "2023-10-03", statut_commande: "Annulée", livreur: "Paul Dupont", prix_total: "25.00€"},
        {id:4, id_commande: "340003018", restaurant: "Pasta Fresca", date_commande: "2023-10-04", statut_commande: "En cours", livreur: "Luc Dupont", prix_total: "30.00€"},
        {id:5, id_commande: "340003019", restaurant: "Big Bite Burger", date_commande: "2023-10-05", statut_commande: "Livrée", livreur: "Sophie Dupont", prix_total: "35.00€"},
        {id:6, id_commande: "340003020", restaurant: "Bella Pizza", date_commande: "2023-10-06", statut_commande: "Annulée", livreur: "Julien Dupont", prix_total: "40.00€"},
        {id:7, id_commande: "340003021", restaurant: "Sakura Sushi", date_commande: "2023-10-07", statut_commande: "En cours", livreur: "Claire Dupont", prix_total: "45.00€"},
        {id:8, id_commande: "340003022", restaurant: "Pasta Fresca", date_commande: "2023-10-08", statut_commande: "Livrée", livreur: "Thomas Dupont", prix_total: "50.00€"},
        {id:9, id_commande: "340003023", restaurant: "Big Bite Burger", date_commande: "2023-10-09", statut_commande: "Annulée", livreur: "Emma Dupont", prix_total: "55.00€"},
    ]);

    return (
        <div className="App">
            <NavBar />


            <img src={Client} alt="Background" className="background-image-profil_client" />


            <h1 className="titre-profil_client">Mon profil</h1>

            <form className="form-profil_client">
                <div className="container_top-profil_client">
                    <div className={"modifier-profil_client"}>
                        <h2 className="titre-modifier_profil_client">Modifier profil</h2>
                        <label htmlFor="email_client">Email</label>
                        <div className="modifier_email_client">
                            <input type="email" id="email_address" name="email_address" placeholder={items_profil_client[0].email_address} required />
                            <button className={"save-button_profil_client"}>Enregistrer</button>
                        </div>


                        <label htmlFor="password">Mot de passe</label>
                        <div className="modifier-password_profil_client">
                            <input type="password" id="password" name="password" placeholder="xxxxxxxxxxx" required />
                            <button className={"save-button_profil_client"}>Enregistrer</button>
                        </div>


                        <label htmlFor="email">Nom d'utilisateur</label>
                        <div className="modifier-account_name_profil_client">
                            <input type="nom.prenom" id="account_name" name="account_name" placeholder={items_profil_client[0].account_name} required />
                            <button className={"save-button_profil_client"}>Enregistrer</button>
                        </div>
                    </div>

                    <div className="container_top_right-profil_client">
                        <div className="parrainage-profil_client">
                            <h2 className="titre-parrainage_profil_client">Parrainage</h2>
                            <p>Mon code : {items_profil_client_parrainage[0].code_parrainage} </p>
                        </div>
                        <div className="supprimer-profil_client">
                            <h2 className="titre-supprimer_profil_client">Supprimer profil</h2>
                            <button className={"delete-button_profil_client"}>Supprimer</button>
                        </div>
                    </div>
                </div>


                <div className="container-profil_client-commandes_en_cours">
                    <h2 className="titre-profil_client-commande_en_cours">Commande en cours</h2>
                    <p><b>Commande N° </b>{items_profil_client_commandes_en_cours[0].id_commande} <br></br><br></br></p>
                    <p><b>Livreur :</b>  {items_profil_client_commandes_en_cours[0].livreur} </p>
                    <p><b>Date :</b>  {items_profil_client_commandes_en_cours[0].date_commande} </p>
                    <p><b>Statut commande :</b>  {items_profil_client_commandes_en_cours[0].statut_commande} </p>
                    <p><b>Nom du restaurant :</b>  {items_profil_client_commandes_en_cours[0].restaurant} </p>
                    <p><b>Prix :</b>  {items_profil_client_commandes_en_cours[0].prix_total} </p>

                    <div className="container_maps-profil_client">
                        <iframe
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.9999999999995!2d2.3522213156749424!3d48.85661407928792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fdfb7e8c9b7%3A0x40a8e9c7e8e8c9b7!2sBig%20Bite%20Burger%20Restaurant!5e0!3m2!1sfr!2sfr!4v1616161616161"
                            allowFullScreen=""
                            loading="lazy"
                        ></iframe>
                    </div>

                </div>



                <div className="container-profil_client-historique_commandes">
                    <h2 className="titre-profil_client-historique_commandes">Historique des commandes</h2>

                    <div className="tableau-profil_client-historique_commandes">
                        <div className="content-profil_client-historique_commandes">
                            <div className="content-profil_client-historique_commandes-header">
                                <p className={"profil_client-id-tableau"}>N°</p>
                                <p className={"profil_client-case-tableau"}>Nom du restaurant</p>
                                <p className={"profil_client-case-tableau"}>N° Commande</p>
                                <p className={"profil_client-case-tableau"}>Etat de la commande</p>
                                <p className={"profil_client-case-tableau"}>Date</p>
                                <p className={"profil_client-case-tableau"}>Prix de la commande</p>
                                <p className={"profil_client-case-tableau"}>Livreur</p>
                            </div>
                            {items_profil_client_historique_commandes.map(items_profil_client_historique_commandes => (
                                <div key={items_profil_client_historique_commandes.id} className="content-profil_client-historique_commandes-line">
                                    <p className={"profil_client-id-tableau"}>{items_profil_client_historique_commandes.id}</p>
                                    <p className={"profil_client-case-tableau"}>{items_profil_client_historique_commandes.restaurant}</p>
                                    <p className={"profil_client-case-tableau"}>{items_profil_client_historique_commandes.id_commande}</p>
                                    <p className={"profil_client-case-tableau"}>{items_profil_client_historique_commandes.statut_commande}</p>
                                    <p className={"profil_client-case-tableau"}>{items_profil_client_historique_commandes.date_commande}</p>
                                    <p className={"profil_client-case-tableau"}>{items_profil_client_historique_commandes.prix_total}</p>
                                    <p className={"profil_client-case-tableau"}>{items_profil_client_historique_commandes.livreur}</p>
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

export default ProfilClient;
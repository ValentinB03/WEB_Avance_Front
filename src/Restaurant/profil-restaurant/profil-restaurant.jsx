import React, {useEffect, useState} from 'react';
import './profil-restaurant.css';
import NavBar from '../../Navbar/NavBar.jsx';
import Footer from '../../Footer/Footer.jsx';
import {
    DeleteResto,
    editAddressResto, editEmailResto,
    editIbanResto,
    editNameResto,
    editPasswordResto,
    getBanniereByOwner, getRestaurantByOwner,
    getUser
} from "../../api/api.jsx";
import {useNavigate} from "react-router-dom";


function ProfilRestaurant() {

    const [banniere, setBanniere] = useState('');
    const [resto, setResto] = useState('');
    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const navigate = useNavigate();

    useEffect(() => {
        const fetchRestaurant = async () => {
            const restaurantData = await getBanniereByOwner(user.id);
            setBanniere(restaurantData.data);
            const restaurantData2 = await getRestaurantByOwner(user.id);
            console.log(restaurantData2[0].id);
            setResto(restaurantData2[0]);
        };
        fetchRestaurant();
    }, []); // Le tableau de dépendances vide empêche l'exécution multiple


    const [items_profil_restaurant] = useState([
        { email_address: user.email, account_name: user.name, adresse_postale: user.addressString, iban: user.IBAN},
    ]);
    const [items_profil_restaurant_parrainage] = useState([
        {code_parrainage: user.referralCode},
    ]);
    const [items_profil_restaurant_historique_commandes] = useState([
        {id:1, id_commande: "340003015", date_commande: "2023-10-01", statut_commande: "En cours", account_name_client: "Brice.Dupont",prix_commande: "15.00€", account_name_livreur: "Colin.Richard"},
        {id:2, id_commande: "340003016", date_commande: "2023-10-02", statut_commande: "Livrée", account_name_client: "Maelig.Dupont", prix_commande: "20.00€", account_name_livreur: "Hugo.Richard"},
        {id:3, id_commande: "340003017", date_commande: "2023-10-03", statut_commande: "Annulée", account_name_client: "Pauline.Dupont", prix_commande: "25.00€", account_name_livreur: "David.Richard"},
        {id:4, id_commande: "340003018", date_commande: "2023-10-04", statut_commande: "En cours", account_name_client: "Béatrice.Dupont", prix_commande: "30.00€", account_name_livreur: "Maxime.Richard"},
        {id:5, id_commande: "340003019", date_commande: "2023-10-05", statut_commande: "Livrée", account_name_client: "DJ.Dupont", prix_commande: "35.00€", account_name_livreur: "Quentin.Richard"},
        {id:6, id_commande: "340003020", date_commande: "2023-10-06", statut_commande: "Annulée", account_name_client: "Anne-Laure.Dupont", prix_commande: "40.00€", account_name_livreur: "Mathieu.Richard"},
        {id:7, id_commande: "340003021", date_commande: "2023-10-07", statut_commande: "En cours", account_name_client: "Jeremy.Dupont", prix_commande: "45.00€", account_name_livreur: "Maxence.Richard"},
        {id:8, id_commande: "340003022", date_commande: "2023-10-08", statut_commande: "Livrée", account_name_client: "Axel.Dupont", prix_commande: "50.00€", account_name_livreur: "Nolan.Richard"},
        {id:9, id_commande: "340003023", date_commande: "2023-10-09", statut_commande: "Annulée", account_name_client: "Valentin.Dupont", prix_commande: "55.00€", account_name_livreur: "Ohonna.Richard"},
    ]);


    const editNameRestoAction = () => {
        const account_name = document.getElementById("account_name_restaurant").value;
        editNameResto(user.id, account_name);
        getUser(user.id);
    }
    const editPasswordRestoAction = () => {
        const password = document.getElementById("password").value;
        editPasswordResto(user.id, password);
        getUser(user.id);
    }
    const editAddressRestoAction = () => {
        const addressString = document.getElementById("postal_address_restaurant").value;
        console.log(addressString);
        editAddressResto(user.id, addressString);
        getUser(user.id);
    }
    const editEmailRestoAction = () => {
        const email_address = document.getElementById("email_address").value;
        editEmailResto(user.id, email_address);
        getUser(user.id);
    }
    const editIBANRestoAction = () => {
        const email_address = document.getElementById("iban_restaurant").value;
        editIbanResto(user.id, email_address);
        getUser(user.id);
    }

    const deleteResto = () => {
        const confirmation = window.confirm("Êtes-vous sûr de vouloir supprimer votre compte ? Cette action est irréversible.");
        if (confirmation) {
            // Appel à la fonction pour supprimer le profil
            // deleteUser(user.id);
            DeleteResto(user.id);
            alert("Votre compte a été supprimé avec succès.");
            navigate('/');
        }
    }

    const navigateToModifCarte = () => {
        navigate(`/restaurant/modification-menu/${resto.id}`);
    }

    const navigateToGestionCommande = () => {
        navigate(`/restaurant/commande`);
    }

    return (
        <div className="App">
            <NavBar />


            <img src={banniere || null} alt="Background" className="background-image-profil_restaurant" />


            <h1 className="titre-profil_restaurant">{items_profil_restaurant[0].account_name}</h1>

            <div className="form-profil_restaurant">
                <div className="container_top-profil_restaurant">
                    <div className={"modifier-profil_restaurant"}>
                        <h2 className="titre-modifier_profil_restaurant">Modifier profil</h2>
                        <label htmlFor="email_restaurant">Email</label>
                        <div className="modifier_email_restaurant">
                            <input className={"input-modif-profil-resto"} type="email" id="email_address" name="email_address" placeholder={items_profil_restaurant[0].email_address} required />
                            <button className={"save-button_profil_restaurant"} onClick={editEmailRestoAction}>Enregistrer</button>
                        </div>


                        <label htmlFor="password">Mot de passe</label>
                        <div className="modifier-password_profil_restaurant">
                            <input className={"input-modif-profil-resto"} type="password" id="password" name="password" placeholder="xxxxxxxxxxx" required />
                            <button className={"save-button_profil_restaurant"} onClick={editPasswordRestoAction}>Enregistrer</button>
                        </div>


                        <label htmlFor="email">Nom d'utilisateur</label>
                        <div className="modifier-account_name_profil_restaurant">
                            <input className={"input-modif-profil-resto"} type="nom.prenom" id="account_name_restaurant" name="account_name_restaurant" placeholder={items_profil_restaurant[0].account_name} required />
                            <button className={"save-button_profil_restaurant"} onClick={editNameRestoAction}>Enregistrer</button>
                        </div>

                        <label htmlFor="Adresse">Adresse postale</label>
                        <div className="modifier-adresse_postale_profil_restaurant">
                            <input className={"input-modif-profil-resto"} type="adresse" id="postal_address_restaurant" name="postal_address_restaurant" placeholder={items_profil_restaurant[0].adresse_postale} required />
                            <button className={"save-button_profil_restaurant"} onClick={editAddressRestoAction}>Enregistrer</button>
                        </div>
                        <label htmlFor="Adresse">IBAN</label>
                        <div className="modifier-iban_profil_restaurant">
                            <input className={"input-modif-profil-resto"} type="iban" id="iban_restaurant" name="iban_restaurant" placeholder={items_profil_restaurant[0].iban} required />
                            <button className={"save-button_profil_restaurant"} onClick={editIBANRestoAction}>Enregistrer</button>
                        </div>
                    </div>

                    <div className="container_top_right-profil_restaurant">
                        <div className="parrainage-profil_restaurant">
                            <h2 className="titre-parrainage_profil_restaurant">Parrainage</h2>
                            <p>Mon code : {items_profil_restaurant_parrainage[0].code_parrainage} </p>
                        </div>
                        <div className="supprimer-profil_restaurant">
                            <h2 className="titre-supprimer_profil_restaurant">Supprimer profil</h2>
                            <button className={"delete-button_profil_restaurant"} onClick={deleteResto}>Supprimer</button>
                        </div>
                    </div>
                </div>

                <div className="container-options_restaurant">
                    <button className={"option-button_profil_restaurant"} onClick={navigateToModifCarte}>Modifier la carte</button>
                        <button className={"option-button_profil_restaurant"} onClick={navigateToGestionCommande}>Gestion des commandes</button>
                        <button className={"option-button_profil_restaurant"}>Statistiques du restaurant</button>
                </div>



                <div className="container-profil_restaurant-historique_commandes">
                    <h2 className="titre-profil_restaurant-historique_commandes">Historique des commandes</h2>

                    <div className="tableau-profil_restaurant-historique_commandes">
                        <div className="content-profil_restaurant-historique_commandes">
                            <div className="content-profil_restaurant-historique_commandes-header">
                                <div className={"profil_restaurant-case-tableau"}>N° de commande</div>
                                <div  className={"profil_restaurant-case-tableau"}>Date</div>
                                <div className={"profil_restaurant-case-tableau"}>Etat de la commande</div>
                                <div className={"profil_restaurant-case-tableau"}>Client</div>
                                <div className={"profil_restaurant-case-tableau"}>Prix de la commande</div>
                                <div className={"profil_restaurant-case-tableau"}>Livreur</div>
                            </div>
                            {items_profil_restaurant_historique_commandes.map(items_profil_restaurant_historique_commandes => (
                                <div key={items_profil_restaurant_historique_commandes.id} className="content-profil_restaurant-historique_commandes-line">
                                    <p className={"profil_restaurant-case-tableau"}>{items_profil_restaurant_historique_commandes.id_commande}</p>
                                    <p className={"profil_restaurant-case-tableau"}>{items_profil_restaurant_historique_commandes.date_commande}</p>
                                    <p className={"profil_restaurant-case-tableau"}>{items_profil_restaurant_historique_commandes.statut_commande}</p>
                                    <p className={"profil_restaurant-case-tableau"}>{items_profil_restaurant_historique_commandes.account_name_client}</p>
                                    <p className={"profil_restaurant-case-tableau"}>{items_profil_restaurant_historique_commandes.prix_commande}</p>
                                    <p className={"profil_restaurant-case-tableau"}>{items_profil_restaurant_historique_commandes.account_name_livreur}</p>
                                </div>
                            ))}
                        </div>
                    </div>`
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default ProfilRestaurant;
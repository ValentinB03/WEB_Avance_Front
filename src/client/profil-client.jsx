import React, {useEffect, useState} from 'react';
import './profil-client.css';
import NavBar from '../Navbar/NavBar.jsx';
import Footer from '../Footer/Footer.jsx';
import Client from '../assets/img/humain.jpg'
import {
    DeleteUser,
    editAddressUser,
    editEmailUser,
    editNameUser,
    editPasswordUser,
    getAllOrder, getRestaurantById,
    getUser
} from "../api/api.jsx";
import {useNavigate} from "react-router-dom";


function ProfilClient() {

    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const navigate = useNavigate();
    const [order_en_cours, setOrder_en_cours] = useState([]);
    const [order_fini, setOrder_fini] = useState([]);

    useEffect(() => {
        const fetchtOrder_en_cours = async () => {
            try {
                const orders = await getAllOrder(); // Récupère toutes les commandes
                const ordersFilter = orders.filter((item) => item.status === 'En attente' || item.status === 'En cours de préparation' || item.status === 'Prête' || item.status === 'En livraison');
                const ordersWithUsers = await Promise.all(
                    ordersFilter.map(async (order) => {
                        const restaurantUser = await getRestaurantById(order.restaurantId); // Récupère les infos du restaurant
                        const clientUser = await getUser(order.clientId); // Récupère les infos du client
                        return {
                            ...order,
                            restaurantUser,
                            clientUser,
                        };
                    })
                );
                console.log("Order_en_cours :",ordersWithUsers);
                setOrder_en_cours(ordersWithUsers);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'utilisateur :", error);
            }
        }
        fetchtOrder_en_cours();

        const fetchtOrder_fini = async () => {
            try {
                const orders = await getAllOrder(); // Récupère toutes les commandes
                const ordersFilter = orders.filter((item) => item.status === 'Livrée' || item.status === 'Annulée');
                const ordersWithUsers = await Promise.all(
                    ordersFilter.map(async (order) => {
                        const restaurantUser = await getRestaurantById(order.restaurantId); // Récupère les infos du restaurant
                        const clientUser = await getUser(order.clientId); // Récupère les infos du client
                        return {
                            ...order,
                            restaurantUser,
                            clientUser,
                        };
                    })
                );
                console.log("Order_fini :",ordersWithUsers);
                setOrder_fini(ordersWithUsers);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'utilisateur :", error);
            }
        }
        fetchtOrder_fini();
    } , []);

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
    const modifUserAdress = () => {
        const addressString = document.getElementById("Adresse").value;
        editAddressUser(user.id, addressString);
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

    return (
        <div className="App">
            <NavBar />


            <img src={Client} alt="Background" className="background-image-profil_client" />


            <h1 className="titre-profil_client">Mon profil</h1>

            <div className="form-profil_client">
                <div className="container_top-profil_client">
                    <div className={"modifier-profil_client"}>
                        <h2 className="titre-modifier_profil_client">Modifier profil</h2>

                        <label htmlFor="email">Nom d'utilisateur</label>
                        <div className="modifier-account_name_profil_client">
                            <input className={"input-modif-profil-client"} type="nom.prenom" id="account_name" name="account_name" placeholder={user.name} required />
                            <button className={"save-button_profil_client"} onClick={modifUserName}>Enregistrer</button>
                        </div>

                        <label htmlFor="email_client">Email</label>
                        <div className="modifier_email_client">
                            <input className={"input-modif-profil-client"} type="email" id="email_address" name="email_address" placeholder={user.email} required />
                            <button className={"save-button_profil_client"} onClick={modifUserEmail}>Enregistrer</button>
                        </div>

                        <label htmlFor="password">Mot de passe</label>
                        <div className="modifier-password_profil_client">
                            <input className={"input-modif-profil-client"} type="password" id="password" name="password" placeholder="xxxxxxxxxxx" required />
                            <button className={"save-button_profil_client"} onClick={modifUserPassword}>Enregistrer</button>
                        </div>

                        <label htmlFor="Adresse">Adresse</label>
                        <div className="modifier-Adresse_profil_client">
                            <input className={"input-modif-profil-client"} type="Adresse" id="Adresse" name="Adresse" placeholder={user.addressString} required />
                            <button className={"save-button_profil_client"} onClick={modifUserAdress}>Enregistrer</button>
                        </div>

                    </div>

                    <div className="container_top_right-profil_client">
                        <div className="parrainage-profil_client">
                            <h2 className="titre-parrainage_profil_client">Parrainage</h2>
                            <p>Mon code : {user.referralCode} </p>
                        </div>
                        <div className="supprimer-profil_client">
                            <h2 className="titre-supprimer_profil_client">Supprimer profil</h2>
                            <button className={"delete-button_profil_client"} onClick={deleteProfil}>Supprimer</button>
                        </div>
                    </div>
                </div>

                {order_en_cours.map(order => (
                    <div className="container-profil_client-commandes_en_cours">
                        <h2 className="titre-profil_client-commande_en_cours">Commande en cours</h2>
                        <p className="profil_client-details_commande_en_cours_commande_numero"><b>Commande N° </b>{order.id}</p>
                        <p className="profil_client-details_commande_en_cours"><b>Date :</b>  {order.createdAt} </p>
                        <p className="profil_client-details_commande_en_cours"><b>Statut commande :</b>  {order.status} </p>
                        <p className="profil_client-details_commande_en_cours"><b>Nom du restaurant :</b>  {order.restaurantUser.name} </p>
                        <p className="profil_client-details_commande_en_cours"><b>Prix :</b>  {order.totalAmount}€ </p>
                    </div>
                ))}

                <div className="container-profil_client-historique_commandes">
                    <h2 className="titre-profil_client-historique_commandes">Historique des commandes</h2>

                    <div className="tableau-profil_client-historique_commandes">
                        <div className="content-profil_client-historique_commandes">
                            <div className="content-profil_client-historique_commandes-header">
                                <div  className={"profil_client-case-tableau"}>N° Commande</div>
                                <div className={"profil_client-case-tableau"}>Nom du restaurant</div>
                                <div className={"profil_client-case-tableau"}>Etat de la commande</div>
                                <div className={"profil_client-case-tableau"}>Date</div>
                                <div className={"profil_client-case-tableau"}>Prix de la commande</div>
                            </div>
                            {order_fini.map(order => (
                                <div key={order.id} className="content-profil_client-historique_commandes-line">
                                    <p className={"profil_client-case-tableau"}>{order.id}</p>
                                    <p className={"profil_client-case-tableau"}>{order.restaurantUser.name}</p>
                                    <p className={"profil_client-case-tableau"}>{order.status}</p>
                                    <p className={"profil_client-case-tableau"}>{order.createdAt}</p>
                                    <p className={"profil_client-case-tableau"}>{order.totalAmount}€</p>
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

export default ProfilClient;
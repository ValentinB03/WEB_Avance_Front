import React, {useEffect, useState} from 'react';
import './profil-livreur.css';
import NavBar from '../../Navbar/NavBar.jsx';
import Footer from '../../Footer/Footer.jsx';
import Livreur from '../../assets/livraison-resto.jpg'
import {
    addNotification,
    DeleteUser,
    editAddressUser,
    editEmailUser,
    editIbanUser,
    editNameUser,
    editPasswordUser, getAllOrder, getRestaurantById,
    getUser, updateOrderStatus
} from "../../api/api.jsx";
import {useNavigate} from "react-router-dom";


function ProfilLivreur() {

    const user = localStorage.getItem('user') ? JSON.parse(localStorage.getItem('user')) : null;
    const navigate = useNavigate();
    const [order_en_cours, setOrder_en_cours] = useState([]);
    const [order_fini, setOrder_fini] = useState([]);
    const [refresh, setRefresh] = useState(0);

    const modifLivreurName = () => {
        const account_name = document.getElementById("account_name_livreur").value;
        editNameUser(user.id, account_name);
        getUser(user.id);
    }
    const modifLivreurPassword = () => {
        const password = document.getElementById("password").value;
        editPasswordUser(user.id, password);
        getUser(user.id);
    }
    const modifLivreurAdress = () => {
        const addressString = document.getElementById("postal_address_livreur").value;
        editAddressUser(user.id, addressString);
        getUser(user.id);
    }
    const modifLivreurEmail = () => {
        const email_address = document.getElementById("email_address").value;
        editEmailUser(user.id, email_address);
        getUser(user.id);
    }
    const modifLivreurIban = () => {
        const iban = document.getElementById("iban_livreur").value;
        editIbanUser(user.id, iban);
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

    useEffect(() => {
        const fetchtOrder_en_cours = async () => {
            try {
                const orders = await getAllOrder(); // Récupère toutes les commandes
                const ordersFilter = orders.filter((item) => item.status === 'En livraison');
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
                const ordersFilter = orders.filter((item) => item.status === 'Livrée');
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
    } , [refresh]);


    const naviagteToCommandeDispo = () => {
        navigate('/livreur-commande');
    }

    const ModifStatus = (id, status, idclient, idresto) => {
        updateOrderStatus(id, status);
        addNotification(idclient, "Votre commande à été livrée");
        addNotification(idresto, "La commande à été livrée");
        setRefresh(refresh + 1);
    }

    return (
        <div className="App">
            <NavBar />


            <img src={Livreur} alt="Background" className="background-image-profil_livreur" />


            <h1 className="titre-profil_livreur">Mon profil</h1>


            <div className="form-profil_livreur">
                <div className="container_top-profil_livreur">
                    <div className={"modifier-profil_livreur"}>
                        <h2 className="titre-modifier_profil_livreur">Modifier profil</h2>
                        <label htmlFor="email_livreur">Email</label>
                        <div className="modifier_email_livreur">
                            <input className={"input-modif-profil-livreur"} type="email" id="email_address" name="email_address" placeholder={user.email} required />
                            <button className={"save-button_profil_livreur"} onClick={modifLivreurEmail}>Enregistrer</button>
                        </div>


                        <label htmlFor="password">Mot de passe</label>
                        <div className="modifier-password_profil_livreur">
                            <input className={"input-modif-profil-livreur"} type="password" id="password" name="password" placeholder="xxxxxxxxxxx" required />
                            <button className={"save-button_profil_livreur"} onClick={modifLivreurPassword}>Enregistrer</button>
                        </div>


                        <label htmlFor="email">Nom d'utilisateur</label>
                        <div className="modifier-account_name_profil_livreur">
                            <input className={"input-modif-profil-livreur"} type="nom.prenom" id="account_name_livreur" name="account_name_livreur" placeholder={user.name} required />
                            <button className={"save-button_profil_livreur"} onClick={modifLivreurName}>Enregistrer</button>
                        </div>

                        <label htmlFor="Adresse">Adresse postale</label>
                        <div className="modifier-adresse_postale_profil_livreur">
                            <input className={"input-modif-profil-livreur"} type="adresse" id="postal_address_livreur" name="postal_address_livreur" placeholder={user.addressString} required />
                            <button className={"save-button_profil_livreur"} onClick={modifLivreurAdress}>Enregistrer</button>
                        </div>
                        <label htmlFor="Adresse">IBAN</label>
                        <div className="modifier-iban_profil_livreur">
                            <input className={"input-modif-profil-livreur"} type="iban" id="iban_livreur" name="iban_livreur" placeholder={user.IBAN} required />
                            <button className={"save-button_profil_livreur"} onClick={modifLivreurIban}>Enregistrer</button>
                        </div>
                    </div>

                    <div className="container_top_right-profil_livreur">
                        <div className="parrainage-profil_livreur">
                            <h2 className="titre-parrainage_profil_livreur">Parrainage</h2>
                            <p className="code_parrainage_livreur">Mon code : {user.referralCode} </p>
                        </div>
                        <div className="supprimer-profil_livreur">
                            <h2 className="titre-supprimer_profil_livreur">Supprimer profil</h2>
                            <button className={"delete-button_profil_livreur"} onClick={deleteProfil}>Supprimer</button>
                        </div>
                        <div className="commencer_livraison-profil_livreur">
                            <h2 className="titre-supprimer_profil_livreur">Début de service</h2>
                            <button className="commencer_livraison-button_profil_livreur" onClick={naviagteToCommandeDispo}>Voir les commandes disponibles</button>
                        </div>

                    </div>
                </div>

                {order_en_cours.map(order => (
                    <div className="container-profil_livreur-commande_en_cours">
                        <h2 className="titre-profil_livreur-commande_en_cours">Commande en cours</h2>
                        <div className="tableau-profil_livreur-commande_en_cours">
                            <div className="content-profil_livreur-commande_en_cours">
                                <div key={order.id} className="liste-profil_livreur-commande_en_cours">
                                    <div className="liste_commandes-profil_livreur">
                                        <p><b>Commande N°</b> {order?.id}</p>
                                        <p><b>Date : </b>{order?.createdAt}</p>
                                        <p><b>Etat de la commande </b>{order?.status} </p>
                                        <p><b>Restaurant : </b>{order?.restaurantUser.name}</p>
                                        <p><b>Nom client : </b>{order?.clientUser.name}</p>
                                        <p><b>Adresse de livraison : </b>{order?.clientUser.addressString}</p>
                                    </div>
                                        <button className="visualiser_button-profil_livreur-commande_en_cours" onClick={() => ModifStatus(order.id, 'Livrée', order?.clientUser.id, order?.restaurantUser.id)}>Valider livraison</button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}


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
                            {order_fini.map(order => (
                                <div key={order.id} className="content-profil_livreur-historique_commandes-line">
                                    <p className={"profil_livreur-case-tableau"}>{order?.restaurantUser.name}</p>
                                    <p className={"profil_livreur-case-tableau"}>{order?.id}</p>
                                    <p className={"profil_livreur-case-tableau"}>{order?.status}</p>
                                    <p className={"profil_livreur-case-tableau"}>{order?.clientUser.name}</p>
                                    <p className={"profil_livreur-case-tableau"}>4€</p>
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

export default ProfilLivreur;
import React, {useEffect, useState} from 'react';
import './commande-livreur.css';
import NavBar from '../../Navbar/NavBar.jsx';
import Footer from '../../Footer/Footer.jsx';
import background from '../../assets/livraison-resto.jpg'
import {addNotification, getAllOrder, getRestaurantById, getUser, updateOrderForLivreur} from "../../api/api.jsx";
import {useNavigate} from "react-router-dom";


function CommandeLivreur() {

    const [Info, setInfo] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));
    const navigation = useNavigate();

    useEffect(() => {
        const fetchOrder = async () => {
            try {
                const orders = await getAllOrder(); // Récupère toutes les commandes
                const ordersFilter = orders.filter((item) => item.status === 'En cours de préparation' || item.status === 'Prête');
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
                console.log(ordersWithUsers);
                setInfo(ordersWithUsers);
            } catch (error) {
                console.error("Erreur lors de la récupération des commandes avec utilisateurs :", error);
                throw error;
            }
        }
        fetchOrder();
    } , []);

    const ModifStatus = (id, status) => {
        updateOrderForLivreur(id, status, user.id);
        addNotification(Info.clientId, "Votre commande est en cours de livraison");
        navigation("/livreur/profil-livreur");
    }

    const NoRefu = () => {
        alert("Oups, Une erreur s'est produite, veuillez réessayer plus tard");
    }

    return (
        <div className="App">
            <NavBar />
            <img src={background} alt="Background" className="background-image-panier" />

            <h1 className="titre-commande_livreur">Liste des commandes disponibles</h1>
            <h1 className={"sous-titre"}>Commandes en attente de livreur</h1>
            <div className={"container-livraison"}>
                {Info.map(item => (
                    <div key={item.id} className={"info-commande-livreur"}>
                        <div className={"info-commande-livreur-texte"}>
                            <p><b>Nom du restaurant : </b>{item.restaurantUser.name}</p>
                            <p><b>Adresse du restaurant : </b>{item.restaurantUser.addressString} </p>
                            <p><b>Nom du client : </b>{item.clientUser.name} </p>
                            <p><b>Adresse du client : </b>{item.clientUser.addressString} </p>
                            <p><b>Prix de la livraison : </b>4€ </p>
                        </div>
                        <div className={"info-commande-livreur-bouton"}>
                            <button className={"bouton-accepter"} onClick={() => ModifStatus(item.id, 'En livraison')}>Accepter</button>
                            <button className={"bouton-refuser"} onClick={NoRefu}>Refuser</button>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default CommandeLivreur;
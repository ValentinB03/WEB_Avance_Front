import React, {useEffect, useState} from 'react';
import './ServiceCommercial-info.css';
import NavBar from '../Navbar/NavBar.jsx';
import Footer from '../Footer/Footer.jsx';
import ImgBannier from '../assets/img/Service_Commercial.jpg';
import {Link} from "react-router-dom";
import {getAllOrder, getRestaurantById, getUser} from "../api/api.jsx";

function ServiceCommercialInfo() {

    const [orders, setOrders] = useState([]);
    const [totalTransaction, setTotalTransaction] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            const orders = await getAllOrder(); // Récupère toutes les commandes
            const ordersFilter = orders.filter((item) => item.status !== 'Livrée' && item.status !== 'Annulée');
            console.log(ordersFilter);
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
            const total = ordersWithUsers.reduce((acc, order) => acc + parseFloat(order.totalAmount), 0);
            setOrders(ordersWithUsers);
            setTotalTransaction(total);
        }
        fetchData();
    } , []);


    return (
        <div className="App">
            <NavBar/>
            <img src={ImgBannier} alt="Background" className="background-image-modifcarte"/>
            <h1 className="titre-modifcarte">Service Commercial</h1>
            <Link to="/service-commercial/gestion-compte">
                <button className={"gestion-compte-bouton"}>Gestion des comptes clients</button>
            </Link>
            <div className="container-sc">
                <p className={"chiffre-affaire"}>Chiffre d'affaires transactionnel global en cours : {totalTransaction} €</p>
                <div className="tableau-service-commercial-historique_commandes">
                    <div className="content-service-commercial-historique_commandes">
                        <div className="content-service-commercial-historique_commandes-header">
                            <div className={"service-commercial-case-tableau"}>N° Commande</div>
                            <div  className={"service-commercial-case-tableau"}>Nom du restaurant</div>
                            <div className={"service-commercial-case-tableau"}>Etat de la commande</div>
                            <div className={"service-commercial-case-tableau"}>Dernière modification</div>
                            <div className={"service-commercial-case-tableau"}>Prix</div>
                        </div>
                        {orders.map(order => (
                            <div key={order.id} className="content-service-commercial-historique_commandes-line">
                                <p className={"service-commercial-case-tableau"}>{order.id}</p>
                                <p className={"service-commercial-case-tableau"}>{order.restaurantUser.name}</p>
                                <p className={"service-commercial-case-tableau"}>{order.status}</p>
                                <p className={"service-commercial-case-tableau"}>{order.updatedAt}</p>
                                <p className={"service-commercial-case-tableau"}>{order.totalAmount} €</p>
                            </div>
                        ))}
                    </div>
                </div>`
            </div>

            <Footer/>
        </div>
    );

}

export default ServiceCommercialInfo;
import React, {useEffect, useState} from 'react';
import './detail-commande.css';
import NavBar from '../Navbar/NavBar.jsx';
import Footer from '../Footer/Footer.jsx';
import ImgResto from '../assets/img/burger.jpg';
import Menu from '../assets/img/menu.jpg';
import {useParams} from "react-router-dom";
import {
    addNotification,
    getArticleById,
    getMenuById,
    getOrderById,
    getOrderItemsByIdOrder,
    updateOrderStatus
} from "../api/api.jsx";
import DefaultBG from '../assets/default.png';


function RestaurantDetailsCommande() {

    const { id } = useParams();
    const user = JSON.parse(localStorage.getItem('user'));
    const [order, setOrder] = useState([]);
    const [items, setItems] = useState([]);



    useEffect(() => {
        const fetchOrder = async () => {
            const response2 = await getOrderById(id);
            setOrder(response2);
            const response = await getOrderItemsByIdOrder(response2.id);
            setItems(response);
            const combinedItems = await Promise.all(
                response.map(async (item) => {
                    try {
                        if (item.articleId) {
                            const article = await getArticleById(item.articleId);
                            return { ...item, details: article };
                        } else if (item.menuId) {
                            const menu = await getMenuById(item.menuId);
                            return { ...item, details: menu };
                        }

                    } catch (error) {
                        console.error("Erreur lors de la récupération des détails :", error);
                        return item; // Retourne l'item sans détails en cas d'erreur
                    }
                }))
            setItems(combinedItems);
        };
        fetchOrder();
    }, []);

    const ModifStatus = (id, status) => {
        updateOrderStatus(id, status);
        addNotification(order.clientId, "Votre commande attend un livreur");
    }

    return (
        <div className="App">
            <NavBar />
            <div className="content-img">
                <img src={ImgResto} alt="Background" className="background-image-modifcarte" />
            </div>
            <h1 className="titre-modifcarte">{user.name}</h1>
            <h1 className={"Commande-titre"}>Détails de la commande</h1>
            <div className="container-detail">
                <div className="container-detail-texte">
                    <p className="detail-texte"><b>Commande :</b> {order.id}</p>
                    <p className="detail-texte"><b>Date :</b> {order.updatedAt}</p>
                    <p className="detail-texte"><b>Etat de la commande :</b> {order.status}</p>
                    <p className="detail-texte"><b>Prix total :</b> {order.price}€</p>
                </div>
                <div className="containers-liste-items-resto">
                    {items.map(item => (
                        <div key={item.id} className="container-detail-items-resto">
                            <img src={DefaultBG} alt="Menu" className="img-menu" />
                            <p className="detail-texte">{item?.details?.name || "Nom indisponible"}</p>
                            <p className="detail-texte">Prix: {item?.details?.price ? `${item.details.price}€` : "Prix indisponible"}</p>
                        </div>
                    ))}
                </div>
                <button className={"bouton-fini"} onClick={() => ModifStatus(order.id, 'Prête')}>Préparation terminer</button>
            </div>

            <Footer />
        </div>
    );
}

export default RestaurantDetailsCommande;
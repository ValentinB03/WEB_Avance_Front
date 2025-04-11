import React, {useEffect, useState} from 'react';
import './paiement.css';
import NavBar from '../Navbar/NavBar.jsx';
import Footer from '../Footer/Footer.jsx';
import Marbre from '../assets/img/marbre.jpg'
import {
    addNotification,
    getArticleById,
    getMenuById,
    getOrderByClientId,
    getOrderItemsByIdOrder, getRestaurantById,
    updateOrderForPaiement
} from "../api/api.jsx";
import DefaultBG from '../assets/default.png';
import {useNavigate} from "react-router-dom";

function Panier() {


    const [user, setUser] = useState(null);
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();
    const [restaurants, setRestaurants] = useState(null);
    const [commande, setCommande] = useState("???");

    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser != null) {
            try {
                const parsedUser = JSON.parse(storedUser); // Parse l'objet user
                setUser(parsedUser);
            } catch (error) {
                console.error("Erreur lors du parsing de l'objet user", error);
            }
        }
    } , []);

    useEffect(() => {
        if (user) {
            const paiement = async () => {
                try {
                    const response = await getOrderByClientId(user.id);
                    const responseFilter = response.filter((item) => item.status === 'Panier');
                    for (const responseI of responseFilter) {
                        if (responseFilter.length > 0) {
                            const responseItems = await getOrderItemsByIdOrder(responseI.id);

                            // Regrouper les items par articleId ou menuId
                            const groupedItems = {};
                            responseItems.forEach(item => {
                                const key = item.articleId || item.menuId;
                                if (!groupedItems[key]) {
                                    groupedItems[key] = {...item, quantite: item.quantity};
                                } else {
                                    groupedItems[key].quantite += item.quantity;
                                }
                            });

                            // Convertir en tableau et récupérer les détails
                            const groupedItemsArray = Object.values(groupedItems);
                            const combinedItems = await Promise.all(
                                groupedItemsArray.map(async (item) => {
                                    try {
                                        if (item.articleId) {
                                            const article = await getArticleById(item.articleId);
                                            return {...item, details: article};
                                        } else if (item.menuId) {
                                            const menu = await getMenuById(item.menuId);
                                            return {...item, details: menu};
                                        }
                                    } catch (error) {
                                        console.error("Erreur lors de la récupération des détails :", error);
                                        return item; // Retourne l'item sans détails en cas d'erreur
                                    }
                                })
                            );
                            const totalAmount = combinedItems.reduce((acc, item) => {
                                return acc + (item.details?.price || 0) * (item.quantite || 0);
                            }, 0);
                            setTotal((prevTotal) => prevTotal + totalAmount);
                            setItems((prevItems) => [...prevItems, ...combinedItems]);
                        }
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération du panier :", error);
                }
            };
            paiement();
        }
    }, [user]);

    useEffect(() => {
        setCommande("");
        const grouped = Object.values(
            items.reduce((acc, item) => {
                if (!acc[item.orderId]) {
                    acc[item.orderId] = [];
                }
                acc[item.orderId].push(item);
                setCommande( prev => prev + item.orderId + "");
                return acc;
            }, {})


        );
        console.log("Items grouped :", grouped);
        setRestaurants(grouped);
    } , [items]);

    const StartOrder = async (event) => {
        event.preventDefault()
        const grouped = Object.values(
            items.reduce((acc, item) => {
                if (!acc[item.orderId]) {
                    acc[item.orderId] = [];
                }
                acc[item.orderId].push(item);
                return acc;
            }, {})
        );
        for (const item of grouped) {
            let total = 0;
            for (const itemI of item) {
                total += (itemI.details?.price || 0) * (itemI.quantite || 0);
            }
            updateOrderForPaiement(item[0].orderId, total, 'En attente', total+4+2.40)
            const restaurantTemp = await getRestaurantById(item[0].details.restaurantId)
            await addNotification(restaurantTemp.ownerId, "Nouvelle commande")

        }
        navigate('/');
    }

    return (
        <div className="App">
            <NavBar />
            <img src={Marbre} alt="Background" className="background-image-panier" />

            <h1 className="titre-panier">Paiement</h1>
            <div className="container-paiement">
                <form  className={"paiement"}>
                        <h1>Coordonnées de la carte</h1>
                        <p>Information de la carte</p>
                        <input type="text" placeholder="Nom du titulaire" required/>
                        <div className={"data-ccv"}>
                            <input type="text" placeholder="MM/AA" required/>
                            <input type="text" placeholder="CCV" required/>
                        </div>
                        <p>Titulaire de la carte</p>
                        <input type="text" placeholder="Nom du titulaire" required/>
                        <button onClick={StartOrder}>Payer</button>
                </form>
                <div className={"resume"}>
                    <h1>N°Commande : {commande}</h1>
                    <div className={"liste-resume"}>
                        {items.map(item => (
                            <div key={item.id} className="article-resume">
                                    <img src={DefaultBG} alt={"DefaultBG"} />
                                    <div>
                                        <p>{item?.details.name}</p>
                                        <p>{item?.details.description}</p>
                                        <p>{item?.details.price}€</p>
                                    </div>
                                <p className="quantite-resume">x{item?.quantite}</p>
                            </div>
                        ))}
                    </div>
                    <div className={"total-article"}>
                        <p>Total des articles :</p>
                        <p>{total}</p>
                    </div>
                    <div className={"total-livraison"}>
                        <p>Livraison :</p>
                        <p>{restaurants?.length * 4}€</p>
                    </div>
                    <div className={"total-frais"}>
                        <p>Frais :</p>
                        <p>2.40€</p>
                    </div>
                    <div className={"totals"}>
                        <p>Total</p>
                        <p>{total + (restaurants?.length * 4) + 2.40}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Panier;
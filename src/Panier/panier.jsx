import React, {useEffect, useState} from 'react';
import './panier.css';
import NavBar from '../Navbar/NavBar.jsx';
import Footer from '../Footer/Footer.jsx';
import Marbre from '../assets/img/marbre.jpg'
import {Link} from "react-router-dom";
import {
    addArticleOrder, addMenuOrder, DeleteArticle,
    DeleteOrderItemById,
    getArticleById,
    getMenuById,
    getOrderByClientId,
    getOrderItemsByIdOrder
} from "../api/api.jsx";
import DefaultBG from '../assets/default.png';

function Panier() {
    const [user, setUser] = useState(null);
    const [items, setItems] = useState([]);
    const [refresh, setRefresh] = useState(0);

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
            const panier = async () => {
                try {
                    const response = await getOrderByClientId(user.id);
                    const responseFilter = response.filter((item) => item.status === 'Panier');
                    console.log("Récupération de la commande Pannier", responseFilter);
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

                            console.log("Items combinés :", combinedItems);
                            setItems((prevItems) => [...prevItems, ...combinedItems]);

                        }
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération du panier :", error);
                }
            };
            panier();
        }
    }, [user, refresh]);

    const AddItem = async (Orderitem) => {
        console.log("AddItem", Orderitem);
        if(Orderitem.articleId !== null) {
            await addArticleOrder(Orderitem.orderId, Orderitem.articleId);
        } else if(Orderitem.menuId !== null) {
            await addMenuOrder(Orderitem.orderId, Orderitem.menuId);
        }
        setItems([]);
        setRefresh(refresh + 1);

    }

    const DeleteItem = async (Orderitem) => {
        console.log("DeleteItem");
        await DeleteOrderItemById(Orderitem.id);
        setItems([]);
        setRefresh(refresh + 1);
    }

    return (
        <div className="App">
            <NavBar />
            <img src={Marbre} alt="Background" className="background-image-panier" />
            {items ? (
                <>
                    <h1 className="titre-panier">Mon Panier</h1>
                    <h1 className={"Commande-titre"}>Commande</h1>
                    <div className={"liste-panier"}>
                        {items.map(item => (
                            <div key={item?.id} className="all-partie">
                                <div className="partie-commande">
                                    <img src={DefaultBG} alt={"DefaultBG"} />
                                    <div>
                                        <p>{item?.details.name}</p>
                                        <p>{item?.details.description}</p>
                                        <p>{item?.details.price}€</p>
                                    </div>
                                    <p className="quantite">{item?.quantite}x</p>
                                </div>
                                <div className="partie-bouton">
                                    <button onClick={() =>AddItem(item)}>Ajouter</button>
                                    <button onClick={() =>DeleteItem(item)}>Supprimer</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <Link to="/paiement">
                    <button className="button-valider-panier">Payer</button>
                    </Link>
                </>
            ) : (
                    <p>Chargement des données...</p>
                )}
            <Footer />
        </div>
    );
}

export default Panier;
import React, {useEffect, useState} from 'react';
import './paiement.css';
import NavBar from '../Navbar/NavBar.jsx';
import Footer from '../Footer/Footer.jsx';
import Marbre from '../assets/img/marbre.jpg'
import {
    getArticleById,
    getMenuById,
    getOrderByClientId,
    getOrderItemsByIdOrder,
    updateOrderForPaiement
} from "../api/api.jsx";
import DefaultBG from '../assets/default.png';

function Panier() {


    const [user, setUser] = useState(null);
    const [items, setItems] = useState([]);
    const [total, setTotal] = useState(0);

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
                    const responseFilter = response.filter((item) => item.status === 'panier');
                    if (responseFilter.length > 0) {
                        const responseItems = await getOrderItemsByIdOrder(response[0].id);
                        // Regrouper les items par articleId ou menuId
                        const groupedItems = {};
                        responseItems.forEach(item => {
                            const key = item.articleId || item.menuId;
                            if (!groupedItems[key]) {
                                groupedItems[key] = { ...item, quantite: item.quantity };
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
                                        return { ...item, details: article };
                                    } else if (item.menuId) {
                                        const menu = await getMenuById(item.menuId);
                                        return { ...item, details: menu };
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
                        setTotal(totalAmount);
                        setItems(combinedItems); // Met à jour l'état avec les articles et menus combinés
                    }
                } catch (error) {
                    console.error("Erreur lors de la récupération du panier :", error);
                }
            };
            paiement();
        }
    }, [user]);

    const StartOrder = async () => {
        updateOrderForPaiement(items[0].orderId, total, 'pending', total+4+2.40)
    }

    return (
        <div className="App">
            <NavBar />
            <img src={Marbre} alt="Background" className="background-image-panier" />

            <h1 className="titre-panier">Paiement</h1>
            <div className="container-paiement">
                <div className={"paiement"}>
                    <h1>Coordonnées de la carte</h1>
                    <p>Information de la carte</p>
                    <input type="text" placeholder="Nom du titulaire"/>
                    <div className={"data-ccv"}>
                        <input type="text" placeholder="MM/AA" />
                        <input type="text" placeholder="CCV" />
                    </div>
                    <p>Titulaire de la carte</p>
                    <input type="text" placeholder="Nom du titulaire" />
                    <button onClick={StartOrder}>Payer</button>
                </div>
                <div className={"resume"}>
                    <h1>N°Commande : {items[0]?.orderId}</h1>
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
                        <p>4€</p>
                    </div>
                    <div className={"total-frais"}>
                        <p>Frais :</p>
                        <p>2.40€</p>
                    </div>
                    <div className={"totals"}>
                        <p>Total</p>
                        <p>{total + 4 + 2.40}</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Panier;
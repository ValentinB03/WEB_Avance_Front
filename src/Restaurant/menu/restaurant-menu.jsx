import React, {useEffect, useState} from 'react';
import './restaurant-menu.css';
import NavBar from '../../Navbar/NavBar';
import Footer from '../../Footer/Footer';
import {useParams} from "react-router-dom";
import {
    addArticleOrder, addMenuOrder, createOrder,
    getAllArticleRestoById,
    getAllMenuRestoById,
    getBanniereByOwner, getOrderByClientId,
    getRestaurantById
} from "../../api/api.jsx";
import DefaultBG from '../../assets/default.png';

function RestaurantMenu() {
    const [restaurant, setRestaurant] = useState('');
    const [articles, setArticles] = useState([]);
    const [menus, setMenus] = useState([]);

    const { id } = useParams();
    const user= JSON.parse(localStorage.getItem('user'));


    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const restaurants = await getRestaurantById(id);
                // Ajout des bannières pour chaque restaurant
                const banniere = await getBanniereByOwner(restaurants.ownerId);
                const restaurantsWithBanners = { ...restaurants, banniere };


                setRestaurant(restaurantsWithBanners);
                const article = await getAllArticleRestoById(restaurants.id);
                setArticles(article.filter(article => !article.menuId));
                const menu = await getAllMenuRestoById(restaurants.id);
                setMenus(menu);
            } catch (error) {
                console.error("Erreur lors de la récupération des restaurants :", error);
            }
        };
        fetchRestaurants();
    }, []);

    const ajout_panier_article = (id) => {
        // Logique d'ajout au panier
        getOrderByClientId(user.id).then((response) => {
            const filteredResponse = response.filter((item) => item.status === 'Panier');
            console.log("Récupération de la commande", filteredResponse);
            if(filteredResponse.length > 0) {
                addArticleOrder(filteredResponse[0].id, id)
            }
            else {
                const createOrderZ = async () => {
                    const response = await createOrder(user.id,restaurant.id);
                    console.log("Création de la commande", response);


                };
                createOrderZ();
                addArticleOrder(response[0].id, id)
            }
        });
    }

    const ajout_panier_menu = (id) => {
        // Logique d'ajout au panier
        getOrderByClientId(user.id).then((response) => {
            const filteredResponse = response.filter((item) => item.status === 'Panier');
            console.log("Récupération de la commande", filteredResponse);
            if(filteredResponse.length > 0) {
                addMenuOrder(filteredResponse[0].id, id)
            }
            else {
                const createOrderZ = async () => {
                    const response = await createOrder(user.id,restaurant.id);
                    console.log("Création de la commande", response);

                };
                createOrderZ();
                addMenuOrder(response[0].id, id)
            }
        });
    }

    return (
        <div className="App">
            <NavBar />
            {restaurant ? (
                <>
                    <h1 className="name-resto">{restaurant.name}</h1>
                    <div className="content">
                        {restaurant.banniere ? (
                            <img src={restaurant.banniere.data} alt={"Background"} className="background-image" />
                        ) : (
                            <img src={DefaultBG} alt="Default" className="background-image" />
                        )}
                        <div className="opening-hours">
                            <p className="info-resto">Horaires d'ouverture :<br/></p>
                            <p className="info-resto">Lundi : {restaurant.openingHours.monday}<br/></p>
                            <p className="info-resto">Mardi : {restaurant.openingHours.tuesday}<br/></p>
                            <p className="info-resto">Mercredi : {restaurant.openingHours.wednesday}<br/></p>
                            <p className="info-resto">Jeudi : {restaurant.openingHours.thursday}<br/></p>
                            <p className="info-resto">Vendredi : {restaurant.openingHours.friday}<br/></p>
                            <p className="info-resto">Samedi : {restaurant.openingHours.saturday}<br/></p>
                            <p className="info-resto">Dimanche : {restaurant.openingHours.sunday}<br/></p>
                        </div>
                        <p className="info-resto">
                        Adresse : {restaurant.addressString}<br/>
                        Prix moyen : 27€</p>
                        <div className="liste-article">
                            <p><u>Menu :</u></p>
                            <div className="liste-menu">
                                {menus.map(item => (
                                    <div key={item.id} className="Menu">
                                        <img src={DefaultBG} alt={item.name} className="menu-image" />
                                        <div className="test-menu">
                                            <p>{item.name}</p>
                                            <p>{item.description}</p>
                                            <p>{item.price}€</p>
                                            <button onClick={() => ajout_panier_menu(item.id)}>Ajouter au panier</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                            <p><u>Article seul :</u></p>
                            <div className="liste-articleseul">
                                {articles.map(item => (
                                    <div key={item.id} className="Article-seul">
                                        <img src={DefaultBG} alt={item.name} className="menu-image" />
                                        <div className="test-article">
                                            <p>{item.name}</p>
                                            <p>{item.description}</p>
                                            <p>{item.price}€</p>
                                            <button onClick={() => ajout_panier_article(item.id)}>Ajouter au panier</button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p>Chargement des données...</p>
            )}
            <Footer />
        </div>
    );
}

export default RestaurantMenu;
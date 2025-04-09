import React, {useEffect, useState} from 'react';
import './restaurant-menu.css';
import NavBar from '../../Navbar/NavBar';
import Footer from '../../Footer/Footer';
import {useParams} from "react-router-dom";
import {getAllArticleRestoById, getAllMenuRestoById, getBanniereByOwner, getRestaurantById} from "../../api/api.jsx";
import DefaultBG from '../../assets/default.png';

function RestaurantMenu() {
    const [restaurant, setRestaurant] = useState('');
    const [articles, setArticles] = useState([]);
    const [menus, setMenus] = useState([]);

    const { id } = useParams();

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
                        <p className="info-resto">Ouvert/Fermé<br/>
                        Adresse : 25 Rue de la guerre<br/>
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
                                            <button>Ajouter au panier</button>
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
                                            <button>Ajouter au panier</button>
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
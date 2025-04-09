import React, {useEffect, useState} from 'react';
import './restaurant-modif-menu.css';
import NavBar from '../../Navbar/NavBar.jsx';
import Footer from '../../Footer/Footer.jsx';
import {useParams} from "react-router-dom";
import {
    createArticle,
    createArticleNoMenu,
    createMenu, DeleteArticle, DeleteMenu, getAllArticleRestoById,
    getAllMenuRestoById,
    getBanniereByOwner,
    getRestaurantById
} from "../../api/api.jsx";
import DefaultBG from "../../assets/default.png";

function RestaurantModifMenu() {

    const { id } = useParams();
    const [restaurant ,setRestaurant] = useState(null);
    const [banniere, setBanniere] = useState(null);
    const [statut, setStatut] = useState('article');
    const [isAvailable, setIsAvailable] = useState(false);
    const [articles, setArticles] = useState([]);
    const [menus, setMenus] = useState([]);

    useEffect(() => {
        const fetchRestaurant = async () => {
            const restaurantData2 = await getRestaurantById(id);
            setRestaurant(restaurantData2);
            const restaurantData = await getBanniereByOwner(restaurantData2.ownerId);
            setBanniere(restaurantData.data);
            const article = await getAllArticleRestoById(restaurantData2.id);
            setArticles(article.filter(article => !article.menuId));
            const menu = await getAllMenuRestoById(restaurantData2.id);
            setMenus(menu);
        };
        fetchRestaurant();
    }, []); // Le tableau de dépendances vide empêche l'exécution multiple

    const AddArticle = () => {
        console.log("Ajout d'un article");
        const itemName = document.getElementById("item-name").value;
        const itemDescription = document.getElementById("item-description").value;
        const itemAvailable = document.getElementById("item-available").checked;
        if (itemAvailable) {
            const itemMenu = document.getElementById("item-menu").value;
            getAllMenuRestoById(restaurant.id).then((response) => {
                const menu = response.find((menu) => menu.name === itemMenu);
                if (menu) {
                    console.log("Menu trouvé :", menu);
                    createArticle(itemName, itemDescription, 0, restaurant.id, menu.id);
                } else {
                    console.log("Menu non trouvé");
                }
            });
        } else {
            const itemPrix = document.getElementById("item-prix").value;
            createArticleNoMenu(itemName, itemDescription, itemPrix, restaurant.id);
        }
    }

    const AddMenu = () => {
        console.log("Ajout d'un menu");
        const itemName = document.getElementById("item-name").value;
        const itemDescription = document.getElementById("item-description").value;
        const itemPrix = document.getElementById("item-prix").value;
        createMenu(itemName, itemDescription, itemPrix, restaurant.id);
    }

    const deleteArticle = (id) => {
        DeleteArticle(id)
    }

    const deleteMenu = (id) => {
        DeleteMenu(id)
    }

    return (
        <div className="App">
            <NavBar />
            {restaurant ? (
                <>
                    {banniere ? (
                        <img src={banniere} alt={"Background"} className="background-image-modifcarte"  />
                    ) : (
                        <img src={DefaultBG} alt="Default" className="background-image-modifcarte"  />
                    )}
            <h1 className="titre-modifcarte">{restaurant.name}</h1>
            <h1 className={"Commande-titre"}>Modification de la carte</h1>
            <div className="columns-container">
                <div className="column">
                    <select id="statut" name="statut" required onChange={(e) => setStatut(e.target.value)}>
                        <option value="article">Article</option>
                        <option value="menu">Menu</option>
                    </select>
                    <h1>Ajouter un {statut}</h1>
                    <div className="input-group">
                        {statut === "menu" ? (
                            <label htmlFor="item-name">Nom du menu</label>
                        ) : (
                            <label htmlFor="item-name">Nom de l'article</label>
                        )}
                        <input type="remplire" id="item-name" name="item-name" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="item-description">Description</label>
                        <input type="remplire" id="item-description" name="item-description" />
                    </div>
                    <button className="btn-modifcarte">Ajouter une image</button>
                    {statut === "article" ? (
                        <>
                            <div className="checkbox-group">
                                <input
                                    type="checkbox"
                                    id="item-available"
                                    name="item-available"
                                    onChange={(e) => setIsAvailable(e.target.checked)}
                                />
                                <label htmlFor="item-available">Fait parti d’un menu</label>
                            </div>
                            {isAvailable && (
                                <div className="input-group">
                                    <label htmlFor="item-menu">Si oui, Nom du menu</label>
                                    <input type="remplire" id="item-menu" name="item-menu" />
                                </div>
                            )}
                        </>
                    ) : null}

                    {((!isAvailable && statut === "article") || statut === "menu") && (
                        <div className="input-group">
                            <label htmlFor="item-prix">Prix</label>
                            <input type="remplire" id="item-prix" name="item-prix" />
                        </div>
                    )}

                    {statut === "menu" ? (
                        <button className="btn-modifcarte" onClick={AddMenu}>Ajouter le menu</button>
                    ) : (
                        <button className="btn-modifcarte" onClick={AddArticle}>Ajouter l'article</button>
                    )}
                </div>
                <div className="column scrollable">
                    <h1>Liste des menus</h1>
                    <div className={"liste-menu1"}>
                        {menus.map(item => (
                            <div key={item.id} className="all-menu">
                                <img src={DefaultBG} alt={item.description} />
                                <div className="menu-details">
                                    <p>{item.name}</p>
                                    <p>{item.description}</p>
                                    <p>{item.price}€</p>
                                    <button onClick={() => deleteMenu(item.id)}>Supprimer</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <h1>Liste des articles</h1>
                    <div className={"liste-article1"}>
                        {articles.map(item => (
                            <div key={item.id} className="all-article">
                                    <img src={DefaultBG} alt={item.description} />
                                    <div className="article-details">
                                        <p>{item.name}</p>
                                        <p>{item.description}</p>
                                        <p>{item.price}€</p>
                                        <button onClick={() => deleteArticle(item.id)}>Supprimer</button>
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

export default RestaurantModifMenu;
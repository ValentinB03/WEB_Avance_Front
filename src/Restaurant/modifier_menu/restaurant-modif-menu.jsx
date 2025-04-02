import React, {useState} from 'react';
import './restaurant-modif-menu.css';
import NavBar from '../../Navbar/NavBar.jsx';
import Footer from '../../Footer/Footer.jsx';
import ImgResto from '../../assets/img/burger.jpg';
import Menu from '../../assets/img/menu.jpg';

function RestaurantModifMenu() {

    const [items] = useState([
        { id: 1, description: 'Burger N°1 + Frites + Boisson', image: Menu, prix: 17 },
        { id: 2, description: 'Burger N°2 + Frites + Boisson', image: Menu, prix: 17 },
        { id: 3, description: 'Burger N°3 + Frites', image: Menu, prix: 27 },

    ]);

    return (
        <div className="App">
            <NavBar />
            <img src={ImgResto} alt="Background" className="background-image-modifcarte" />

            <h1 className="titre-modifcarte">Big Bite Burger</h1>
            <h1 className={"Commande-titre"}>Modification de la carte</h1>
            <div className="columns-container">
                <div className="column">
                    <h1>Ajouter d'un article</h1>
                    <div className="input-group">
                        <label htmlFor="item-name">Nom de l'article</label>
                        <input type="remplire" id="item-name" name="item-name" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="item-description">Description</label>
                        <input type="remplire" id="item-description" name="item-description" />
                    </div>
                    <div className="input-group">
                        <label htmlFor="item-prix">Prix</label>
                        <input type="remplire" id="item-prix" name="item-prix" />
                    </div>
                    <button className="btn-modifcarte">Ajouter une image</button>
                    <div className="checkbox-group">
                        <input type="checkbox" id="item-available" name="item-available" />
                        <label htmlFor="item-available">Fait parti d’un menu</label>
                    </div>
                    <div className="input-group">
                        <label htmlFor="item-menu">Si oui, Numéro du menu</label>
                        <input type="remplire" id="item-menu" name="item-menu" />
                    </div>
                    <button className="btn-modifcarte">Ajouter l'article</button>
                </div>
                <div className="column">
                    <h1>Listes des articles</h1>
                    <div className={"liste-article1"}>
                        {items.map(item => (
                            <div key={item.id} className="all-article">
                                    <img src={item.image} alt={item.description} />
                                    <div>
                                        <p>{item.description}</p>
                                        <p>{item.prix}€</p>
                                        <button>Supprimer</button>
                                    </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default RestaurantModifMenu;
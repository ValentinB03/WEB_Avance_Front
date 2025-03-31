import React, { useState } from 'react';
import './restaurant-menu.css';
import NavBar from '../../Navbar/NavBar';
import Footer from '../../Footer/Footer';

function RestaurantMenu() {
    const [items] = useState([
        { id: 1, title: 'Menu 1', prix: '17€', type: 1, image: 'src/assets/img/Menu.jpg' },
        { id: 2, title: 'Menu 2', prix: '21€', type: 1, image: 'src/assets/img/Menu.jpg' },
        { id: 3, title: 'Article 1', prix: '5€', type: 2, image: 'src/assets/img/Menu.jpg' },
        { id: 4, title: 'Article 2', prix: '7€', type: 2, image: 'src/assets/img/Menu.jpg' }
    ]);

    const menuItems = items.filter(item => item.type === 1);
    const articleItems = items.filter(item => item.type === 2);

    return (
        <div className="App">
            <NavBar />
            <h1 className="name-resto">Big Bite Burger</h1>
            <div className="content">
                <img src="src/assets/img/burger.jpg" alt="Background" className="background-image" />
                <p className="info-resto">Ouvert/Fermé<br/>
                Adresse : 25 Rue de la guerre<br/>
                Prix moyen : 27€</p>
                <div className="liste-article">
                    <p><u>Menu :</u></p>
                    <div className="liste-menu">
                        {menuItems.map(item => (
                            <div key={item.id} className="Menu">
                                <img src={item.image} alt={item.title} className="menu-image" />
                                <div className="test-menu">
                                    <p>{item.title}</p>
                                    <p>{item.prix}</p>
                                    <button>Ajouter au panier</button>
                                </div>
                            </div>
                        ))}
                    </div>
                    <p><u>Article seul :</u></p>
                    <div className="liste-articleseul">
                        {articleItems.map(item => (
                            <div key={item.id} className="Article-seul">
                                <img src={item.image} alt={item.title} className="menu-image" />
                                <div className="test-article">
                                    <p>{item.title}</p>
                                    <p>{item.prix}</p>
                                    <button>Ajouter au panier</button>
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

export default RestaurantMenu;
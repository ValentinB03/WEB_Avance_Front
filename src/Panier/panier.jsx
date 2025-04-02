import React, {useState} from 'react';
import './panier.css';
import NavBar from '../Navbar/NavBar.jsx';
import Footer from '../Footer/Footer.jsx';
import Marbre from '../assets/img/marbre.jpg'
import Menu from '../assets/img/Menu.jpg'

function Panier() {

    const [items] = useState([
        { id: 1, resto: 'Big Bite Burger', description: 'Burger N°1 + Frites + Boisson', image: Menu, prix: 17 },
        { id: 2, resto: 'Big Bite Burger', description: 'Burger N°2 + Frites + Boisson', image: Menu, prix: 17 },
        { id: 3, resto: 'Big Bite Burger', description: 'Burger N°3 + Frites', image: Menu, prix: 27 },

    ]);

    return (
        <div className="App">
            <NavBar />
            <img src={Marbre} alt="Background" className="background-image-panier" />

            <h1 className="titre-panier">Mon Panier</h1>
            <h1 className={"Commande-titre"}>Commande</h1>
            <div className={"liste-panier"}>
                {items.map(item => (
                    <div key={item.id} className="all-partie">
                        <div className="partie-commande">
                            <img src={item.image} alt={item.description} />
                            <div>
                                <p>{item.resto}</p>
                                <p>{item.description}</p>
                                <p>{item.prix}€</p>
                            </div>
                            <p className="quantite">x1</p>
                        </div>
                        <div className="partie-bouton">
                            <button>Ajouter</button>
                            <button>Supprimer</button>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default Panier;
import React, {useState} from 'react';
import './paiement.css';
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

            <h1 className="titre-panier">Paiement</h1>
            <div className="container-paiement">
                <div className={"paiement"}>
                    <h1>Coordonnées de la carte</h1>
                    <p>Information de la carte</p>
                    <input type="text" placeholder="Nom du titulaire" />
                    <div className={"data-ccv"}>
                        <input type="text" placeholder="MM/AA" />
                        <input type="text" placeholder="CCV" />
                    </div>
                    <p>Titulaire de la carte</p>
                    <input type="text" placeholder="Nom du titulaire" />
                    <button>Payer</button>
                </div>
                <div className={"resume"}>
                    <h1>N°Commande : 245-754-456</h1>
                    <div className={"liste-resume"}>
                        {items.map(item => (
                            <div key={item.id} className="article-resume">
                                    <img src={item.image} alt={item.description} />
                                    <div>
                                        <p>{item.resto}</p>
                                        <p>{item.description}</p>
                                        <p>{item.prix}€</p>
                                    </div>
                                <p className="quantite-resume">x1</p>
                            </div>
                        ))}
                    </div>
                    <div className={"total-article"}>
                        <p>Total des articles :</p>
                        <p>61€</p>
                    </div>
                    <div className={"total-livraison"}>
                        <p>Livraison :</p>
                        <p>61€</p>
                    </div>
                    <div className={"total-frais"}>
                        <p>Frais :</p>
                        <p>61€</p>
                    </div>
                    <div className={"totals"}>
                        <p>Total</p>
                        <p>61€</p>
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Panier;
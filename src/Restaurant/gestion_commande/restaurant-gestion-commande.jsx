import React, {useState} from 'react';
import './restaurant-gestion-commande.css';
import NavBar from '../../Navbar/NavBar.jsx';
import Footer from '../../Footer/Footer.jsx';
import background from '../../assets/img/burger.jpg'


function RestaurantGestionCommande() {

    const [items] = useState([
        { id: 1, commande: '154-856-987', date: '17/05/2003', EtatCommande: 'En attente livreur', prix: 17 },
        { id: 2, commande: '154-856-987', date: '17/05/2003', EtatCommande: 'En attente', prix: 17 },
        { id: 3, commande: '154-856-987', date: '17/05/2003', EtatCommande: 'En préparation', prix: 17 },

    ]);
    const CommandeEnCours = items.filter(item => item.EtatCommande === ('En préparation') || item.EtatCommande === ('En attente livreur'));
    const CommandeEnAttente = items.filter(item => item.EtatCommande === 'En attente');
    return (
        <div className="App">
            <NavBar />
            <img src={background} alt="Background" className="background-image-panier" />

            <h1 className="titre-gestion_commande">Commandes en cours</h1>
            <div className={"container"}>
                <div className={"CommandeEnCours"}>
                    <p>Commandes en cours</p>
                    {CommandeEnCours.map(item => (
                        <div key={item.id} className={"etat-commande"}>
                            <div className={"info-commande"}>
                                <p><b>N°Commande :</b>N°{item.commande}</p>
                                <p><b>Date :</b> {item.date}</p>
                                <p><b>Etat de la commande :</b> {item.EtatCommande}</p>
                                <p><b>Prix :</b> {item.prix}€</p>
                            </div>
                            <div className={"bouton-commande"}>
                                <button>Visualiser</button>
                                <button>Commande annulée</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="vertical-bar"></div>
                <div className={"CommandeEnAttente"}>
                    <p>Commandes en attente</p>
                    {CommandeEnAttente.map(item => (
                        <div key={item.id} className={"etat-commande"}>
                            <div className={"info-commande"}>
                                <p><b>N°Commande :</b>N°{item.commande}</p>
                                <p><b>Date :</b>{item.date}</p>
                                <p><b>Etat de la commande :</b>{item.EtatCommande}</p>
                                <p><b>Prix :</b>{item.prix}€</p>
                            </div>
                            <div className={"bouton-commande-attente"}>
                                <button className={"bouton-accepter"}>Accepter</button>
                                <button className={"bouton-refuser"}>Refuser</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default RestaurantGestionCommande;
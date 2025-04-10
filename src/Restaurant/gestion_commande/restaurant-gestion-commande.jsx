import React, {useEffect, useState} from 'react';
import './restaurant-gestion-commande.css';
import NavBar from '../../Navbar/NavBar.jsx';
import Footer from '../../Footer/Footer.jsx';
import {getBanniereByOwner, getOrderByRestoId, updateOrderStatus} from "../../api/api.jsx";


function RestaurantGestionCommande() {

    const user = JSON.parse(localStorage.getItem('user'));
    const [CommandeEnCours, setCommandeEnCours] = useState([]);
    const [CommandeEnAttente, setCommandeEnAttente] = useState([]);
    const [Banniere, setBanniere] = useState([]);

    useEffect(() => {
        const fetchCommande = async () => {
            try {
                const banniere = await getBanniereByOwner(user.id);
                setBanniere(banniere.data);
                const response = await getOrderByRestoId(user.id);
                setCommandeEnAttente(response.filter((item) => item.status === 'pending'));
                setCommandeEnCours(response.filter((item) => item.status === 'preparing' || item.status === 'ready'));

            } catch (error) {
                console.error("Erreur lors de la récupération des restaurants :", error);
            }
        }
        fetchCommande();
    } , []);

    const ModifStats = (id, status) => {
        updateOrderStatus(id, status);
    }

    return (
        <div className="App">
            <NavBar />
            <img src={Banniere} alt="Background" className="background-image-panier" />

            <h1 className="titre-gestion_commande">Commandes</h1>
            <div className={"container"}>
                <div className={"CommandeEnCours"}>
                    <h2>Commandes en cours</h2>
                    {CommandeEnCours.map(item => (
                        <div key={item.id} className={"etat-commande"}>
                            <div className={"info-commande"}>
                                <p><b>N°Commande :</b>N°{item.id}</p>
                                <p><b>Date :</b> {item.updatedAt}</p>
                                <p><b>Etat de la commande :</b> {item.status}</p>
                                <p><b>Prix :</b> {item.price}€</p>
                            </div>
                            <div className={"bouton-commande"}>
                                <button>Visualiser</button>
                                <button onClick={ModifStats(item.id, 'cancelled')}>Commande annulée</button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className="vertical-bar"></div>
                <div className={"CommandeEnAttente"}>
                    <h2>Commandes en attente</h2>
                    {CommandeEnAttente.map(item => (
                        <div key={item.id} className={"etat-commande"}>
                            <div className={"info-commande"}>
                                <p><b>N°Commande :</b>N°{item.id}</p>
                                <p><b>Date :</b>{item.updatedAt}</p>
                                <p><b>Etat de la commande :</b>{item.status}</p>
                                <p><b>Prix :</b>{item.price}€</p>
                            </div>
                            <div className={"bouton-commande-attente"}>
                                <button className={"bouton-accepter"} onClick={ModifStats(item.id, 'preparing')}>Accepter</button>
                                <button className={"bouton-refuser"} onClick={ModifStats(item.id, 'cancelled')}>Refuser</button>
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
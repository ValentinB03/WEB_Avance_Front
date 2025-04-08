import React, {useState} from 'react';
import './commande-livreur.css';
import NavBar from '../../Navbar/NavBar.jsx';
import Footer from '../../Footer/Footer.jsx';
import background from '../../assets/livraison-resto.jpg'


function CommandeLivreur() {

    const [items] = useState([
        { id: 1, resto: 'Big Bite Burger', Adresse_resto: '25 rue de la guerre', Nom_client: 'Jean MARTIN', Adresse_client: '24 rue de la paix', prix_livraison: 1.2},
        { id: 2, resto: 'Big Bite Burger', Adresse_resto: '25 rue de la guerre', Nom_client: 'Jean DIDIER', Adresse_client: '24 rue de la paix', prix_livraison: 1.2},
        { id: 3, resto: 'Big Bite Burger', Adresse_resto: '25 rue de la guerre', Nom_client: 'Jean MARCEL', Adresse_client: '24 rue de la paix', prix_livraison: 1.2},

    ]);
    return (
        <div className="App">
            <NavBar />
            <img src={background} alt="Background" className="background-image-panier" />

            <h1 className="titre-commande_livreur">Liste des commandes disponibles</h1>
            <h1 className={"sous-titre"}>Commandes en attente de livreur</h1>
            <div className={"container-livraison"}>
                {items.map(item => (
                    <div key={item.id} className={"info-commande-livreur"}>
                        <div className={"info-commande-livreur-texte"}>
                            <p><b>Nom du restaurant : </b>{item.resto}</p>
                            <p><b>Adresse du restaurant : </b>{item.Adresse_resto} </p>
                            <p><b>Nom du client : </b>{item.Nom_client} </p>
                            <p><b>Adresse du client : </b>{item.Adresse_client} </p>
                            <p><b>Prix de la livraison : </b>{item.prix_livraison}€ </p>
                        </div>
                        <div className={"info-commande-livreur-bouton"}>
                            <button className={"bouton-accepter"}>Accepter</button>
                            <button className={"bouton-refuser"}>Refuser</button>
                        </div>
                    </div>
                ))}
            </div>
            <Footer />
        </div>
    );
}

export default CommandeLivreur;
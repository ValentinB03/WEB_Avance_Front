import React, {useState} from 'react';
import './detail-commane.css';
import NavBar from '../Navbar/NavBar.jsx';
import Footer from '../Footer/Footer.jsx';
import ImgResto from '../assets/img/burger.jpg';
import Menu from '../assets/img/menu.jpg';

function DetailCommande() {

    const [items] = useState([
        { id: 1, Article: 'Menu 1', image: Menu, prix: 17 },
        { id: 2, Article: 'Frite sans sauce', image: Menu, prix: 5 },
        { id: 3, Article: 'Thé noir', image: Menu, prix: 2 },
    ]);
    const [items2] = useState([
        { id: 1, Commande: '145-632-987', Livreur: 'Axel G.', date: '14/02/2003 12h02', EtatCommande: 'En cours', prix: 24 },
    ]);

    return (
        <div className="App">
            <NavBar />
            <div className="content-img">
                <img src={ImgResto} alt="Background" className="background-image-modifcarte" />
            </div>
            <h1 className="titre-modifcarte">Big Bite Burger</h1>
            <h1 className={"Commande-titre"}>Détail de la commande</h1>
            <div className="container-detail">
                <div className="container-detail-texte">
                    <p className="detail-texte"><b>Commande :</b> {items2[0].Commande}</p>
                    <p className="detail-texte"><b>Livreur :</b> {items2[0].Livreur}</p>
                    <p className="detail-texte"><b>Date :</b> {items2[0].date}</p>
                    <p className="detail-texte"><b>Etat de la commande :</b> {items2[0].EtatCommande}</p>
                    <p className="detail-texte"><b>Prix total :</b> {items2[0].prix}€</p>
                </div>
                <div className="containers-liste-items">
                    {items.map(item => (
                        <div key={item.id} className="container-detail-items">
                            <img src={item.image} alt="Menu" className="img-menu" />
                            <p className="detail-texte">{item.Article}</p>
                            <p className="detail-texte">Prix: {item.prix}€</p>
                        </div>
                    ))}
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default DetailCommande;
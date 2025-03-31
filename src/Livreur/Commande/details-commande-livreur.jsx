import React, {useState} from 'react';
import './details-commande-livreur.css';
import NavBar from '../../Navbar/NavBar.jsx';
import Footer from '../../Footer/Footer.jsx';
import ImgResto from '../../assets/img/burger.jpg';


function LivreurDetailsCommande() {

    const [dcl_items2] = useState([
        { id: 1, Commande: '145-632-987', Livreur: 'Axel G.', date: '14/02/2003 12h02', EtatCommande: 'En cours', prix: 24 },
    ]);

    return (
        <div className="App">
            <NavBar />
            <div className="content-img">
                <img src={ImgResto} alt="Background" className="background-image-modifcarte" />
            </div>
            <h1 className="titre-modifcarte">Big Bite Burger</h1>
            <h1 className={"Commande-titre"}>Détails de la commande</h1>
            <div className="container-detail">
                <div className="container-detail-texte">
                    <p className="detail-texte"><b>Commande :</b> {dcl_items2[0].Commande}</p>
                    <p className="detail-texte"><b>Livreur :</b> {dcl_items2[0].Livreur}</p>
                    <p className="detail-texte"><b>Date :</b> {dcl_items2[0].date}</p>
                    <p className="detail-texte"><b>Etat de la commande :</b> {dcl_items2[0].EtatCommande}</p>
                    <p className="detail-texte"><b>Prix total :</b> {dcl_items2[0].prix}€</p>
                </div>
                <p></p>
                <div className="container-maps">
                    <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2625.9999999999995!2d2.3522213156749424!3d48.85661407928792!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x47e66fdfb7e8c9b7%3A0x40a8e9c7e8e8c9b7!2sBig%20Bite%20Burger%20Restaurant!5e0!3m2!1sfr!2sfr!4v1616161616161"
                        allowFullScreen=""
                        loading="lazy"
                    ></iframe>
                </div>
            </div>


            <p></p>
            <Footer />
        </div>
    );
}

export default LivreurDetailsCommande;
import React, {useState} from 'react';
import './ServiceCommercial-info.css';
import NavBar from '../Navbar/NavBar.jsx';
import Footer from '../Footer/Footer.jsx';
import ImgBannier from '../assets/img/Service_Commercial.jpg';

function ServiceCommercialInfo() {

    const [items] = useState([
        { id: 1, name: 'Big Bite Burger', Commande: '152-478-965', Etat: 'Acceptation Livraison', Date: '20/03/2025 25h21' },
        { id: 2, name: 'Big Bite Burger', Commande: '152-478-965', Etat: 'Acceptation Livraison', Date: '20/03/2025 25h21' },
        { id: 3, name: 'Big Bite Burger', Commande: '152-478-965', Etat: 'Acceptation Livraison', Date: '20/03/2025 25h21' },
        { id: 4, name: 'Big Bite Burger', Commande: '152-478-965', Etat: 'Acceptation Livraison', Date: '20/03/2025 25h21' },
        { id: 5, name: 'Big Bite Burger', Commande: '152-478-965', Etat: 'Acceptation Livraison', Date: '20/03/2025 25h21' },
        { id: 6, name: 'Big Bite Burger', Commande: '152-478-965', Etat: 'Acceptation Livraison', Date: '20/03/2025 25h21' },
    ]);

    return (
        <div className="App">
            <NavBar/>
            <img src={ImgBannier} alt="Background" className="background-image-modifcarte"/>
            <h1 className="titre-modifcarte">Service Commercial</h1>

            <button className={"gestion-compte"}>Gestion des comptes clients</button>
            <div className="container-sc">
                <p className={"chiffre-affaire"}>Chiffre d'affaires transactionnel global en cours :</p>
                <div className="tableau-profil_restaurant-historique_commandes">
                    <div className="content-profil_restaurant-historique_commandes">
                        <div className="content-profil_restaurant-historique_commandes-header">
                            <div  className={"profil_restaurant-case-tableau"}>Nom du restaurant</div>
                            <div className={"profil_restaurant-case-tableau"}>N° Commande</div>
                            <div className={"profil_restaurant-case-tableau"}>Etat de la commande</div>
                            <div className={"profil_restaurant-case-tableau"}>Dernière modification</div>
                            <div className={"profil_restaurant-case-tableau"}>Action</div>
                        </div>
                        {items.map(item => (
                            <div key={item.id} className="content-profil_restaurant-historique_commandes-line">
                                <p className={"profil_restaurant-case-tableau"}>{item.name}</p>
                                <p className={"profil_restaurant-case-tableau"}>{item.Commande}</p>
                                <p className={"profil_restaurant-case-tableau"}>{item.Etat}</p>
                                <p className={"profil_restaurant-case-tableau"}>{item.Date}</p>
                                <button className={"profil_restaurant-case-tableau"}>Visualiser</button>
                            </div>
                        ))}
                    </div>
                </div>`
            </div>

            <Footer/>
        </div>
    );

}

export default ServiceCommercialInfo;
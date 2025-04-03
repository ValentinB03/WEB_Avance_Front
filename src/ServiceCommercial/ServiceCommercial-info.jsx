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
                <div className="content-sc">
                    <div className="content-sc-header">
                        <p className={"id-tableau"}>N°</p>
                        <p className={"case-tableau"}>Nom du restaurant</p>
                        <p className={"case-tableau"}>N° Commande</p>
                        <p className={"case-tableau"}> Etat de la commande</p>
                        <p className={"case-tableau"}>Dernière modification</p>
                        <p className={"case-tableau"}>Action</p>
                    </div>
                    {items.map(item => (
                        <div key={item.id} className="content-sc-line">
                            <p className={"id-tableau"}>{item.id}</p>
                            <p className={"case-tableau"}>{item.name}</p>
                            <p className={"case-tableau"}>{item.Commande}</p>
                            <p className={"case-tableau"}>{item.Etat}</p>
                            <p className={"case-tableau"}>{item.Date}</p>
                            <button className={"case-tableau"}>Visualiser</button>
                        </div>
                    ))}
                </div>
            </div>

            <Footer/>
        </div>
    );

}

export default ServiceCommercialInfo;
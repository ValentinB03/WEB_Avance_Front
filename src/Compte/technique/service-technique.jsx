import React from 'react';
import './service-technique.css';
import NavBar from '../../Navbar/NavBar.jsx';
import Footer from '../../Footer/Footer.jsx';
import ImgBannier from '../../assets/img/Image22.png';

function ServiceTechnique() {



    return (
        <div className="App">
            <NavBar/>
            <img src={ImgBannier} alt="Background" className="background-image-modifcarte"/>
            <h1 className="titre-service-technique">Service technique</h1>

            <div className="container-st">
                <div className="content-st">
                    <p>Gestion des composants réutilisables</p>
                    <button>Ajouter/Supprimer</button>
                </div>
                <div className="content-st">
                    <p>Consultation des logs</p>
                    <button>Consulter</button>
                </div>
                <div className="content-st">
                    <p>Consultation des statistiques</p>
                    <button>Consulter</button>
                </div>
            </div>

            <Footer/>
        </div>
    );

}

export default ServiceTechnique;
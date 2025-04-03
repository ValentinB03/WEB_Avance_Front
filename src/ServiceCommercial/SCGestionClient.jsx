import React, {useState} from 'react';
import './SCGestionClient.css';
import NavBar from '../Navbar/NavBar.jsx';
import Footer from '../Footer/Footer.jsx';
import ImgBannier from '../assets/img/Service_Commercial.jpg';

function ServiceCommercialInfo() {

    const [items] = useState([
        { id: 1, name: 'Alex G.', adresse: '25 rue de la paix', email: 'axel.g@gmail.com', type: 'Client', etat: 'Actif' },
        { id: 2, name: 'Nolan A.', adresse: '24 rue de la paix', email: 'nolan.a@gmail.com', type: 'Livreur', etat: 'Actif' },
        { id: 3, name: 'Kevin X.', adresse: '23 rue de la paix', email: 'kevin.x@gmail.com', type: 'Client', etat: 'Suspendu' },
        { id: 4, name: 'Manon F.', adresse: '22 rue de la paix', email: 'manon.f@gmail.com', type: 'Client', etat: 'Actif' },
        { id: 5, name: 'Bella Pizza', adresse: '21 rue de la paix', email: 'bastien.v@gmail.com', type: 'Restaurateur', etat: 'Actif' },
        { id: 6, name: 'Valentin H.', adresse: '20 rue de la paix', email: 'valentin.h@gmail.com', type: 'Livreur', etat: 'Suspendu' },
    ]);

    return (
        <div className="App">
            <NavBar/>
            <img src={ImgBannier} alt="Background" className="background-image-modifcarte"/>
            <h1 className="titre-modifcarte">Service Commercial</h1>

            <p className={"gestion-compte"}>Gestion des comptes clients</p>
            <div className="container-sc">
                <div className="content-sc">
                    <div className="content-sc-header">
                        <p className={"id-tableau"}>N°</p>
                        <p className={"case-tableau"}>Nom du compte</p>
                        <p className={"case-tableau"}>Adresse postal</p>
                        <p className={"case-tableau"}>Adresse email</p>
                        <p className={"case-tableau"}>Type de compte</p>
                        <p className={"case-tableau"}>Etat du compte</p>
                        <p className={"case-tableau"}>Action</p>
                    </div>
                    {items.map(item => (
                        <div key={item.id} className="content-sc-line">
                            <p className={"id-tableau"}>{item.id}</p>
                            <p className={"case-tableau"}>{item.name}</p>
                            <p className={"case-tableau"}>{item.adresse}</p>
                            <p className={"case-tableau"}>{item.email}</p>
                            <p className={"case-tableau"}>{item.type}</p>
                            <p className={"case-tableau"}>{item.etat}</p>
                            <div className={"liste-bouton"}>
                                <button>Modifier</button>
                                <button>{item.etat === 'Actif' ? 'Suspendre' : 'Réactiver'}</button>
                                <button>Supprimer</button>
                            </div>

                        </div>
                    ))}
                </div>
            </div>

            <Footer/>
        </div>
    );

}

export default ServiceCommercialInfo;
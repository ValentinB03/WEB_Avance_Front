import React, {useState} from 'react';
import './SCGestionClient.css';
import NavBar from '../Navbar/NavBar.jsx';
import Footer from '../Footer/Footer.jsx';
import ImgBannier from '../assets/img/Service_Commercial.jpg';

function ServiceCommercialInfo() {

    const [text, setText] = useState('');

    const [items] = useState([
        { id: 1, name: 'Alex G.', adresse: '25 rue de la paix', email: 'axel.g@gmail.com', type: 'Client', etat: 'Actif' },
        { id: 2, name: 'Nolan A.', adresse: '24 rue de la paix', email: 'nolan.a@gmail.com', type: 'Livreur', etat: 'Actif' },
        { id: 3, name: 'Kevin X.', adresse: '23 rue de la paix', email: 'kevin.x@gmail.com', type: 'Client', etat: 'Suspendu' },
        { id: 4, name: 'Manon F.', adresse: '22 rue de la paix', email: 'manon.f@gmail.com', type: 'Client', etat: 'Actif' },
        { id: 5, name: 'Bella Pizza', adresse: '21 rue de la paix', email: 'bastien.v@gmail.com', type: 'Restaurateur', etat: 'Actif' },
        { id: 6, name: 'Valentin H.', adresse: '20 rue de la paix', email: 'valentin.h@gmail.com', type: 'Livreur', etat: 'Suspendu' },
    ]);

    const filteredItems = items.filter(item => item.email.toLowerCase().includes(text.toLowerCase()));

    const handleChange = (event) => {
        setText(event.target.value);
    };

    return (
        <div className="App">
            <NavBar/>
            <img src={ImgBannier} alt="Background" className="background-image-modifcarte"/>
            <h1 className="titre-modifcarte">Service Commercial</h1>

            <p className={"gestion-compte"}>Gestion des comptes clients</p>
            <div className="tableau-input">
                <p className="label-list-compte">Recherche par email</p>
                <input type="text" value={text} onChange={handleChange} />
                <div className="container-sc">
                    <div className="tableau-gestion-compte-historique_commandes">
                        <div className="content-gestion-compte-historique_commandes">
                            <div className="content-gestion-compte-historique_commandes-header">
                                <div  className={"gestion-compte-case-tableau"}>Nom du compte</div>
                                <div className={"gestion-compte-case-tableau"}>Adresse postal</div>
                                <div className={"gestion-compte-case-tableau"}>Adresse email</div>
                                <div className={"gestion-compte-case-tableau"}>Type de compte</div>
                                <div className={"gestion-compte-case-tableau"}>Etat du compte</div>
                                <div className={"gestion-compte-case-tableau"}>Action</div>
                            </div>
                            {filteredItems.map(item => (
                                <div key={item.id} className="content-gestion-compte-historique_commandes-line">
                                    <p className={"gestion-compte-case-tableau"}>{item.name}</p>
                                    <p className={"gestion-compte-case-tableau"}>{item.adresse}</p>
                                    <p className={"gestion-compte-case-tableau"}>{item.email}</p>
                                    <p className={"gestion-compte-case-tableau"}>{item.type}</p>
                                    <p className={"gestion-compte-case-tableau"}>{item.etat}</p>
                                    <div className={"bouton-action-tableau"}>
                                        <button>Modifier</button>
                                        <button>Suspendre</button>
                                        <button>Supprimer</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>`
                </div>
            </div>



            <Footer/>
        </div>
    );

}

export default ServiceCommercialInfo;
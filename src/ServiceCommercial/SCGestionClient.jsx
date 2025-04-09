import React, {useEffect, useState} from 'react';
import './SCGestionClient.css';
import NavBar from '../Navbar/NavBar.jsx';
import Footer from '../Footer/Footer.jsx';
import ImgBannier from '../assets/img/Service_Commercial.jpg';
import {Link} from "react-router-dom";
import {getAllUsers} from "../api/api.jsx";

function ServiceCommercialInfo() {

    const [text, setText] = useState('');
    const [allUsers, setAllUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await getAllUsers(); // Assuming you have a function to fetch all users
                setAllUsers(users);
            } catch (error) {
                console.error("Erreur lors de la récupération des utilisateurs :", error);
            }
        };
        fetchUsers();
    } , []);

    const filteredItems = allUsers.filter(item => item.email.toLowerCase().includes(text.toLowerCase()));

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
                                        <Link to="/service-commercial/modification-compte-client"><button>Modifier</button></Link>
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
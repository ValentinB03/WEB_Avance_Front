import React, {useEffect, useState} from 'react';
import './SCGestionClient.css';
import NavBar from '../Navbar/NavBar.jsx';
import Footer from '../Footer/Footer.jsx';
import ImgBannier from '../assets/img/Service_Commercial.jpg';
import {Link, useNavigate} from "react-router-dom";
import {DeleteUser, editActiveUser, getAllUsers} from "../api/api.jsx";

function ServiceCommercialInfo() {

    const [text, setText] = useState('');
    const [allUsers, setAllUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const users = await getAllUsers(); // Assuming you have a function to fetch all users
                const filteredUsers = users.filter(user => user.userType === "client"); // Filtre les utilisateurs avec userType "Client"
                setAllUsers(filteredUsers); // Met à jour l'état avec les utilisateurs filtrés
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

    const handleChangeEtat = async (item) => {
        try {
            await editActiveUser(item.id, !item.isActive); // Appel à l'API pour modifier l'état
            setAllUsers(prevUsers =>
                prevUsers.map(user =>
                    user.id === item.id ? { ...user, isActive: !user.isActive } : user
                )
            ); // Mise à jour de l'état local
        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'état :", error);
        }
    };

    const handleDeleteUser = async (item) => {
        try {
            await DeleteUser(item.id); // Appel à l'API pour supprimer l'utilisateur
            setAllUsers(prevUsers => prevUsers.filter(user => user.id !== item.id)); // Mise à jour de l'état local
        } catch (error) {
            console.error("Erreur lors de la suppression de l'utilisateur :", error);
        }
    };

    const ModifProfil = (item) => {
        navigate(`/service-commercial/modification-compte-client/${item.id}`); // Redirection vers la page de modification
    }

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
                                    <p className={"gestion-compte-case-tableau"}>{item.addressString}</p>
                                    <p className={"gestion-compte-case-tableau"}>{item.email}</p>
                                    <p className={"gestion-compte-case-tableau"}>{item.userType}</p>
                                    <p className={"gestion-compte-case-tableau"}>{item.isActive ? "Actif" : "Suspendu"}</p>
                                    <div className={"bouton-action-tableau"}>
                                        <button onClick={() => ModifProfil(item)}>Modifier</button>
                                        <button onClick={() => handleChangeEtat(item)}>{!item.isActive ? "Activer" : "Suspendre"}</button>
                                        <button onClick={() => handleDeleteUser(item)}>Supprimer</button>
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
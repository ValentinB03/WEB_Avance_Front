import React, {useEffect, useState} from 'react';
import './modif-profil-client.css';
import NavBar from '../../Navbar/NavBar.jsx';
import Footer from '../../Footer/Footer.jsx';
import Client from '../../assets/img/humain.jpg'
import {
    editAddressUser,
    editEmailUser,
    editNameUser,
    editRefferalCodeUser,
    getUser
} from "../../api/api.jsx";
import {useParams} from "react-router-dom";


function ModifProfilClient() {

    const idUser = useParams().id;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const user = await getUser(idUser); // Assuming you have a function to fetch all users
                console.log("Utilisateur récupéré :", user);
                setUser(user);
            } catch (error) {
                console.error("Erreur lors de la récupération de l'utilisateur :", error);
            }
        };
        fetchUsers();
    } , []);

    const modifNameProfil = async () => {
        try {
            const inputNom = document.querySelector('.input-modification-profil-nom');
            const newName = inputNom.value; // Récupère la valeur de l'input
            await editNameUser(user.id, newName); // Appel à l'API avec la nouvelle valeur
            setUser({ ...user, name: newName }); // Met à jour l'état local avec le nouveau nom;
        } catch (error) {
            console.error("Erreur lors de la mise à jour du nom :", error);
        }
    };

    const modifemailProfil = async () => {
        try {
            const inputEmail = document.querySelector('.input-modification-profil-email');
            const newEmail = inputEmail.value; // Récupère la valeur de l'input
            await editEmailUser(user.id, newEmail); // Appel à l'API avec la nouvelle valeur
            setUser({ ...user, email: newEmail }); // Met à jour l'état local avec le nouveau nom

        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'état :", error);
        }
    }

    const modifaddressProfil = async () => {
        try {
            const inputAddress = document.querySelector('.input-modification-profil-adresse');
            const newAddress = inputAddress.value; // Récupère la valeur de l'input
            await editAddressUser(user.id, newAddress); // Appel à l'API avec la nouvelle valeur
            setUser({ ...user, addressString: newAddress }); // Met à jour l'état local avec le nouveau nom

        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'état :", error);
        }
    }

    const modifrefferalCodeProfil = async () => {
        try {
            const inputReferalCode = document.querySelector('.input-modification-profil-code-de-parrainage');
            const newReferalCode = inputReferalCode.value; // Récupère la valeur de l'input
            await editRefferalCodeUser(user.id, newReferalCode); // Appel à l'API avec la nouvelle valeur
            setUser({ ...user, referralCode: newReferalCode }); // Met à jour l'état local avec le nouveau nom

        } catch (error) {
            console.error("Erreur lors de la mise à jour de l'état :", error);
        }
    }

    return (
        <div className="App">
            <NavBar />
            { user ? (
                <>
            <img src={Client} alt="Background" className="background-image-profil_client" />
            <h1 className="titre-modification-profil">Modification profil client</h1>
            <div className="container-modification-profil">
                <div className="container-modification-profil-gauche">
                    <h2 className="titre-modification-profil-gauche">Informations personnelles</h2>
                    <p className="label-modification-profil-nom">Nom : {user.name}</p>
                    <p className="label-modification-profil-email">Email : {user.email}</p>
                    <p className="label-modification-profil-adresse">Adresse : {user.addressString}</p>
                    <p className="label-modification-profil-code-de-parrainage">Code de parrainage : {user.referralCode}</p>
                </div>
                <div className="container-modification-profil-droite">
                    <h2 className="titre-modification-profil-gauche">Modification des informations</h2>
                    <p className="label-modification-profil-nom">Nom</p>
                    <div className="container-modification-profil-GC">
                        <input type="text" className="input-modification-profil-nom" placeholder={user.name}/>
                        <button className="button-modification-profil" onClick={modifNameProfil}>Enregister</button>
                    </div>
                    <p className="label-modification-profil-email">Email</p>
                    <div className="container-modification-profil-GC">
                        <input type="text" className="input-modification-profil-email" placeholder={user.email}/>
                        <button className="button-modification-profil" onClick={modifemailProfil}>Enregister</button>
                    </div>
                    <p className="label-modification-profil-adresse">Adresse</p>
                    <div className="container-modification-profil-GC">
                        <input type="text" className="input-modification-profil-adresse" placeholder={user.addressString}/>
                        <button className="button-modification-profil" onClick={modifaddressProfil}>Enregister</button>
                    </div>
                    <p className="label-modification-profil-code-de-parrainage">Code de parrainage</p>
                    <div className="container-modification-profil-GC">
                        <input type="text" className="input-modification-profil-code-de-parrainage" placeholder={user.referralCode}/>
                        <button className="button-modification-profil" onClick={modifrefferalCodeProfil}>Enregister</button>
                    </div>
                </div>
            </div>
                </>

                ) : (
                    <p>Chargement des informations...</p>
                )}





            <Footer />
        </div>
    );
}

export default ModifProfilClient;
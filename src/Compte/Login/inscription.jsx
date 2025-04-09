import React, {useRef, useState} from 'react';
import './inscription.css';
import NavBar from '../../Navbar/NavBar.jsx';
import Footer from '../../Footer/Footer.jsx';
import Marbre from '../../assets/img/marbre.jpg';
import {registerUser, createRestaurant, loginUser, addDocumentRestaurant} from '../../api/api.jsx';
import {useNavigate} from "react-router-dom";

function Inscription() {
    const [statut, setStatut] = useState('');
    const [img64, setImg64] = useState('');
    const navigate = useNavigate();


    const hanleBanniere = (event) => {
        event.preventDefault();
        const fileInput = document.createElement('input');
        fileInput.type = 'file';
        fileInput.accept = 'image/*';
        fileInput.onchange = (event) => {
            const file = event.target.files[0];
            if (file) {
                const reader = new FileReader();
                reader.onload = (e) => {
                    setImg64(e.target.result); // Convertit l'image en base64
                };
                reader.readAsDataURL(file);
            }
        };
        fileInput.click();
    }

    // Références pour les champs
    const nomRef = useRef();
    const emailRef = useRef();
    const passwordRef = useRef();
    const adresseRef = useRef();
    const codeParrainageRef = useRef();
    const siretRef = useRef();
    const ibanRef = useRef();
    const descRef = useRef();

    const handleInscription = async (event) => {
        event.preventDefault();

        const nom = nomRef.current.value;
        const email = emailRef.current.value;
        const password = passwordRef.current.value;
        const adresse = adresseRef.current.value;
        const codeParrainage = codeParrainageRef.current?.value || '';
        const Siret = siretRef.current?.value || '';
        const IBAN = ibanRef.current?.value || '';
        const description = descRef.current?.value || '';

        console.log(
            `Nom: ${nom}, Email: ${email}, Password: ${password}, Adresse: ${adresse}, Statut: ${statut}, SIRET: ${Siret}, IBAN: ${IBAN}, Code de parrainage: ${codeParrainage}, Image de la bannière: ${img64}`
        );

        const data = await registerUser(nom, email, password, statut, adresse, codeParrainage, Siret, IBAN);
        await loginUser(email, password);
        if (statut === "restaurateur") {
            const data2 = await createRestaurant(nom, adresse, email, description, data.user.id);
            console.log(data2);
            await addDocumentRestaurant(data2.id, 'Banniere', img64);
        }

        navigate("/");
    };

    return (
        <div className="App">
            <NavBar />
            <img src={Marbre} alt="Background" className="background-image-inscription" />

            <h1 className="titre-inscription">S'inscrire</h1>
            <div className={"liste-info"}>
                <form className={"form-inscription"}>
                    <label htmlFor="nom">Nom</label>
                    <input type="nom" id="nom" name="nom" placeholder="Votre nom" ref={nomRef} required />
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="Votre email" ref={emailRef} required />
                    <label htmlFor="password">Mot de passe</label>
                    <input type="password" id="password" name="password" placeholder="Votre mot de passe" ref={passwordRef} required />
                    <label htmlFor="adresse">Adresse</label>
                    <input type="adresse" id="adresse" name="adresse" placeholder="Votre adresse" ref={adresseRef} required />
                    <label htmlFor="statut">Statut</label>
                    <select id="statut" name="statut" required onChange={(e) => setStatut(e.target.value)}>
                        <option value="">Sélectionnez un statut</option>
                        <option value="client">Client</option>
                        <option value="livreur">Livreur</option>
                        <option value="restaurateur">Restaurant</option>
                    </select>
                    {statut === "restaurateur" && <button className="bannière" onClick={hanleBanniere}>Bannière</button>}
                    {statut === "restaurateur" && <label htmlFor="Desc">Description du restaurant</label>}
                    {statut === "restaurateur" && <input type="Desc" id="Desc" name="Desc" placeholder="Description" ref={descRef} required />}
                    {statut === "restaurateur" && <label htmlFor="SIRET">SIRET</label>}
                    {statut === "restaurateur" && <input type="SIRET" id="SIRET" name="SIRET" placeholder="SIRET" ref={siretRef} required />}
                    {statut === "restaurateur" && <label htmlFor="IBAN">IBAN</label>}
                    {statut === "restaurateur" && <input type="IBAN" id="IBAN" name="IBAN" placeholder="IBAN" ref={ibanRef} required />}
                    {statut === "livreur" && <label htmlFor="SIRET">SIRET</label>}
                    {statut === "livreur" && <input type="SIRET" id="SIRET" name="SIRET" placeholder="SIRET" ref={siretRef} required />}
                    {statut === "livreur" && <label htmlFor="IBAN">IBAN</label>}
                    {statut === "livreur" && <input type="IBAN" id="IBAN" name="IBAN" placeholder="IBAN" ref={ibanRef} required />}
                    <label htmlFor="code-parrainage">Code de parrainage</label>
                    <input type="code-parrainage" id="code-parrainage" name="code-parrainage" placeholder="Code de parrainage" />
                    <button className={"inscription-button"} onClick={handleInscription} type="submit">S'inscrire</button>
                </form>
            </div>
            <Footer />
        </div>
    );
}

export default Inscription;
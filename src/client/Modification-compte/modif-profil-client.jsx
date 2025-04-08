import React, {useState} from 'react';
import './modif-profil-client.css';
import NavBar from '../../Navbar/NavBar.jsx';
import Footer from '../../Footer/Footer.jsx';
import Client from '../../assets/img/humain.jpg'


function ModifProfilClient() {

    const [items] = useState(
        { id: 1, name: 'Alex G.', adresse: '25 rue de la paix', email: 'axel.g@gmail.com', codeParrainage: 'Client',}
    );

    return (
        <div className="App">
            <NavBar />
            <img src={Client} alt="Background" className="background-image-profil_client" />
            <h1 className="titre-modification-profil">Modification profil client</h1>
            <div className="container-modification-profil">
                <div className="container-modification-profil-gauche">
                    <h2 className="titre-modification-profil-gauche">Informations personnelles</h2>
                    <p className="label-modification-profil-nom">Nom : {items.name}</p>
                    <p className="label-modification-profil-email">Email : {items.email}</p>
                    <p className="label-modification-profil-adresse">Adresse : {items.adresse}</p>
                    <p className="label-modification-profil-code-de-parrainage">Code de parrainage : {items.codeParrainage}</p>
                </div>
                <div className="container-modification-profil-droite">
                    <h2 className="titre-modification-profil-gauche">Modification des informations</h2>
                    <p className="label-modification-profil-nom">Nom</p>
                    <input type="text" className="input-modification-profil-nom" placeholder={items.name}/>
                    <p className="label-modification-profil-email">Email</p>
                    <input type="text" className="input-modification-profil-email" placeholder={items.email}/>
                    <p className="label-modification-profil-adresse">Adresse</p>
                    <input type="text" className="input-modification-profil-adresse" placeholder={items.adresse}/>
                    <p className="label-modification-profil-code-de-parrainage">Code de parrainage</p>
                    <input type="text" className="input-modification-profil-code-de-parrainage" placeholder={items.codeParrainage}/>
                    <button className="button-modification-profil">Enregister</button>
                </div>
            </div>






            <Footer />
        </div>
    );
}

export default ModifProfilClient;
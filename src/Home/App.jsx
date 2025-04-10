import React, {useEffect, useState} from 'react';
import {BrowserRouter as Router, Route, Routes, useLocation, useNavigate} from 'react-router-dom';
import './App.css';
import NavBar from '../Navbar/NavBar';
import Footer from '../Footer/Footer';
import RestaurantMenu from '../Restaurant/menu/restaurant-menu.jsx';
import Inscription from "../Compte/Login/inscription.jsx";
import Connexion  from "../Compte/Login/connexion.jsx";
import Panier from "../Panier/panier.jsx";
import RestaurantModifMenu from "../Restaurant/modifier_menu/restaurant-modif-menu.jsx";
import Paiement from "../Panier/paiement.jsx";
import RestaurantGestionCommande from "../Restaurant/gestion_commande/restaurant-gestion-commande.jsx";
import CommandeLivreur from "../Livreur/Commande/commande-livreur.jsx";
import RestaurantDetailsCommande from "../DetailCommande/detail-commande.jsx";
import LivreurDetailsCommande from "../Livreur/Commande/details-commande-livreur.jsx";
import DeveloppeurProfil from "../developpeur/profil-developpeur.jsx";
import RestaurantStatistique from "../Restaurant/statistique/restaurant-statistique.jsx";
import ClientProfil from "../client/profil-client.jsx";
import ServiceTechnique from "../Compte/technique/service-technique.jsx";
import ServiceCommercialInfo from "../ServiceCommercial/ServiceCommercial-info.jsx";
import SCGestionClient from "../ServiceCommercial/SCGestionClient.jsx";
import RestaurantProfil from "../Restaurant/profil-restaurant/profil-restaurant.jsx";
import ModifierProfilClient from "../client/Modification-compte/modif-profil-client.jsx";
import LivreurProfil from "../Livreur/profil/profil-livreur.jsx";
import {getAllResto, getBanniereByOwner} from "../api/api.jsx";



function App() {
    const [text, setText] = useState('');
    const [allResto, setAllResto] = useState([]);

    useEffect(() => {
        const fetchRestaurants = async () => {
            try {
                const restaurants = await getAllResto();
                // Ajout des bannières pour chaque restaurant
                const restaurantsWithBanners = await Promise.all(
                    restaurants.map(async (restaurant) => {
                        const banniere = await getBanniereByOwner(restaurant.ownerId);
                        return { ...restaurant, banniere };
                    })
                );

                setAllResto(restaurantsWithBanners);
                console.log("Liste des restaurants récupérée :", restaurantsWithBanners);
            } catch (error) {
                console.error("Erreur lors de la récupération des restaurants :", error);
            }
        };
        fetchRestaurants();
    }, []);

    const filteredItems = allResto.filter(resto => resto.name.toLowerCase().includes(text.toLowerCase()));

    const scrollToRestaurants = () => {
        document.getElementById('liste-resto').scrollIntoView({ behavior: 'smooth' });
    };

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const navigate = useNavigate();

    const handleItemClick = (id) => {
        navigate(`/restaurant/${id}`);
    };



    return (
        <div className="App">
            <NavBar />
            <div className={"content"}>
                <div className="content-overlay">
                    <h1>Découvrez-nous</h1>
                    <p>Une petite faim, faites vous livrer grâce à CES’eat</p>
                    <button onClick={scrollToRestaurants}>Nos restaurants</button>
                </div>
                <img src="src/assets/main_background.jpeg" alt="Background" className="background-image" />
                <p className="below-image">
                    🍽️ CES’eat<br/>
                    –<br/>
                    Votre repas livré en un clic !<br/>
                    CES’eat est l’application idéale pour commander vos plats préférés où que vous soyez. Grâce à un large
                    choix de restaurants partenaires – pizzas, sushis, burgers, plats traditionnels et bien plus encore –
                    profitez d’une livraison rapide et sécurisée directement à votre porte. Suivez votre commande en temps
                    réel, bénéficiez d’offres exclusives et découvrez de nouveaux établissements près de chez vous.<br/>
                    Nos frais de livraison sont transparents et adaptés à chaque commande, avec des options de livraison
                    express ou à moindre coût selon vos besoins. De plus, avec notre programme de fidélité, cumulez des
                    points à chaque commande et échangez-les contre des réductions ou des livraisons gratuites. Que ce soit
                    pour un déjeuner rapide ou un dîner gourmand, CES’eat vous simplifie la vie en quelques clics ! 🚀🍔🍕
                </p>

                <div id="liste-resto" className="liste-resto">
                    <p className="label-list-resto">Liste de nos restaurants</p>
                    <div className="input-container">
                        <input type="text" value={text} onChange={handleChange} />
                    </div>
                    <div className="content-boxs">
                        {filteredItems.map(item => (
                            <div key={item.id} className="bento-box-item" onClick={() => handleItemClick(item.id)}>
                                {item.banniere ? (
                                    <img src={item.banniere.data} alt={item.title} />
                                ) : (
                                    <img src="src/assets/default.png" alt="Default" />
                                )}
                                <p className="bento-box-item-content titre-resto">{item.name}</p>
                                <p className="separate">-</p>
                                <p className="bento-box-item-content">{item.description}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <Footer />
        </div>
    );
}
function ScrollToTop() {
    const { pathname } = useLocation();

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);

    return null;
}
function AppWrapper() {
    return (
            <Router>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<App />} />
                    <Route path="/restaurant/:id" element={<RestaurantMenu />} />
                    <Route path="/inscription" element={<Inscription />} />
                    <Route path="/connexion" element={<Connexion />} />
                    <Route path="/panier" element={<Panier />} />
                    <Route path="/restaurant/modification-menu/:id" element={<RestaurantModifMenu />} />
                    <Route path="/restaurant/commande/:id" element={<RestaurantGestionCommande />} />
                    <Route path="/paiement" element={<Paiement />} />
                    <Route path="/livreur-commande" element={<CommandeLivreur />} />
                    <Route path="/livreur/details-commande" element={<LivreurDetailsCommande />} />
                    <Route path="/restaurant/details-commande/:id" element={<RestaurantDetailsCommande />} />
                    <Route path="/developpeur/profil-developpeur" element={<DeveloppeurProfil />} />
                    <Route path="/restaurant/statistique/:id" element={<RestaurantStatistique />} />
                    <Route path="/client/profil-client" element={<ClientProfil />} />
                    <Route path="/service-technique" element={<ServiceTechnique />} />
                    <Route path="/service-commercial" element={<ServiceCommercialInfo />} />
                    <Route path="/service-commercial/gestion-compte" element={<SCGestionClient />} />
                    <Route path="/restaurant/profil-restaurant" element={<RestaurantProfil />} />
                    <Route path="/service-commercial/modification-compte-client" element={<ModifierProfilClient />} />
                    <Route path="/livreur/profil-livreur" element={<LivreurProfil />} />
                </Routes>
            </Router>

    );
}
export default AppWrapper;
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


function App() {
    const [text, setText] = useState('');
    const [items] = useState([
        { id: 1, title: 'Big Bite Burger', description: 'Savourez des burgers gourmands et généreux, composés de viande fraîche, de pains moelleux et d’ingrédients de qualité.', image: 'src/assets/img/burger.jpg' },
        { id: 2, title: 'Bella Pizza', description: 'Découvrez l’authenticité de l’Italie avec nos pizzas artisanales, préparées avec des ingrédients frais et une pâte croustillante faite maison.', image: 'src/assets/img/pasta.jpg' },
        { id: 3, title: 'Sakura Sushi', description: 'Plongez dans l’élégance japonaise avec nos sushis raffinés, préparés à la perfection pour une expérience gustative unique.', image: 'src/assets/img/pizza.jpg' },
        { id: 4, title: 'Pasta Fresca', description: 'Voyagez en Italie avec nos délicieuses pâtes fraîches, cuisinées avec amour et accompagnées de sauces maison savoureuses.', image: 'src/assets/img/sushi.jpeg' }
    ]);
    const filteredItems = items.filter(item => item.title.toLowerCase().includes(text.toLowerCase()));

    const scrollToRestaurants = () => {
        document.getElementById('liste-resto').scrollIntoView({ behavior: 'smooth' });
    };

    const handleChange = (event) => {
        setText(event.target.value);
    };

    const navigate = useNavigate();

    const handleItemClick = (id) => {
        if (id === 1) {
            navigate('/restaurant');
        }
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
                                <img src={item.image} alt={item.title} />
                                <p className="bento-box-item-content titre-resto">{item.title}</p>
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
                <Route path="/restaurant" element={<RestaurantMenu />} />
                <Route path="/inscription" element={<Inscription />} />
                <Route path="/connexion" element={<Connexion />} />
                <Route path="/panier" element={<Panier />} />
                <Route path="/restaurant/modification-menu" element={<RestaurantModifMenu />} />
                <Route path="/restaurant/commande" element={<RestaurantGestionCommande />} />
                <Route path="/paiement" element={<Paiement />} />
                <Route path="/livreur-commande" element={<CommandeLivreur />} />
                <Route path="/livreur/details-commande" element={<LivreurDetailsCommande />} />
                <Route path="/restaurant/details-commande" element={<RestaurantDetailsCommande />} />
                <Route path="/developpeur/profil-developpeur" element={<DeveloppeurProfil />} />
                <Route path="/restaurant/statistique" element={<RestaurantStatistique />} />
                <Route path="/client/profil-client" element={<ClientProfil />} />
            </Routes>
        </Router>
    );
}
export default AppWrapper;
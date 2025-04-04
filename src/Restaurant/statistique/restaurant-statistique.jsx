import React from 'react';
import './restaurant-statistique.css';
import NavBar from '../../Navbar/NavBar.jsx';
import Footer from '../../Footer/Footer.jsx';
import ImgResto from '../../assets/img/burger.jpg';
import { Line } from "react-chartjs-2";
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from "chart.js";

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

function RestaurantStatistique() {


        const data = {
            labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
            datasets: [
                {
                    label: "Chiffre d'affaires par jour",
                    data: [30, 50, 40, 80, 70, 100, 90, 85, 88, 92, 95, 80],
                    borderColor: "blue",
                    backgroundColor: "rgba(0, 123, 255, 0.2)",
                    borderWidth: 2,
                    tension: 0.4,
                },
                {
                    label: "Nombre de commandes par jour",
                    data: [10, 20, 15, 25, 17, 30, 50, 40, 35, 38, 40, 30],
                    borderColor: "purple",
                    backgroundColor: "rgba(128, 0, 128, 0.2)",
                    borderWidth: 2,
                    tension: 0.4,
                },
            ],
        };


        return (
            <div className="App">
                <NavBar/>
                <img src={ImgResto} alt="Background" className="background-image-modifcarte"/>

                <h1 className="titre-modifcarte">Big Bite Burger</h1>
                <h1 className="titre-statistique">Statistiques du restaurant</h1>
                <h2 className="titre-graphique">Graphique</h2>
                <div className="graphique-global">
                    <div className="legende-graphique">
                        <p>Légende :    </p>
                        <p className="ca">- Chiffre d'affaires (€)</p>
                        <p className="nbcommande">- Nombre de commandes</p>
                    </div>
                    <div>
                        <Line data={data} className={"graphique"}/>
                        <p className="description-graphique">Jours</p>
                    </div>
                </div>

                <Footer/>
            </div>
        );

}

export default RestaurantStatistique;
import React, {useEffect} from 'react';
import './restaurant-statistique.css';
import NavBar from '../../Navbar/NavBar.jsx';
import Footer from '../../Footer/Footer.jsx';
import ImgResto from '../../assets/img/burger.jpg';
import { Line } from "react-chartjs-2";
import { Chart, LineElement, CategoryScale, LinearScale, PointElement, Tooltip } from "chart.js";
import {getAllOrder, getRestaurantById, getUser} from "../../api/api.jsx";

Chart.register(LineElement, CategoryScale, LinearScale, PointElement, Tooltip);

function RestaurantStatistique() {

        const user = JSON.parse(localStorage.getItem('user'));
        const [chartData, setChartData] = React.useState({
            labels: [],
            datasets: [],
        });

        useEffect(() => {
            const fetchtOrder_fini = async () => {
                try {
                    const orders = await getAllOrder(); // Récupère toutes les commandes
                    const ordersFilter = orders.filter((item) => item.status === 'Livrée');
                    const ordersWithUsers = await Promise.all(
                        ordersFilter.map(async (order) => {
                            const restaurantUser = await getRestaurantById(order.restaurantId);
                            const clientUser = await getUser(order.clientId);
                            return {
                                ...order,
                                restaurantUser,
                                clientUser,
                            };
                        })
                    );

                    const groupedOrders = ordersWithUsers.reduce((acc, order) => {
                        const date = order.createdAt.slice(0, 10);
                        if (!acc[date]) {
                            acc[date] = { date, totalPrice: 0, orders: 0 };
                        }
                        acc[date].totalPrice += parseFloat(order.price);
                        acc[date].orders += 1;
                        return acc;
                    }, {});

                    const currentMonth = new Date().getMonth() + 1;
                    const groupedOrdersArray = Object.values(groupedOrders).filter(order => {
                        const orderMonth = parseInt(order.date.split('-')[1], 10);
                        return orderMonth === currentMonth;
                    }).map(order => {
                        const day = order.date.split('-')[2];
                        return {
                            day,
                            totalPrice: order.totalPrice,
                            orders: order.orders,
                        };
                    }).sort((a, b) => a.day - b.day);

                    // Mettre à jour les données du graphique
                    const labels = groupedOrdersArray.map(order => order.day);
                    const totalPriceData = groupedOrdersArray.map(order => order.totalPrice);
                    const ordersData = groupedOrdersArray.map(order => order.orders);

                    setChartData({
                        labels,
                        datasets: [
                            {
                                label: "Chiffre d'affaires par jour",
                                data: totalPriceData,
                                borderColor: "blue",
                                backgroundColor: "rgba(0, 123, 255, 0.2)",
                                borderWidth: 2,
                                tension: 0.4,
                            },
                            {
                                label: "Nombre de commandes par jour",
                                data: ordersData,
                                borderColor: "purple",
                                backgroundColor: "rgba(128, 0, 128, 0.2)",
                                borderWidth: 2,
                                tension: 0.4,
                            },
                        ],
                    });
                } catch (error) {
                    console.error("Erreur lors de la récupération de l'utilisateur :", error);
                }
            };
            fetchtOrder_fini();
        }, []);


        return (
            <div className="App">
                <NavBar/>
                <img src={ImgResto} alt="Background" className="background-image-modifcarte"/>

                <h1 className="titre-modifcarte">{user.name}</h1>
                <h1 className="titre-statistique">Statistiques du restaurant - mois en cours</h1>
                <div className="graphique-global">
                    <div className="legende-graphique">
                        <p>Légende :    </p>
                        <p className="ca">- Chiffre d'affaires (€)</p>
                        <p className="nbcommande">- Nombre de commandes</p>
                    </div>
                    <div>
                        <Line data={chartData} className={"graphique"}/>
                        <p className="description-graphique">Jours</p>
                    </div>
                </div>

                <Footer/>
            </div>
        );

}

export default RestaurantStatistique;
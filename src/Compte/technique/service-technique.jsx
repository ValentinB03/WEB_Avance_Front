import React, {useEffect, useState} from 'react';
import './service-technique.css';
import NavBar from '../../Navbar/NavBar.jsx';
import Footer from '../../Footer/Footer.jsx';
import ImgBannier from '../../assets/img/Image22.png';
import {getLogs, getSystemHealth} from "../../api/api.jsx";

function ServiceTechnique() {

    const [logs, setLogs] = useState([]);
    const [systemHealth, setSystemHealth] = useState(null);

    useEffect(() => {
        const fetchLogs = async () => {
            try {
                const response = await getLogs(); // Assuming you have a function to fetch logs
                setLogs(response);
                const response2 = await getSystemHealth(); // Assuming you have a function to fetch system health
                setSystemHealth(response2);
                console.log("Logs récupérés :", response);
            } catch (error) {
                console.error("Erreur lors de la récupération des logs :", error);
            }
        };
        fetchLogs();
        console.log("Statut du système récupéré :", systemHealth);
        // Appel périodique toutes les X secondes (par exemple, 10 secondes)
        const intervalId = setInterval(fetchLogs, 10000);

        // Nettoyage de l'intervalle lors du démontage du composant
        return () => clearInterval(intervalId);
    } , []);

    const downloadLogs = () => {
        const logsText = JSON.stringify(logs, null, 2); // Convert logs to JSON format
        const blob = new Blob([logsText], { type: 'text/plain' }); // Create a Blob object
        const url = URL.createObjectURL(blob); // Generate a temporary URL
        const link = document.createElement('a'); // Create a link element
        link.href = url;
        link.download = 'logs.txt'; // Set the file name
        link.click(); // Trigger the download
        URL.revokeObjectURL(url); // Clean up the URL
    };



    return (
        <div className="App">
            <NavBar/>
            <img src={ImgBannier} alt="Background" className="background-image-modifcarte"/>
            <h1 className="titre-service-technique">Service technique</h1>

            <div className="container-st">
                <div className="content-st">
                    <h2>Gestion des composants réutilisables</h2>
                    <button onClick={() => window.open('https://github.com/Mathieu-Le-Masson/BackAdvancedWeb/tree/main/services', '_blank')}>Ajouter/Supprimer</button>
                </div>
                <div className="content-st">
                    <h2>Consultation des logs</h2>
                    <button onClick={downloadLogs}>Consulter</button>
                </div>
                <div className="content-st">
                    <div className="container-st-statistique">
                        <h2>Statut du système</h2>
                        <div className="system-health">
                            <div className="system-health-auth">
                                <h2>Service authentification</h2>
                                <div className="auth-service">
                                    <p>Service d'authentification : {systemHealth?.services.auth.status}</p>
                                    <p>Durée de vie : {systemHealth?.services.auth.metrics.uptime}</p>
                                    <p>Ram utilisé : {systemHealth?.services.auth.metrics.memory.usage.heapUsed}</p>
                                    <p>CPU utilisé : {systemHealth?.services.auth.metrics.cpu.load[2]*100}%</p>
                                </div>
                            </div>
                            <div className="system-health-restaurant">
                                <h2>Service restaurant</h2>
                                <div className="restaurant-service">
                                    <p>Service de restaurant : {systemHealth?.services.restaurant.status}</p>
                                    <p>Durée de vie : {systemHealth?.services.restaurant.metrics.uptime}</p>
                                    <p>Ram utilisé : {systemHealth?.services.restaurant.metrics.memory.usage.heapUsed}</p>
                                    <p>CPU utilisé : {systemHealth?.services.restaurant.metrics.cpu.load[2]*100}%</p>
                                </div>
                            </div>
                            <div className="system-health-orders">
                                <h2>Service de commande</h2>
                                <div className="orders-service">
                                    <p>Service de commande : {systemHealth?.services.orders.status}</p>
                                    <p>Durée de vie : {systemHealth?.services.orders.metrics.uptime}</p>
                                    <p>Ram utilisé : {systemHealth?.services.orders.metrics.memory.usage.heapUsed}</p>
                                    <p>CPU utilisé : {systemHealth?.services.orders.metrics.cpu.load[2]*100}%</p>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            <Footer/>
        </div>
    );

}

export default ServiceTechnique;
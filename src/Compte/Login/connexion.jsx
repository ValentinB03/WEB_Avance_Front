import React, { useState } from 'react';
import './connexion.css';
import NavBar from '../../Navbar/NavBar.jsx';
import Footer from '../../Footer/Footer.jsx';
import Marbre from '../../assets/img/marbre.jpg';
import { loginUser } from '../../api/api.jsx';
import { useNavigate } from "react-router-dom";

function Connexion() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleSubmit = async () => {
        try {
            const data = await loginUser(email, password);
            const { accessToken, refreshToken, user } = data;
            console.log("Login successful");
            if (accessToken && refreshToken) {
                localStorage.setItem('accessToken', accessToken);
                localStorage.setItem('refreshToken', refreshToken);
                localStorage.setItem('user', JSON.stringify(user));
                navigate("/");
            }
        } catch (error) {
            console.error("Login failed", error);
        }
    }

    return (
        <div className="App">
            <NavBar />
            <img src={Marbre} alt="Background" className="background-image-connexion" />
            <h1 className="titre-connexion">Se connecter</h1>
            <div className={"liste-info"}>
                <div className={"form-connexion"}>
                    <label htmlFor="email">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="Votre email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Mot de passe</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Votre mot de passe"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <button className={"connexion-button"} type="submit" onClick={handleSubmit}>Se connecter</button>
                    <a href={"/inscription"}>S'inscrire</a>
                </div>
            </div>
            <Footer />
        </div>
    );
}

export default Connexion;
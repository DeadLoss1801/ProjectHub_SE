// Login.js
import { Navigate } from 'react-router-dom';
import React, { useState } from 'react';
import axios from 'axios';

const url = `http://localhost:8000/api/login`
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post(url, {
                email, password
            })

            localStorage.setItem('Token', res.data.token);
            localStorage.setItem('LoggedIn', true);
            window.location.href = '/';
        } catch (error) {
            console.log(e.response);
        }
    };

    return (
        <div className="login-container">
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email">Email:</label>
                <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <label htmlFor="password">Password:</label>
                <input
                    type="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit" onClick={handleSubmit}>Login</button>
            </form>
        </div>
    );
};

export default Login;

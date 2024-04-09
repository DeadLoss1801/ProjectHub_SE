// SignUp.js

import React, { useState } from 'react';
import '../styles/signup.css'; // Import the CSS file
import axios from 'axios';

const url = `http://localhost:8000/api/user`
const SignUp = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'user'
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await axios.post(url, formData);
            window.location.href = '/login';
        } catch (error) {
            console.log(error.message);
        }

    };

    return (
        <div className="form-container">
            <h2>Sign Up</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Name:
                    <input type="text" name="name" value={formData.name} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Email:
                    <input type="email" name="email" value={formData.email} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Password:
                    <input type="password" name="password" value={formData.password} onChange={handleChange} required />
                </label>
                <br />
                <label>
                    Role:
                    <select name="role" value={formData.role} onChange={handleChange}>
                        <option value="admin">Admin</option>
                        <option value="developer">Developer</option>
                        <option value="user">User</option>
                    </select>
                </label>
                <br />
                <button type="submit">Sign Up</button>
            </form>
        </div>
    );
};

export default SignUp;

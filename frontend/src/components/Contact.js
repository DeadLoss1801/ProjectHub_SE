// Contact.js

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/contact.css'; // Import the CSS file

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/send-email', formData);
            alert('Email sent successfully');
        } catch (error) {
            console.error('Failed to send email:', error);
            alert('Failed to send email');
        }
    };

    return (
        <div className="contact-container">
            <h2>Contact Us</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />

                <label htmlFor="email">Your Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>

                <button type="submit">Send</button>
            </form>
        </div>
    );
};

export default Contact;

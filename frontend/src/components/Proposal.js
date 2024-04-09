// Proposal.js

import React, { useState } from 'react';
import axios from 'axios';
import '../styles/proposal.css'; // Import the CSS file
const Proposal = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        email: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await axios.post('http://localhost:8000/api/project-proposal', formData);
            alert('Proposal submitted successfully');
        } catch (error) {
            console.error('Failed to submit proposal:', error);
            alert('Failed to submit proposal');
        }
    };

    return (
        <div className="proposal-container">
            <h2>Submit Proposal</h2>
            <form onSubmit={handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />

                <label htmlFor="description">Description:</label>
                <textarea id="description" name="description" value={formData.description} onChange={handleChange} required></textarea>

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />

                <button type="submit">Submit Proposal</button>
            </form>
        </div>
    );
};

export default Proposal;
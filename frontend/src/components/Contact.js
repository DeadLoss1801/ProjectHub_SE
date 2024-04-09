// Contact.js

import React from 'react';

const Contact = () => {
    return (
        <div className="contact-container">
            <h2>Contact Us</h2>
            <div className="contact-form">
                <label htmlFor="name">Name:</label>
                <input type="text" id="name" name="name" placeholder="Your name..." />

                <label htmlFor="email">Email:</label>
                <input type="email" id="email" name="email" placeholder="Your email..." />

                <label htmlFor="message">Message:</label>
                <textarea id="message" name="message" placeholder="Write your message..."></textarea>

                <button type="submit">Send</button>
            </div>
        </div>
    );
};

export default Contact;

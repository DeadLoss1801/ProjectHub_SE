// Home.js

import React from 'react';

const Home = () => {
    return (
        <div className="home-container">
            <header className="hero">
                <h1>Welcome to Our Company</h1>
                <p>Your trusted partner for professional services</p>
            </header>
            <section className="services">
                <h2>Our Services</h2>
                <div className="service">
                    <h3>Web Development</h3>
                    <p>Creating responsive and user-friendly websites</p>
                </div>
                <div className="service">
                    <h3>App Development</h3>
                    <p>Developing mobile and web applications</p>
                </div>
                <div className="service">
                    <h3>iOS Development</h3>
                    <p>Building iOS applications for iPhone and iPad</p>
                </div>
                <div className="service">
                    <h3>DevOps</h3>
                    <p>Implementing and managing DevOps practices</p>
                </div>
                <div className="service">
                    <h3>Blockchain</h3>
                    <p>Developing blockchain solutions for various industries</p>
                </div>
                <div className="service">
                    <h3>DApps</h3>
                    <p>Creating decentralized applications (DApps)</p>
                </div>
            </section>
        </div>
    );
};

export default Home;

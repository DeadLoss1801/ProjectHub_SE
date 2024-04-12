// Dashboard.js

import React, { useEffect, useState, useRef } from 'react';
import '../styles/dashboard.css'; // Import the CSS file
import axios from 'axios';

const Dashboard = () => {

    const [tasks, setTasks] = useState([]);
    const [show, setShow] = useState(true);
    const [project, setProject] = useState();

    const onClickType1 = () => {
        setShow(true);
    }

    const onClickType2 = (task) => {
        setShow(false);
        setProject(task)
    }

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        client: '',
        assignedTo: ''
    });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('Token');
        try {
            await axios.post('http://localhost:8000/api/task', formData, {
                headers: {
                    'authorization': `Bearer ${token}`
                }
            });

            alert('Project assigned successfully');
        } catch (error) {

        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:8000/api/task');
                const result = await response.json();
                setTasks(result)
            } catch (error) {
                console.error('Failed to fetch data:', error);
            }
        }
        fetchData();
    }, [])

    return (
        <>
            <div className='d-1'>
                <div className='dl-1 tab'>
                    <button class="tablinks"
                        style={{ backgroundColor: 'gray', marginTop: '1px' }}
                        onClick={onClickType1}
                    >Assign Project</button>



                    {tasks &&
                        tasks.map((task) => (
                            <button class="tablinks"
                                onClick={() => onClickType2(task)}
                            >{task.title}</button>
                        ))
                    }
                </div>
                {/* ---------------------------------------------------------------- */}
                <div className='dr-1'>

                    {
                        show ?
                            (
                                <div style={{ backgroundColor: 'black', color: 'white', padding: '20px', width: '400px', margin: '0 auto' }}>
                                    <h2>Project Details</h2>
                                    <form onSubmit={handleSubmit}>
                                        <label htmlFor="title">Title:</label>
                                        <input type="text" id="title" name="title" value={formData.title} onChange={handleChange} required />
                                        <br />

                                        <label htmlFor="description">Description:</label>
                                        <textarea id="description" name="description" value={formData.description} onChange={handleChange} required></textarea>
                                        <br />

                                        <label htmlFor="client">Client:</label>
                                        <input type="email" id="client" name="client" value={formData.client} onChange={handleChange} required style={{ width: '100%' }} />
                                        <br />

                                        <label htmlFor="assignedTo">Assigned To:</label>
                                        <input type="email" id="assignedTo" name="assignedTo" value={formData.assignedTo} onChange={handleChange} required style={{ width: '100%' }} />
                                        <br />

                                        <button type="submit">Submit</button>
                                    </form>
                                </div>
                            ) :
                            (
                                <>
                                    <div className="task-details">
                                        <div className="field">
                                            <span className="label">Title:</span>
                                            <span className="value">{project.title}</span>
                                        </div>
                                        <div className="field">
                                            <span className="label">Description:</span>
                                            <span className="value">{project.description}</span>
                                        </div>
                                        <div className="field">
                                            <span className="label">Client:</span>
                                            <span className="value">{project.createdBy}</span>
                                        </div>
                                        <div className="field">
                                            <span className="label">Assigned To:</span>
                                            <span className="value">{project.assignedTo}</span>
                                        </div>
                                    </div></>
                            )
                    }
                </div>

            </div>
        </>
    );
};

export default Dashboard;

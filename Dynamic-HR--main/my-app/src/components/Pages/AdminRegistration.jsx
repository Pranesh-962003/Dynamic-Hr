import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import './AdminRegister.css'; // Import the CSS file

const Registration = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        salary: '',
        address: '',
        category: '',
        position: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/register', formData, { withCredentials: true });
            if (response.data.Status) {
                toast.success("Registration successful!");
                navigate('/');
            } else {
                toast.error("Registration failed. Please try again.");
            }
        } catch (error) {
            console.error("Error during registration:", error);
            toast.error("An error occurred. Please try again later.");
        }
    };

    return (
        <div className="registration-container">
            <div className="form-card">
                <h2>Register</h2>
                <form onSubmit={handleSubmit} className="form-grid">
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" name="name" value={formData.name} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">Password</label>
                        <input type="password" id="password" name="password" value={formData.password} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="salary">Salary</label>
                        <input type="number" id="salary" name="salary" value={formData.salary} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="address">Address</label>
                        <input type="text" id="address" name="address" value={formData.address} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="category">Category</label>
                        <input type="text" id="category" name="category" value={formData.category} onChange={handleChange} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="position">Position</label>
                        <input type="text" id="position" name="position" value={formData.position} onChange={handleChange} required />
                    </div>
                    <div className="button-container">
                        <button type="submit" className="submit-button">Register</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Registration;
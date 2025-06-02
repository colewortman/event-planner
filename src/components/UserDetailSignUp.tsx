import React from 'react';
import { useState } from 'react';
import { createUserDetail } from '../services/userService';
import { Link, useNavigate } from 'react-router-dom'

const UserDetailSignUp: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await createUserDetail({ user_detail_username: username, user_detail_password: password, user_detail_email: email });
            alert("Sign up successful! You can now sign in.");
            navigate('/users');
        } catch (error) {
            console.error("Error creating user detail:", error);
        }
    };

    return (
        <div>
            <h1>User Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <div>
                    <label>Email:</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <button type="submit">Sign Up</button>
            </form>
            <h1>Already have an account?</h1>
            <p>
                <Link to="/users">Sign In</Link>
            </p>
        </div>
    );
};

export default UserDetailSignUp;
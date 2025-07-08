import React from 'react';
import { useState } from 'react';
import { createUserDetail } from '../services/userService';
import { Link, useNavigate } from 'react-router-dom';
import styles from './UserDetailSign.module.css';
import BlurText from './BlurText';

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

    const handleAnimationComplete = () => {
        // Handle any actions after the animation completes
        console.log("Animation completed");
    };

    return (
        <div>
            <div className='banner'>
                <div className='title'>
                    <BlurText
                        text="Event Planner"
                        delay={150}
                        animateBy="letters"
                        direction="top"
                        onAnimationComplete={handleAnimationComplete}
                        className="text-2xl mb-8"
                    />
                </div>
                
                <div className='links' onClick={() => navigate("/users/profile")}>
                    <BlurText
                        text="Profile"
                        delay={150}
                        animateBy="letters"
                        direction="top"
                        onAnimationComplete={handleAnimationComplete}
                        className="text-2xl mb-8"
                    />
                </div>
                <div className='links' onClick={() => navigate("/users")}>
                    <BlurText
                        text="Sign In"
                        delay={150}
                        animateBy="letters"
                        direction="top"
                        onAnimationComplete={handleAnimationComplete}
                        className="text-2xl mb-8"
                    />
                </div>
                <div className='links' onClick={() => navigate("/")}>
                    <BlurText
                        text="Events"
                        delay={150}
                        animateBy="letters"
                        direction="top"
                        onAnimationComplete={handleAnimationComplete}
                        className="text-2xl mb-8"
                    />
                </div>
            </div>
            <div className='mainContent'>
                <div className={styles.formContainer}>
                    <form className={styles.formBox} onSubmit={handleSubmit}>
                        <h1>User Sign Up</h1>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                        <label>Email:</label>
                        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                        <button type="submit">Sign Up</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserDetailSignUp;
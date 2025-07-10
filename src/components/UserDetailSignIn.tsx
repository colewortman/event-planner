import React, { useState, useContext } from "react";
import { getUserDetailByUsername } from "services/userService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "components/UserContext";
import styles from "./UserDetailSign.module.css";
import BlurText from "./BlurText";

const UserDetailSignIn: React.FC = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const userContext = useContext(UserContext);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await getUserDetailByUsername(username);
            if (response.data && response.data.user_detail_password === password) {
                userContext.setUserId(response.data.user_detail_id);
                navigate('/');
            }
        } catch (error) {
            console.error("Error signing in:", error);
            alert("Invalid username or password. Please try again.");
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
                <div className='links' onClick={() => navigate("/users/signup")}>
                    <BlurText
                        text="Sign Up"
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
                <div className='links' onClick={() => navigate("/users")}>
                    <BlurText
                        text="Sign Out"
                        delay={150}
                        animateBy="letters"
                        direction="top"
                        onAnimationComplete={handleAnimationComplete}
                        className="text-2xl mb-8"
                    />
                </div>
            </div>
            <div className="mainContent">
                <div className={styles.formContainer}>
                    <form className={styles.formBox} onSubmit={handleSubmit}>
                        <h1 className={styles.formTitle}>User Sign In</h1>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />

                        <button type="submit">Sign In</button>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default UserDetailSignIn;
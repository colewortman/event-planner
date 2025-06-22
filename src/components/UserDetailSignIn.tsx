import React, { useState, useContext } from "react";
import { getUserDetailByUsername } from "services/userService";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "components/UserContext";

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
                navigate('/events');
            }
        } catch (error) {
            console.error("Error signing in:", error);
            alert("Invalid username or password. Please try again.");
        }
    };
    return (
        <div>
            <h1>User Sign In</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username:</label>
                    <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                </div>
                <div>
                    <label>Password:</label>
                    <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                <button type="submit">Sign In</button>
            </form>
            <h1>Don't have an account?</h1>
            <p>
                <Link to="/users/signup">Sign Up</Link>
            </p>
        </div>
    );
};
export default UserDetailSignIn;
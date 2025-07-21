import React, { useContext, useEffect, useState } from "react";
import { getUserDetail } from "services/userService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "components/UserContext";
import { updateUserDetail } from "services/userService";
import BlurText from "./BlurText";

const UserDetailUpdate: React.FC = () => {
    const userContext = useContext(UserContext);
    const userId = userContext.userId;
    const [userDetail, setUserDetail] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (userId === null) return;
        getUserDetail(userId)
            .then(response => setUserDetail(response.data))
            .catch(error => {
                console.error("Error fetching user detail:", error);
            });
    }, [userId]);

    useEffect(() => {
        if (userId === null) {
            navigate("/users");
        }
    }, [userId, navigate]);

    if (userId === null || userDetail === null) {
        return null;
    }

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        updateUserDetail(userId, userDetail)
        navigate("/users/profile");
    };

    const handleSignOut = () => {
        userContext.setUserId(null);
        navigate("/users");
    };

    const handleAnimationComplete = () => {
        // Handle any actions after the animation completes
    };

    return (
        <div>
            <div className='banner'>
                <div className='title'>
                    <BlurText
                        text="Edit Profile"
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
                <div className='links' onClick={() => handleSignOut()}>
                    <BlurText
                        text={userId === null ? "Sign In" : "Sign Out"}
                        delay={150}
                        animateBy="letters"
                        direction="top"
                        onAnimationComplete={handleAnimationComplete}
                        className="text-2xl mb-8"
                    />
                </div>
            </div>
            <div className="mainContent">
                <h1>User Profile Update</h1>
                <form onSubmit={handleUpdate}>
                    <div>
                        <label>Username:</label>
                        <input
                            type="text"
                            value={userDetail.user_detail_username}
                            onChange={(e) => setUserDetail({ ...userDetail, user_detail_username: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input
                            type="email"
                            value={userDetail.user_detail_email}
                            onChange={(e) => setUserDetail({ ...userDetail, user_detail_email: e.target.value })}
                        />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input
                            type="password"
                            value={userDetail.user_detail_password}
                            onChange={(e) => setUserDetail({ ...userDetail, user_detail_password: e.target.value })}
                        />
                    </div>
                    <button type="submit">Update Profile</button>
                </form>
            </div>
        </div>
    );
};

export default UserDetailUpdate;
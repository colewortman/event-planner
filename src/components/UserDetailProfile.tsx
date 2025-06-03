import React, { useContext, useEffect, useState } from "react";
import { getUserDetail } from "services/userService";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "components/UserContext";

const UserDetailProfile: React.FC = () => {
    const userContext = useContext(UserContext);
    const userId = userContext.userId;
    
    const [userDetail, setUserDetail] = useState({
        user_detail_id: 0,
        user_detail_username: "",
        user_detail_email: "",
    });

    useEffect(() => {
        if (userId) {
            getUserDetail(userId)
                .then(response => {
                    setUserDetail(response.data);
                })
                .catch(error => {
                    console.error("Error fetching user detail:", error);
                });
        } else if (userId === null) { 
            console.log("User ID is null, redirecting to sign in page.");
            <Navigate to="/users" replace />; 
        }
    }, [userId]);

    return (
        <div>
            <h1>User Profile</h1>
            <p><strong>Username:</strong> {userDetail.user_detail_username}</p>
            <p><strong>Email:</strong> {userDetail.user_detail_email}</p>=
            <Link to="/events">Events</Link>
        </div>
    );
};
export default UserDetailProfile;
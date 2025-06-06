import React, { useContext, useEffect, useState } from "react";
import { getUserDetail } from "services/userService";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "components/UserContext";
import { getEventsByUser } from "services/eventuserService";
import { getEventDetail } from "services/eventService";

const UserDetailProfile: React.FC = () => {
    const userContext = useContext(UserContext);
    const userId = userContext.userId;
    const [events, setEvents] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    
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
            getEventsByUser(userId)
                .then(async (res) => {
                    const eventIds = res.data.map((e: any) => e.event_detail_id);
                    // Fetch all event details in parallel
                    const eventDetails = await Promise.all(
                    eventIds.map((id: number) => getEventDetail(id).then(res => res.data))
                    );
                    setEvents(eventDetails);
                })
                .catch((err) => {
                    console.error("Error fetching user's events:", err);
                })
                .finally(() => setLoading(false));
        } else if (userId === null) { 
            console.log("User ID is null, redirecting to sign in page.");
            <Navigate to="/users" replace />; 
        }
    }, [userId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <div>
                <h1>User Profile</h1>
                <p><strong>Username:</strong> {userDetail.user_detail_username}</p>
                <p><strong>Email:</strong> {userDetail.user_detail_email}</p>
                <Link to="/events">Events</Link>
            </div>
            <div>
                <h2>Your Events</h2>
                <ul>
                    {events.length > 0 ? (
                        events.map(event => (
                            <li key={event.event_detail_id}>
                                <p><strong>Event:</strong> {event.event_detail_name}</p>
                                <p>{event.event_detail_description}</p>
                            </li>
                        ))
                    ) : (
                        <li>No events found for this user.</li>
                    )}
                </ul>
            </div>
        </div>
    );
};
export default UserDetailProfile;
import React, { useContext, useEffect, useState } from "react";
import { getUserDetail } from "services/userService";
import { Link, Navigate } from "react-router-dom";
import { UserContext } from "components/UserContext";
import { getEventsByUser, deleteEventUser } from "services/eventuserService";
import { getEventDetail, deleteEventDetail } from "services/eventService";

const UserDetailProfile: React.FC = () => {
    const userContext = useContext(UserContext);
    const userId = userContext.userId;
    const [events, setEvents] = useState<any[]>([]);
    
    const [userDetail, setUserDetail] = useState({
        user_detail_id: 0,
        user_detail_username: "",
        user_detail_email: "",
    });

    useEffect(() => {
        if (userId === null) return;
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
                const eventDetails = await Promise.all(
                eventIds.map((id: number) => getEventDetail(id).then(res => res.data))
                );
                setEvents(eventDetails);
            })
            .catch((err) => {
                console.error("Error fetching user's events:", err);
            })
    }, [userId]);

    if (userId === null) {
        return <Navigate to="/users" replace />;
    }

    const handleDelete = async (id: number) => {
        deleteEventDetail(id)
            .then(() => {
                setEvents(prevDetails => prevDetails.filter(event => event.event_detail_id !== id));
            });
    };

    const handleLeave = (id: number) => {
        if (userId !== null) {
            deleteEventUser(id, userId).catch(error => {
                console.error("Error leaving event:", error);
            }).then(() => {
                setEvents(prevEvents => prevEvents.filter(event => event.event_detail_id !== id));
            });
        }
    };

    return (
        <div>
            <div>
                <h1>User Profile</h1>
                <p><strong>Username:</strong> {userDetail.user_detail_username}</p>
                <p><strong>Email:</strong> {userDetail.user_detail_email}</p>
                <Link to="/">Events</Link>
                <Link to="/events/create">Create Event</Link>
            </div>
            <div>
                <h2>Your Events</h2>
                <ul>
                    {events.length > 0 ? (
                        events.map(event => (
                            <li key={event.event_detail_id}>
                                <p><strong>Event:</strong> {event.event_detail_name}</p>
                                {userId !== null && userId !== event.event_detail_created_by && (
                                    <button onClick={() => handleLeave(event.event_detail_id)}>
                                        Leave
                                    </button>
                                )}
                                {userId !== null && userId === event.event_detail_created_by && (
                                    <button onClick={() => handleDelete(event.event_detail_id)}>
                                        Delete
                                    </button>
                                )}
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
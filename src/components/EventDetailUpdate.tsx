import React, { useEffect, useState, useContext } from 'react';
import { getEventDetail, deleteEventDetail, updateEventDetail } from '../services/eventService';
import { EventDetail } from '../types';
import { useNavigate, useParams } from 'react-router-dom';
import { UserContext } from "components/UserContext";
import BlurText from './BlurText';

const EventDetailUpdate: React.FC = () => {
    const user = useContext(UserContext);
    const userId = user.userId;
    const eventIdParam = useParams<{ eventId: string }>().eventId;
    const eventId = eventIdParam ? parseInt(eventIdParam, 10) : null;
    const [eventDetail, setEventDetail] = useState<EventDetail | null>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (eventId !== null && !isNaN(eventId)) {
            getEventDetail(eventId)
                .then(response => setEventDetail(response.data))
                .catch(error => console.error("Error fetching event detail:", error));
        }
    }, [eventId]);
    useEffect(() => {
        if (userId === null) {
            navigate("/users");
        }
    }, [userId, navigate]);
    if (userId === null || eventDetail === null) {
        return null;
    }

    const handleUpdate = (e: React.FormEvent) => {
        e.preventDefault();
        if (eventDetail && eventId !== null && !isNaN(eventId)) {
            updateEventDetail(eventId, eventDetail)
                .then(() => {
                    navigate("/"); // or your desired page
                })
                .catch(error => {
                    console.error("Error updating event detail:", error);
                });
        }
    };

    const handleDelete = () => {
        if (eventId !== null && !isNaN(eventId)) {
            deleteEventDetail(eventId)
                .then(() => {
                    navigate("/");
                })
                .catch(error => {
                    console.error("Error deleting event detail:", error);
                });
        }
    };

    const handleAnimationComplete = () => {
        // Handle any actions after the animation completes
    };

    const handleSignOut = () => {
        user.setUserId(null);
        navigate("/");
    };

    return (
        <div>
            <div className='banner'>
                <div className='title'>
                    <BlurText
                        text="Create Event"
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
                <form onSubmit={handleUpdate}>
                    <input
                        type="text"
                        value={eventDetail.event_detail_name}
                        onChange={(e) => setEventDetail({ ...eventDetail, event_detail_name: e.target.value })}
                        placeholder="Event Name"
                    />
                    <textarea
                        value={eventDetail.event_detail_description}
                        onChange={(e) => setEventDetail({ ...eventDetail, event_detail_description: e.target.value })}
                        placeholder="Event Description"
                    />
                    <input
                        type="date"
                        value={eventDetail.event_detail_date}
                        onChange={(e) => setEventDetail({ ...eventDetail, event_detail_date: e.target.value })}
                    />
                    <input
                        type="time"
                        value={eventDetail.event_detail_time}
                        onChange={(e) => setEventDetail({ ...eventDetail, event_detail_time: e.target.value })}
                    />
                    <input
                        type="text"
                        value={eventDetail.event_detail_location}
                        onChange={(e) => setEventDetail({ ...eventDetail, event_detail_location: e.target.value })}
                        placeholder="Event Location"
                    />
                    <input
                        type="number"
                        value={eventDetail.event_detail_capacity}
                        onChange={(e) => setEventDetail({ ...eventDetail, event_detail_capacity: parseInt(e.target.value) })}
                        placeholder="Event Capacity"
                    />
                    <button type="submit">Update Event</button>
                </form>
                <button onClick={handleDelete}>Delete Event</button>
            </div>
        </div>
    );
};

export default EventDetailUpdate;
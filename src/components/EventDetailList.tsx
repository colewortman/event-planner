import React, { useEffect, useState } from 'react';
import { getEventDetails, deleteEventDetail } from '../services/eventService';
import { EventDetail } from '../types';
import { Link } from 'react-router-dom';
import { UserContext } from "components/UserContext";
import { createEventUser, getEventsByUser } from 'services/eventuserService';


const EventDetailList: React.FC = () => {
    const [eventDetails, setEventDetails] = useState<EventDetail[]>([]);
    const userId = React.useContext(UserContext).userId;
    const [joinedEventIds, setJoinedEventIds] = useState<number[]>([]);

    useEffect(() => {
        getEventDetails().then(response => {
            setEventDetails(response.data);
        });
        if (userId !== null) {
            getEventsByUser(userId)
                .then(response => {
                    const joinedIds = response.data.map((event: any) => event.event_detail_id);
                    setJoinedEventIds(joinedIds);
                })
                .catch(error => {
                    console.error("Error fetching user's joined events:", error);
                }
            );
        }
    }, [userId]);

    const handleDelete = async (id: number) => {
        deleteEventDetail(id)
            .then(() => {
                setEventDetails(prevDetails => prevDetails.filter(event => event.event_detail_id !== id));
            });
    };

    const handleJoin = (id: number) => {
        createEventUser({
            event_detail_id: id,
            user_detail_id: userId
        }).then(() => {
            setJoinedEventIds(prevIds => [...prevIds, id]);
        }).catch(error => {
            console.error("Error joining event:", error);
        });
    };

    return (
        <div>
            <h1>Event Details</h1>
            <div>
                <p>
                    <Link to="/users/profile">Profile</Link>
                </p>
                <p>
                    <Link to="/users">Sign in</Link>
                </p>
                <p>
                    <Link to="/events/create">Create Event</Link>
                </p>
            </div>
            <ul>
                {eventDetails.map(event => (
                    <li key={event.event_detail_id}>
                        <p>{event.event_detail_id}</p>
                        <p>{event.event_detail_name}</p>
                        {userId !== null && userId !== event.event_detail_created_by && !joinedEventIds.includes(event.event_detail_id) && (
                            <button onClick={() => handleJoin(event.event_detail_id)}>
                                Join
                            </button>
                        )}
                        {userId !== null && userId === event.event_detail_created_by && (
                            <button onClick={() => handleDelete(event.event_detail_id)}>
                                Delete
                            </button>)}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EventDetailList;
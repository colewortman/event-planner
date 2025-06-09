import React, { useEffect, useState } from 'react';
import { getEventDetails, deleteEventDetail } from '../services/eventService';
import { EventDetail } from '../types';
import { Link } from 'react-router-dom';
import { UserContext } from "components/UserContext";


const EventDetailList: React.FC = () => {
    const [eventDetails, setEventDetails] = useState<EventDetail[]>([]);
    const userId = React.useContext(UserContext).userId;

    useEffect(() => {
        getEventDetails().then(response => {
            setEventDetails(response.data);
        });
    }, []);

    const handleDelete = async (id: number) => {
        deleteEventDetail(id)
            .then(() => {
                setEventDetails(prevDetails => prevDetails.filter(event => event.event_detail_id !== id));
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
            </div>
            <ul>
                {eventDetails.map(event => (
                    <li key={event.event_detail_id}>
                        <p>{event.event_detail_id}</p>
                        <p>{event.event_detail_name}</p>
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
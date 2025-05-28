import React, { useEffect, useState } from 'react';
//import { Link } from "react-router-dom";
import { getEventDetails, deleteEventDetail } from '../services/eventService';
import { EventDetail } from '../types';


const EventDetailList: React.FC = () => {
    const [eventDetails, setEventDetails] = useState<EventDetail[]>([]);

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
            <ul>
                {eventDetails.map(event => (
                    <li key={event.event_detail_id}>
                        <p>{event.event_detail_id}</p>
                        <p>{event.event_detail_name}</p>
                        <button onClick={() => handleDelete(event.event_detail_id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default EventDetailList;
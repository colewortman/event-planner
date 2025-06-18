import React, { useEffect, useState } from 'react';
import { getEventDetails, deleteEventDetail } from '../services/eventService';
import { EventDetail } from '../types';
import { Link } from 'react-router-dom';
import { UserContext } from "components/UserContext";
import { createEventUser, getEventsByUser, getUsersByEvent } from 'services/eventuserService';


const EventDetailList: React.FC = () => {
    const [eventDetails, setEventDetails] = useState<EventDetail[]>([]);
    const userId = React.useContext(UserContext).userId;
    const [joinedEventIds, setJoinedEventIds] = useState<number[]>([]);
    const [eventSignups, setEventSignups] = useState<{ [eventId: number]: number }>({});

    useEffect(() => {
        getEventDetails().then(response => {
            setEventDetails(response.data);

            Promise.all(
                response.data.map((event: any) =>
                    getUsersByEvent(event.event_detail_id).then(res => ({
                        eventId: event.event_detail_id,
                        count: res.data.length
                    }))
                )
            ).then(results => {
                const signups: { [eventId: number]: number } = {};
                results.forEach(({ eventId, count }) => {
                    signups[eventId] = count;
                });
                setEventSignups(signups);
            });
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
                {eventDetails.map(event => {
                    const isJoined = joinedEventIds.includes(event.event_detail_id);
                    const isFull = eventSignups[event.event_detail_id] >= event.event_detail_capacity;

                    return (
                        <li key={event.event_detail_id}>
                            <p>{event.event_detail_name}</p>
                            <p>{event.event_detail_description}</p>
                            <p>Joined: {eventSignups[event.event_detail_id]}/{event.event_detail_capacity}</p>
                            <p>Created by: {event.event_detail_created_by}</p>
                            <p>Date: {new Date(event.event_detail_date).toLocaleDateString()}</p>
                            <p>Time: {new Date(event.event_detail_time).toLocaleTimeString()}</p>
                            {userId !== null && userId !== event.event_detail_created_by && !isJoined && !isFull && (
                                <button onClick={() => handleJoin(event.event_detail_id)}>
                                    Join
                                </button>
                            )}
                            {userId !== null && userId === event.event_detail_created_by && (
                                <button onClick={() => handleDelete(event.event_detail_id)}>
                                    Delete
                                </button>
                            )}
                            {isFull && <span>Event is full</span>}
                            {isJoined && <span>Joined</span>}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}

export default EventDetailList;
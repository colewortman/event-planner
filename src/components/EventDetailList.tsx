import React, { useEffect, useState } from 'react';
import { getEventDetails, deleteEventDetail } from '../services/eventService';
import { EventDetail } from '../types';
import { Link } from 'react-router-dom';
import { UserContext } from "components/UserContext";
import { createEventUser, deleteEventUser, getEventsByUser, getUsersByEvent } from 'services/eventuserService';
import styles from './EventDetailList.module.css';
import BlurText from './BlurText';
import { getUserDetail } from 'services/userService';


const EventDetailList: React.FC = () => {
    const [eventDetails, setEventDetails] = useState<EventDetail[]>([]);
    const userId = React.useContext(UserContext).userId;
    const [joinedEventIds, setJoinedEventIds] = useState<number[]>([]);
    const [eventSignups, setEventSignups] = useState<{ [eventId: number]: number }>({});
    const [sortFilter, setSortFilter] = useState<string>('date');
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [usernames, setUsernames] = useState<{ [userId: number]: string }>({});

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

            const creatorIds = Array.from(new Set(response.data.map((event: any) => event.event_detail_created_by)));
            Promise.all(
                creatorIds.map((id: number) =>
                    getUserDetail(id).then(res => ({ userId: id, username: res.data.user_detail_username }))
                )
            ).then(results => {
                const usernamesMap: { [userId: number]: string } = {};
                results.forEach(({ userId, username }) => {
                    usernamesMap[userId] = username;
                });
                setUsernames(usernamesMap);
            }).catch(error => {
                console.error("Error fetching usernames:", error);
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

    const handleLeave = (id: number) => {
        setJoinedEventIds(prevIds => prevIds.filter(eventId => eventId !== id));
        if (userId !== null) {
            deleteEventUser(id, userId).catch(error => {
                console.error("Error leaving event:", error);
            });
        }
    };

    const sortedEvents = [...eventDetails].sort((a, b) => {
        if (sortFilter === "date") {
            return new Date(a.event_detail_date).getTime() - new Date(b.event_detail_date).getTime();
        }
        if (sortFilter === "capacity") {
            return b.event_detail_capacity - a.event_detail_capacity;
        }
        if (sortFilter === "name") {
            return a.event_detail_name.localeCompare(b.event_detail_name);
        }
        return 0;
    });

    const filteredEvents = sortedEvents.filter(event =>
        event.event_detail_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleAnimationComplete = () => {
        console.log("Animation completed");
    };

    return (
        <div>
            <div className={styles.banner}>
                <BlurText
                    text="Events"
                    delay={150}
                    animateBy="letters"
                    direction="top"
                    onAnimationComplete={handleAnimationComplete}
                    className="text-2xl mb-8"
                />
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
                <div className={styles.mainContent}>
                <div className={styles.filters}>
                    <label htmlFor="sortFilter">Sort by:</label>
                    <select id="sortFilter" value={sortFilter} onChange={e => setSortFilter(e.target.value)}>
                        <option value="date">Date</option>
                        <option value="name">Name</option>
                        <option value="capacity">Availability</option>
                    </select>
                </div>
                <div className={styles.search}>
                    <label htmlFor="searchTerm">Search:</label>
                    <input
                        type="text"
                        id="searchTerm"
                        value={searchTerm}
                        onChange={e => setSearchTerm(e.target.value)}
                        placeholder="Search events..."
                    />
                </div>
                <ul className={styles.eventList}>
                    {filteredEvents.map(event => {
                        const isJoined = joinedEventIds.includes(event.event_detail_id);
                        const isFull = eventSignups[event.event_detail_id] >= event.event_detail_capacity;
                        
                        return (
                            <div key={event.event_detail_id} className={styles.eventCard}>
                                <p>{event.event_detail_name}</p>
                                <p>{event.event_detail_description}</p>
                                <p>Joined: {eventSignups[event.event_detail_id]}/{event.event_detail_capacity}</p>
                                <p>Created by: {usernames[event.event_detail_created_by]}</p>
                                <p>Date: {new Date(event.event_detail_date).toLocaleDateString()}</p>
                                <p>Time: {new Date(event.event_detail_time).toLocaleTimeString()}</p>
                                {userId !== null && userId !== event.event_detail_created_by && !isJoined && !isFull && (
                                    <button onClick={() => handleJoin(event.event_detail_id)}>
                                        Join
                                    </button>
                                )}
                                {userId !== null && userId !== event.event_detail_created_by && isJoined && (
                                    <button onClick={() => handleLeave(event.event_detail_id)}>
                                        Leave
                                    </button>
                                )}
                                {userId !== null && userId === event.event_detail_created_by && (
                                    <button onClick={() => handleDelete(event.event_detail_id)}>
                                        Delete
                                    </button>
                                )}
                                {isFull && <span>Event is full</span>}
                            </div>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}

export default EventDetailList;
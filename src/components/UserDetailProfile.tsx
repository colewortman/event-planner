import React, { useContext, useEffect, useState } from "react";
import { getUserDetail } from "services/userService";
import { useNavigate } from "react-router-dom";
import { UserContext } from "components/UserContext";
import { getEventsByUser, deleteEventUser } from "services/eventuserService";
import { getEventDetail, deleteEventDetail } from "services/eventService";
import ReactCalendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import styles from "./UserDetailProfile.module.css";
import BlurText from "./BlurText";

const UserDetailProfile: React.FC = () => {
    const userContext = useContext(UserContext);
    const userId = userContext.userId;
    const [events, setEvents] = useState<any[]>([]);
    const [selectedEvent, setSelectedEvent] = useState<any>(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (userId === null) return;
        getUserDetail(userId)
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
        navigate("/users");
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


    const eventsByDate = events.reduce((acc, event) => {
    const dateKey = new Date(event.event_detail_date).toDateString();
    if (!acc[dateKey]) acc[dateKey] = [];
    acc[dateKey].push(event);
    return acc;
    }, {} as { [date: string]: any[] });

    const handleDateClick = (date: Date) => {
    const dateKey = date.toDateString();
    if (eventsByDate[dateKey]) {
        setSelectedEvent(eventsByDate[dateKey][0]);
    }};

    const handleAnimationComplete = () => {
        console.log("Animation completed");
    };

    return (
        <div>
            <div className='banner'>
                <div className='title'>
                    <BlurText
                        text="Event Planner"
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
                <div className='links' onClick={() => navigate("/events/create")}>
                    <BlurText
                        text="Create Event"
                        delay={150}
                        animateBy="letters"
                        direction="top"
                        onAnimationComplete={handleAnimationComplete}
                        className="text-2xl mb-8"
                    />
                </div>
                <div className='links' onClick={() => navigate("/users/edit")}>
                    <BlurText
                        text="Edit Profile"
                        delay={150}
                        animateBy="letters"
                        direction="top"
                        onAnimationComplete={handleAnimationComplete}
                        className="text-2xl mb-8"
                    />
                </div>
                <div className='links' onClick={() => navigate("/users")}>
                    <BlurText
                        text="Sign Out"
                        delay={150}
                        animateBy="letters"
                        direction="top"
                        onAnimationComplete={handleAnimationComplete}
                        className="text-2xl mb-8"
                    />
                </div>
            </div>
            <div className='mainContent'>
                <div className={styles.calendarPanel}>
                    <h1 className={styles.calendarTitle}>Your Events</h1>
                    <ReactCalendar
                    onClickDay={handleDateClick}
                    tileContent={({ date }) => {
                        const dateKey = date.toDateString();
                        const dayEvents = eventsByDate[dateKey];
                        return dayEvents ? (
                        <div>
                            {dayEvents.map((ev: any) => (
                            <div
                                key={ev.event_detail_id}
                                className={styles.calendarEventTitle}
                                onClick={e => {
                                e.stopPropagation();
                                setSelectedEvent(ev);
                                }}
                            >
                                {ev.event_detail_name}
                            </div>
                            ))}
                        </div>
                        ) : null;
                    }}
                    />
                    {selectedEvent && (
                    <div className={styles.eventModalBackdrop} onClick={() => setSelectedEvent(null)}>
                        <div className={styles.eventModalCard} onClick={e => e.stopPropagation()}>
                        <h2>{selectedEvent.event_detail_name}</h2>
                        <p>{selectedEvent.event_detail_description}</p>
                        <p>
                            <strong>Date:</strong> {new Date(selectedEvent.event_detail_date).toLocaleDateString()}
                        </p>
                        <p>
                            <strong>Time:</strong> {selectedEvent.event_detail_time}
                        </p>
                        {userId !== null && userId !== selectedEvent.event_detail_created_by && (
                            <button onClick={() => handleLeave(selectedEvent.event_detail_id)}>
                                Leave
                            </button>
                        )}
                        {userId !== null && userId === selectedEvent.event_detail_created_by && (
                            <button onClick={() => handleDelete(selectedEvent.event_detail_id)}>
                                Delete
                            </button>
                        )}
                        </div>
                    </div>
                    )}
                </div>
            </div>
        </div>
    );
};
export default UserDetailProfile;
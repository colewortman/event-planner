import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { createEventDetail } from "../services/eventService";
import { EventDetail } from "../types";
import { UserContext } from "./UserContext";
import { createEventUser } from "services/eventuserService";

const EventDetailForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<EventDetail>();
    const navigate = useNavigate();
    const userId = React.useContext(UserContext).userId;

    React.useEffect(() => {
        if (userId === null) {
            navigate("/users");
        }
    }, [userId, navigate]);

    if (userId === null) {
        return null;
    }

    const onSubmit = async (data: EventDetail) => {
        data.event_detail_created_by = userId;
        try {
            const createdEvent = await createEventDetail(data);
            await createEventUser({
                event_detail_id: createdEvent.data.event_detail_id,
                user_detail_id: userId
            });
            navigate("/events");
        } catch (error) {
            console.error("Error creating event detail:", error);
        }
    };

    return (
        <div>
            <h1>Create Event</h1>
            <p>
                <Link to="/events">Back to Events</Link>
            </p>
            <p>
                <Link to="/users/profile">Profile</Link>
            </p>
        <form onSubmit={handleSubmit(onSubmit)}>
            <div>
                <label>Title</label>
                <input {...register("event_detail_name", { required: "Title is required" })} />
                {errors.event_detail_name && <span>{errors.event_detail_name.message}</span>}
            </div>
            <div>
                <label>Description</label>
                <textarea {...register("event_detail_description", { required: "Description is required" })} />
                {errors.event_detail_description && <span>{errors.event_detail_description.message}</span>}
            </div>
            <div>
                <label>Date</label>
                <input type="date" {...register("event_detail_date", { required: "Date is required" })} />
                {errors.event_detail_date && <span>{errors.event_detail_date.message}</span>}
            </div>
            <div>
                <label>Time</label>
                <input type="time" {...register("event_detail_time", { required: "Time is required" })} />
                {errors.event_detail_time && <span>{errors.event_detail_time.message}</span>}
            </div>
            <div>
                <label>Location</label>
                <input {...register("event_detail_location", { required: "Location is required" })} />
                {errors.event_detail_location && <span>{errors.event_detail_location.message}</span>}
            </div>
            <div>
                <label>Max Participants</label>
                <input type="number" {...register("event_detail_capacity", { required: "Max participants is required", min: 1 })} />
                {errors.event_detail_capacity && <span>{errors.event_detail_capacity.message}</span>}
            </div>
            <button type="submit">Create Event</button>
        </form>
        </div>
    );
};
export default EventDetailForm;
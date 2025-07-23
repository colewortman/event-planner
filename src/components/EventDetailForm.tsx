import React, {useContext} from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { createEventDetail } from "../services/eventService";
import { EventDetail } from "../types";
import { UserContext } from "./UserContext";
import { createEventUser } from "services/eventuserService";
import BlurText from "./BlurText";
import styles from "./EventDetailForm.module.css";

const EventDetailForm: React.FC = () => {
    const { register, handleSubmit, formState: { errors } } = useForm<EventDetail>();
    const navigate = useNavigate();
    const user = useContext(UserContext);
    const userId = user.userId;

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
            alert("Event created successfully!");
            navigate("/");
        } catch (error) {
            console.error("Error creating event detail:", error);
        }
    };

    const handleSignOut = () => {
        user.setUserId(null);
        navigate("/");
        alert("You have signed out successfully!");
    };

    const handleAnimationComplete = () => {
        // Handle any actions after the animation completes
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
                <div className={styles.formContainer}>
                    <form className={styles.formBox} onSubmit={handleSubmit(onSubmit)}>
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
                            <input type="date" {...register("event_detail_date", { required: "Date is required" })}
                            min={new Date().toISOString().split("T")[0]} />
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
            </div>
        </div>
    );
};
export default EventDetailForm;
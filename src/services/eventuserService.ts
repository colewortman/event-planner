import axios from "axios";
import { EventUser } from "../types";

const API_URL = "http://localhost:3000/api/";

export const getUsersByEvent = (eventId: number) => axios.get<EventUser[]>(`${API_URL}event/${eventId}`);
export const getEventsByUser = (userId: number) => axios.get<EventUser[]>(`${API_URL}user/${userId}`);
export const createEventUser = (data: Omit<EventUser, 'event_detail_id' | 'user_detail_id'>) => axios.post(`${API_URL}eventuser`, data);
export const deleteEventUser = (eventId: number, userId: number) => axios.delete(`${API_URL}eventuser/${eventId}/${userId}`);
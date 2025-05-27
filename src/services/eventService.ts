import axios from "axios";
import { EventDetail } from "../types";

const API_URL = "http://localhost:3000/api/events";

export const getEventDetails = () => axios.get<EventDetail[]>(API_URL);
export const getEventDetail = (id: number) => axios.get<EventDetail>(`${API_URL}/${id}`);
export const createEventDetail = (data: Omit<EventDetail, 'event_detail_id'>) => axios.post(API_URL, data);
export const updateEventDetail = (id: number, data: Omit<EventDetail, 'event_detail_id'>) => axios.put(`${API_URL}/${id}`, data);
export const deleteEventDetail = (id: number) => axios.delete(`${API_URL}/${id}`);
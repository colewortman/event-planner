import axios from "axios";
import { UserDetail } from "../types";

const API_URL = "http://localhost:3000/api/users";

export const getUserDetail = (id: number) => axios.get<UserDetail>(`${API_URL}/${id}`);
export const getUserDetailByUsername = (username: string) => axios.get<UserDetail>(`${API_URL}/${username}`);
export const createUserDetail = (data: Omit<UserDetail, 'user_detail_id'>) => axios.post(API_URL, data);
export const updateUserDetail = (id: number, data: Omit<UserDetail, 'user_detail_id'>) => axios.put(`${API_URL}/${id}`, data);
export const deleteUserDetail = (id: number) => axios.delete(`${API_URL}/${id}`);
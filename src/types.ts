import DirectoryList from "./components/DirectoryList";

export interface EventDetail {
    event_detail_id: number;
    event_detail_created_by: number;
    event_detail_name: string;
    event_detail_description: string;
    event_detail_date: string;
    event_detail_time: string;
    event_detail_location: string;
    event_detail_capacity: number;
}

export interface UserDetail {
    user_detail_id: number;
    user_detail_username: string;
    user_detail_password: string;
    user_detail_email: string;
}



export interface DirectoryList {

}
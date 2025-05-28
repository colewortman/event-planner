import React from "react";
import { Link } from "react-router-dom";

const DirectoryList: React.FC = () => {
    return (
        <div>
            <h1>Directory List</h1>
            <ul>
                <li>
                    <Link to="/events">Events</Link>
                </li>
                <li>
                    <Link to="/users">Users</Link>
                </li>
            </ul>
        </div>
    );
};

export default DirectoryList;
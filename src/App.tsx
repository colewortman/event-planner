import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DirectoryList from "./components/DirectoryList";
import EventDetailList from "./components/EventDetailList";
import UserDetailSignUp from "./components/UserDetailSignUp";
import UserDetailSignIn from "./components/UserDetailSignIn";
import UserDetailProfile from "./components/UserDetailProfile";
import EventDetailForm from "components/EventDetailForm";
import { UserProvider } from "./components/UserContext";

const App: React.FC = () => {
  return (
    <UserProvider>
      <Router>
        <Routes>
          <Route path="/" element={<DirectoryList />} />
          <Route path="/events" element={<EventDetailList />} />
          <Route path="/users" element={<UserDetailSignIn />} />
          <Route path="/users/signup" element={<UserDetailSignUp />} />
          <Route path="/users/profile" element={<UserDetailProfile />} />
          <Route path="/events/create" element={<EventDetailForm />} />
        </Routes>
      </Router>
    </UserProvider>
  );
};
export default App;
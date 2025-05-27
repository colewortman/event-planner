import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import DirectoryList from "./components/DirectoryList";
import EventDetailList from "./components/EventDetailList";
import UserDetailList from "./components/UserDetailList";

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DirectoryList />} />
        <Route path="/events" element={<EventDetailList />} />
        <Route path="/users" element={<UserDetailList />} />
      </Routes>
    </Router>
  );
};
export default App;
import React from "react";
import "../styles/session-list.css";

const SessionsList = ({ sessions }) => {
  return (
    <div className="session-list-container">
      {
        !sessions || sessions.length === 0 ? (<p>No sessions found !!!</p>) :
          <ul>
            {sessions.map((session, index) => (
              <li key={index}>{session.session_name}</li>
            ))}
          </ul>
      }
    </div>
  );
};

export default SessionsList;

import React from "react";
import "../styles/session-list.css";

const SessionsList = ({ sessions }) => {
  return (
    <div className="session-list-container">
      {
        !sessions || sessions.length === 0 ? (<p>No sessions found !!!</p>) :
          <ul>
            {sessions.map((session, index) => (
              <li key={index} className="list">
                <h3>{index+1}</h3>
                <h4>Session name: {session.session_name || "-"}</h4>
                <h4>Id: {session.id || "-"}</h4>
              </li>
            ))}
          </ul>
      }
    </div>
  );
};

export default SessionsList;

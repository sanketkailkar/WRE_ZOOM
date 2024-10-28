"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import SessionsList from "@/components/SessionList";
import "./../styles/homePage.css";

export default function Home() {
  const [sessions, setSessions] = useState([]);
  const [tokenSet, setTokenSet] = useState(false);
  const [sessionName, setSessionName] = useState("");
  const [sessionPassword, setSessionPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isCreatingSession, setIsCreatingSession] = useState(false);
  const [data, setData] = useState();

  const fetchSessions = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get("/api/getSessions");
      console.log("GET", response);
      setSessions(response.data.sessions || []);
    } catch (error) {
      console.error("Failed to fetch sessions:", error.message);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    const setTokenAndFetchSessions = async () => {
      if (!tokenSet) {
        const jwt = await axios.post("/api/setToken");
        localStorage.setItem('zoom-sdk-auth', JSON.stringify(jwt.data.token));
        setTokenSet(true);
      }
      fetchSessions();
    };

    setTokenAndFetchSessions();
  }, [tokenSet]);

  const handleCreateSession = async () => {
    if (!sessionName || !sessionPassword) {
      alert("Please fill all fields.");
      return;
    }

    try {
      setIsCreatingSession(true);
      const response = await axios.post("/api/createSessions", {
        sessionName,
        sessionPassword,
      });
      console.log("CREATE", response);
      setSessions(response.data.sessions || []);
      setData(response.data);
      if (response.data) {
        fetchSessions();
      }
    } catch (error) {
      console.error("Failed to create session:", error.message);
    } finally {
      setIsCreatingSession(false);
    }
  };

  return (
    <main className="main-container">
      <div className="user-input-container">
        <h1>Zoom Sessions</h1>
        <div className="input-and-buttons">
          <input
            type="text"
            placeholder="Session Name"
            value={sessionName}
            onChange={(e) => setSessionName(e.target.value)}
            className="session-input"
          />
          <input
            type="text"
            placeholder="Password/Passcode"
            value={sessionPassword}
            onChange={(e) => setSessionPassword(e.target.value)}
            className="session-input"
          />
          <button
            variant="primary"
            disabled={!sessionName || isCreatingSession}
            onClick={handleCreateSession}
            className="create-session-button"
          >
            {isCreatingSession ? "Creating Session..." : "Create Session"}
          </button>
        </div>
      </div>
      <p>{JSON.stringify(data)}</p>
      {isLoading ? (
        <p>Loading sessions...</p>
      ) : (
        <SessionsList sessions={sessions} />
      )}
    </main>
  );
}

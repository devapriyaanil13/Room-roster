import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import apiClient, { apiBaseURL } from "../services/apiClient";
import io from "socket.io-client";
import "../styles/Chat.css";

const endPoint = apiBaseURL.replace(/\/api$/, "");
let socket;

function Chat() {
  const { id } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [currentUserId, setCurrentUserId] = useState(null);
  const [socketConnected, setSocketConnected] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    socket = io(endPoint);
    socket.emit("setup", { _id: currentUserId });
    socket.on("connected", () => setSocketConnected(true));

    return () => {
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    // Determine current user from profile
    const fetchUser = async () => {
      try {
        const res = await apiClient.get("/users/profile", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        setCurrentUserId(res.data._id);
        socket.emit("setup", res.data);
      } catch (e) {
        console.error("Failed to fetch user");
      }
    };
    fetchUser();
    fetchMessages();
  }, [id]);

  useEffect(() => {
    socket.on("message received", (newMessageReceived) => {
      // Check if the incoming message is from the currently active chat
      if (!id || id !== newMessageReceived.senderId) {
        // Notification could go here
      } else {
        setMessages((prev) => [...prev, newMessageReceived]);
      }
    });

    return () => {
      socket.off("message received");
    }
  });

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const fetchMessages = async () => {
    try {
      const res = await apiClient.get(`/messages/${id}`, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      setMessages(res.data);
    } catch (error) {
      console.error("Error fetching messages", error);
    }
  };

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    try {
      const res = await apiClient.post(`/messages/${id}`, { text: newMessage }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      socket.emit("new message", res.data);
      setMessages([...messages, res.data]);
      setNewMessage("");
    } catch (error) {
      console.error("Error sending message", error);
    }
  };

  return (
    <div className="chat-container">
      <div className="chat-window">
        <div className="chat-header">
          <h2>Roommate Chat</h2>
        </div>
        
        <div className="chat-messages">
          {messages.length === 0 && <p className="no-messages">No messages yet. Say hi!</p>}
          {messages.map((msg, index) => (
            <div 
              key={index} 
              className={`message ${msg.senderId === currentUserId ? 'sent' : 'received'}`}
            >
              <p>{msg.text}</p>
              <span className="timestamp">
                {new Date(msg.timestamp).toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}
              </span>
            </div>
          ))}
          <div ref={messagesEndRef} />
        </div>

        <form onSubmit={sendMessage} className="chat-input">
          <input 
            type="text" 
            placeholder="Type a message..." 
            value={newMessage} 
            onChange={(e) => setNewMessage(e.target.value)} 
          />
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  );
}

export default Chat;

// src/Socket.jsx
import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io("http://localhost:5000");

const defaultAvatar = "https://i.pravatar.cc/40"; // fallback avatar URL

// Utility to format last seen time
function formatLastSeen(dateStr) {
  if (!dateStr) return "Unknown";
  const date = new Date(dateStr);
  const diffMs = Date.now() - date.getTime();
  const diffMins = Math.floor(diffMs / 60000);
  if (diffMins < 1) return "Just now";
  if (diffMins < 60) return `${diffMins} min ago`;
  const diffHrs = Math.floor(diffMins / 60);
  if (diffHrs < 24) return `${diffHrs} hr ago`;
  const diffDays = Math.floor(diffHrs / 24);
  return `${diffDays} day${diffDays > 1 ? "s" : ""} ago`;
}

export default function Socket({ currentUser }) {
  const [allUsers, setAllUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [chatMessages, setChatMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [search, setSearch] = useState("");
  const [unreadCounts, setUnreadCounts] = useState({});

  // Groups
  const [groups, setGroups] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);

  useEffect(() => {
    if (!currentUser) return;

    socket.emit("set username", currentUser);

    socket.on("all users", (users) => {
      const filtered = users.filter((u) => u.username !== currentUser);
      setAllUsers(filtered);
    });

    socket.on("all groups", (groups) => {
      setGroups(groups);
    });

    socket.on("load messages", (msgs) => {
      setChatMessages(msgs);
    });

    socket.on("private message", (msg) => {
      setChatMessages((prev) => [...prev, msg]);
      if (msg.from !== currentUser && msg.to === currentUser) {
        setUnreadCounts((prev) => ({
          ...prev,
          [msg.from]: (prev[msg.from] || 0) + 1,
        }));
      }
    });

    socket.on("group message", (msg) => {
      setChatMessages((prev) => [...prev, msg]);
      if (
        msg.group &&
        selectedGroup !== msg.to &&
        msg.from !== currentUser
      ) {
        setUnreadCounts((prev) => ({
          ...prev,
          [msg.to]: (prev[msg.to] || 0) + 1,
        }));
      }
    });

    return () => {
      socket.off("all users");
      socket.off("all groups");
      socket.off("load messages");
      socket.off("private message");
      socket.off("group message");
    };
  }, [currentUser, selectedGroup]);

  // Clear unread counts when selecting user or group
  useEffect(() => {
    if (selectedUser) {
      setUnreadCounts((prev) => ({ ...prev, [selectedUser]: 0 }));
    }
  }, [selectedUser]);

  useEffect(() => {
    if (selectedGroup) {
      setUnreadCounts((prev) => ({ ...prev, [selectedGroup]: 0 }));
    }
  }, [selectedGroup]);

  // Send message either private or group
  const sendMessage = (e) => {
    e.preventDefault();
    if (!message) return;

    if (selectedUser) {
      socket.emit("private message", {
        to: selectedUser,
        content: message,
      });
    } else if (selectedGroup) {
      socket.emit("group message", {
        groupName: selectedGroup,
        content: message,
      });
    }
    setMessage("");
  };

  // Filter users by search
  const filteredUsers = allUsers.filter((user) =>
    user.username.toLowerCase().includes(search.toLowerCase())
  );

  // Filter messages for selected user or group
  const filteredMessages = chatMessages.filter((msg) => {
    if (selectedUser) {
      return (
        !msg.group &&
        ((msg.from === currentUser && msg.to === selectedUser) ||
          (msg.from === selectedUser && msg.to === currentUser))
      );
    } else if (selectedGroup) {
      return msg.group && msg.to === selectedGroup;
    }
    return false;
  });

  return (
    <div style={styles.container}>
      <div style={styles.sidebar}>
        <h2 style={styles.header}>💬 Messenger</h2>

        <input
          type="text"
          placeholder="🔍 Search users..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.searchInput}
        />

        <div style={styles.sectionTitle}>Users</div>
        <div style={styles.userList}>
          {filteredUsers.length === 0 ? (
            <div style={styles.noUser}>No users found</div>
          ) : (
            filteredUsers.map((user) => (
              <div
                key={user.username}
                style={{
                  ...styles.userItem,
                  backgroundColor:
                    selectedUser === user.username ? "#e0e0ff" : "transparent",
                }}
                onClick={() => {
                  setSelectedUser(user.username);
                  setSelectedGroup(null);
                }}
              >
                <img
                  src={user.avatar || defaultAvatar}
                  alt="avatar"
                  style={styles.avatar}
                />
                <span style={styles.statusIcon}>
                  {user.online ? "🟢" : "⚪"}
                </span>
                <span style={styles.username}>{user.username}</span>
                <span style={styles.lastSeen}>
                  {user.online
                    ? "Online"
                    : `Last seen: ${formatLastSeen(user.lastSeen)}`}
                </span>
                {unreadCounts[user.username] > 0 && (
                  <span style={styles.unreadBadge}>{unreadCounts[user.username]}</span>
                )}
              </div>
            ))
          )}
        </div>

        <div style={styles.sectionTitle}>Groups</div>
        <div style={styles.groupList}>
          {groups.length === 0 ? (
            <div style={styles.noUser}>No groups found</div>
          ) : (
            groups.map((group) => (
              <div
                key={group.name}
                style={{
                  ...styles.userItem,
                  backgroundColor:
                    selectedGroup === group.name ? "#e0e0ff" : "transparent",
                }}
                onClick={() => {
                  setSelectedGroup(group.name);
                  setSelectedUser(null);
                }}
              >
                <span style={styles.groupIcon}>👥</span>
                <span style={styles.username}>{group.name}</span>
                {unreadCounts[group.name] > 0 && (
                  <span style={styles.unreadBadge}>{unreadCounts[group.name]}</span>
                )}
              </div>
            ))
          )}
        </div>
      </div>

      <div style={styles.chatPanel}>
        {(selectedUser || selectedGroup) ? (
          <>
            <div style={styles.chatHeader}>
              Chatting with{" "}
              <strong>{selectedUser || selectedGroup}</strong>
            </div>
            <div style={styles.chatBox}>
              {filteredMessages.map((msg, idx) => (
                <div
                  key={idx}
                  style={{
                    ...styles.message,
                    alignSelf:
                      msg.from === currentUser ? "flex-end" : "flex-start",
                    backgroundColor:
                      msg.from === currentUser ? "#daf5dc" : "#f0f0f0",
                  }}
                >
                  <span>
                    <strong>
                      {msg.from === currentUser ? "You" : msg.from}
                    </strong>
                    : {msg.content}
                  </span>
                </div>
              ))}
            </div>
            <form onSubmit={sendMessage} style={styles.inputArea}>
              <input
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message..."
                style={styles.messageInput}
              />
              <button type="submit" style={styles.sendButton}>
                ➤
              </button>
            </form>
          </>
        ) : (
          <div style={styles.noChat}>
            👈 Select a user or group to start chatting!
          </div>
        )}
      </div>
    </div>
  );
}

const styles = {
  container: {
    display: "flex",
    height: "100vh",
    fontFamily: "Arial, sans-serif",
    backgroundColor: "#f8f9fa",
  },
  sidebar: {
    width: "280px",
    borderRight: "1px solid #ddd",
    padding: "20px",
    backgroundColor: "#fff",
    display: "flex",
    flexDirection: "column",
    overflowY: "auto",
  },
  header: {
    fontSize: "22px",
    marginBottom: "15px",
    textAlign: "center",
    color: "#333",
    fontWeight: "bold",
  },
  searchInput: {
    padding: "8px",
    borderRadius: "5px",
    border: "1px solid #ccc",
    marginBottom: "15px",
  },
  sectionTitle: {
    fontWeight: "bold",
    marginTop: "15px",
    marginBottom: "8px",
    color: "#555",
  },
  userList: {
    maxHeight: "250px",
    overflowY: "auto",
  },
  groupList: {
    maxHeight: "150px",
    overflowY: "auto",
  },
  userItem: {
    display: "flex",
    alignItems: "center",
    gap: "8px",
    padding: "8px",
    cursor: "pointer",
    borderRadius: "6px",
    transition: "background 0.2s",
  },
  avatar: {
    width: 32,
    height: 32,
    borderRadius: "50%",
    objectFit: "cover",
  },
  statusIcon: {
    fontSize: "14px",
  },
  username: {
    fontWeight: "500",
    flex: 1,
  },
  lastSeen: {
    fontSize: "11px",
    color: "#666",
  },
  unreadBadge: {
    backgroundColor: "red",
    color: "white",
    borderRadius: "50%",
    padding: "2px 6px",
    fontSize: 12,
    fontWeight: "bold",
    marginLeft: "8px",
  },
  groupIcon: {
    fontSize: "18px",
  },
  chatPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    padding: "20px",
    backgroundColor: "#f5f7fb",
  },
  chatHeader: {
    marginBottom: "10px",
    fontWeight: "bold",
    color: "#444",
    fontSize: "18px",
  },
  chatBox: {
    flex: 1,
    overflowY: "auto",
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    padding: "15px",
    borderRadius: "6px",
    backgroundColor: "#fff",
    border: "1px solid #ddd",
    marginBottom: "15px",
  },
  message: {
    padding: "10px",
    borderRadius: "14px",
    maxWidth: "65%",
    wordWrap: "break-word",
  },
  inputArea: {
    display: "flex",
    marginTop: "auto",
  },
  messageInput: {
    flex: 1,
    padding: "12px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginRight: "12px",
    fontSize: "16px",
  },
  sendButton: {
    padding: "12px 26px",
    backgroundColor: "#4a90e2",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "18px",
  },
  noUser: {
    textAlign: "center",
    color: "#999",
    marginTop: "20px",
  },
  noChat: {
    margin: "auto",
    fontSize: "20px",
    color: "#999",
  },
};

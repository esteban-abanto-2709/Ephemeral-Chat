# 💬 Ephemeral Chat — Ephemeral, Anonymous, and Real-Time Messaging

## 🧠 General Concept

Ephemeral Chat is an instant messaging platform that prioritizes ephemerality, anonymity, and privacy. It's designed to facilitate commitment-free, trace-free conversations: messages are deleted as soon as one of the participants disconnects or reloads the page, and no personal information is stored.

The application has two main modes:

## 🔀 1. Random Mode — Anonymous Conversations with Strangers

- Users are paired with another person connected to the system.
- Both chat anonymously, without the need for names or registration.
- When either participant disconnects or reloads the page, the entire chat disappears automatically.
- After a certain number of exchanged messages (e.g., 10), a special message appears:
  > “Getting along? Share your contact before it’s too late! This system was created as part of a portfolio. Once the page reloads or the connection is lost, you won’t be able to contact each other again.”

## 🔗 2. Private Link Mode — Ephemeral Shared Room

- A user generates a unique link to share with someone else.
- Both users access the link to enter a private ephemeral chat.
- A waiting screen is shown until the second person joins:
  > “Waiting for the other person to join the chat…”
- Once connected, the behavior is identical to the random mode: real-time conversation with no names or history, which disappears if either person disconnects.

## 🧩 Shared Logic Between Both Modes

- No messages, names, or persistent IDs are stored.
- If either user disconnects, closes the browser, or loses connection:
  - The chat content is deleted.
  - A disconnection message is displayed:
    > “This conversation is no longer valid. The other user has left.”
- Both modes use the same chat interface and general communication logic, with minor differences in how users join.

## 🛠️ Technologies Used

Frontend

- React + TypeScript
- TailwindCSS
- Socket.IO Client

Backend

- Node.js + Express
- Socket.IO
- No database (everything in memory)

## 🎯 Project Purpose

This project was built as part of a professional portfolio. It focuses on showcasing skills in:

- Real-time communication using WebSockets
- Handling ephemeral states and synchronization
- Simple, clear, modern UI design
- Product thinking with a focus on privacy and user experience

## ✍️ Ethical and Design Considerations

- The system does not allow sending images, files, or links.
- No email, username, or identifiable data is requested.
- The goal is to demonstrate technical creativity and explore controlled social experiences.

## 🔜 Future Features (Not Included in MVP)

- 🔁 Automatic Reconnection: Attempts to reconnect if the connection is lost by accident.
- 🎭 Temporary Anonymous Avatars: Each user receives a random name or icon (e.g., “Blue Cat” and “Red Fox”) just for that session.
- 🧪 Self-Destructing Messages: Option to send messages that disappear after 5, 10, or 30 seconds.

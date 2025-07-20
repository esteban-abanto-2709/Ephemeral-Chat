# Ephemeral Chat

A real-time messaging system built entirely in-memory, where ephemerality is a design feature, not a limitation.

## 🎯 Project Purpose

Project developed to demonstrate competencies in real-time communication technologies and advanced ephemeral state management. The main technical challenge is managing multiple chat rooms without data persistence, maintaining perfect synchronization between users.

## 🏗️ Technical Architecture

### Backend

- **Node.js + Express** - HTTP server and REST API
- **Socket.IO** - Bidirectional real-time communication
- **Memory management** - All data maintained in RAM
- **Dynamic room system** - Automatic room creation and destruction

### Frontend

- **React + TypeScript** - Reactive user interface
- **Socket.IO Client** - WebSocket connection to server
- **TailwindCSS** - Responsive and modern design
- **Local state management** - No client-side persistence

## 🚀 Main Features

### 1. Global Chat

- Single public room where all connected users can participate
- Full conversation visibility for all members

### 2. Private Chat (by link)

- Generation of unique links to create private rooms
- Anyone with the link can join directly
- System notifications when users connect/disconnect
- Support for multiple simultaneous participants

### 3. Random Chat

- Automatic matchmaking system between users (initially 2 people)
- Ability to share the room URL to invite more participants
- Works identically to private chat once connection is established
- Automatic notifications for user entry and exit

## 🧠 Technical Challenges Solved

- **Ephemeral state synchronization** between multiple clients
- **Dynamic room management** with automatic creation and cleanup
- **Real-time matchmaking** for random pairing
- **Disconnection handling** and memory cleanup
- **System notifications** for user connections and disconnections

## 🔒 Design Features

- **Total anonymity** - No registration or user identification
- **Ephemerality by design** - Messages exist only while there's active connection
- **Automatic cleanup** - Room destruction when all users disconnect
- **No traces** - Zero persistence of conversations or personal data

## 🛠️ Tech Stack

``` cmd
Frontend:  React + TypeScript + TailwindCSS + Socket.IO Client
Backend:   Node.js + Express + Socket.IO
Database:  None (everything in-memory)
```

## 📋 Installation and Usage

*[This section will be completed when development is finished]*

## 🎨 Screenshots

*[This section will be completed when development is finished]*

## 🚧 Project Status

This project is currently under development as part of a professional portfolio to demonstrate competencies in fullstack development and real-time communication handling.

---

*Developed by Esteban Abanto - Demonstrating skills in React, Node.js, WebSockets and real-time architectures.*

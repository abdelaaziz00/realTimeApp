
# Real-Time Web Application

A **real-time web application** built with **Node.js**, **Express.js**, **Socket.IO**, **HTML**, **CSS**, and **JavaScript**.

## Project Overview

**realTimeApp** is a web development project exploring **real-time communication** between a browser-based client and a Node.js server.

The project uses **Socket.IO** to support event-driven communication, demonstrating how a server and connected clients can exchange information without relying exclusively on traditional HTTP request-response cycles.

## Technology Stack

| Technology | Role |
|---|---|
| **Node.js** | JavaScript server runtime |
| **Express.js** | Web server framework |
| **Socket.IO** | Real-time, event-based communication |
| **HTML** | Web page structure |
| **CSS** | User interface styling |
| **JavaScript** | Client-side and server-side logic |
| **npm** | Dependency management |

## Repository Structure

```text
realTimeApp/
├── app.js             # Server-side application
├── index.html         # Web interface
├── package.json       # Project dependencies and scripts
├── package-lock.json  # Dependency lockfile
└── node_modules/      # Installed dependencies
```

## How It Works

The application follows a **client-server architecture**:

1. The **browser** loads the application interface.
2. The **Express.js server** handles the server-side application.
3. **Socket.IO** provides an event-based communication channel.
4. The client and server can exchange real-time events.

The exact supported events and user-facing interactions depend on the implementation in `app.js` and `index.html`.

## Getting Started

### Prerequisites

- **Node.js**
- **npm**
- **Git**
- A modern web browser

### Installation

**1. Clone the repository**

```bash
git clone https://github.com/abdelaaziz00/realTimeApp.git
cd realTimeApp
```

**2. Install dependencies**

```bash
npm install
```

**3. Start the application**

Check the available scripts in `package.json`. If the application uses `app.js` as its direct entry point, run:

```bash
node app.js
```

**4. Open the application**

Visit the local address and port configured in `app.js`.

> **Note:** The exact port, startup script, and supported real-time events should be verified against the application source.

## Learning Objectives

This project demonstrates concepts related to:

- **Real-time web communication**
- **Event-driven programming**
- **Client-server architecture**
- **Node.js and Express.js**
- **Socket.IO integration**
- **Frontend and backend communication**
- **JavaScript web development**

## Author

**Abdelaaziz Belharcha**

Engineering Student — **Management and Governance of Information Systems (MGSI)**

- **GitHub:** [abdelaaziz00](https://github.com/abdelaaziz00)
- **Portfolio:** [belharcha.me](https://belharcha.me)

## Project Status

Educational / portfolio project focused on real-time web application development.

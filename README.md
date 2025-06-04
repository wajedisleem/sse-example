# Server-Sent Events (SSE) Example

This project demonstrates real-time communication between a server and client using **Server-Sent Events (SSE)**. It features a Node.js/Express backend that streams progress updates to a React frontend in real-time.

## What is this example?

This example showcases:

- **Server-Sent Events (SSE)**: A web standard that allows a server to push data to a client over a single HTTP connection
- **Real-time progress tracking**: The backend simulates a long-running task and sends progress updates to connected clients
- **Event-driven architecture**: Uses Node.js EventEmitter to handle progress events
- **React frontend**: Displays a live progress bar that updates automatically as the server sends progress data

### Architecture

```
┌─────────────────┐    SSE Connection    ┌─────────────────┐
│                 │ ──────────────────► │                 │
│  React Frontend │                     │ Express Backend │
│   (Port 5173)   │ ◄────────────────── │   (Port 3000)   │
└─────────────────┘   Progress Stream   └─────────────────┘
                                               │
                                               ▼
                                        ┌─────────────┐
                                        │   Worker    │
                                        │  (Simulated │
                                        │    Task)    │
                                        └─────────────┘
```

## Features

- **Persistent connection**: Single HTTP connection maintained for streaming updates
- **Automatic reconnection**: Client automatically reconnects if connection drops
- **Progress visualization**: Real-time progress bar with percentage updates
- **Cross-origin support**: CORS enabled for frontend-backend communication
- **Event-driven updates**: Clean separation of concerns using EventEmitter pattern

## Project Structure

```
sse-example/
├── backend/
│   ├── server.js           # Express server with SSE endpoint
│   ├── worker.js           # Simulated long-running task
│   ├── progressEmitter.js  # Event emitter for progress updates
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── App.jsx         # React component with progress bar
│   │   └── main.jsx        # React app entry point
│   ├── index.html
│   ├── package.json
│   └── vite.config.js
└── README.md
```

## How to run

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn

### Setup

1. **Clone or navigate to the project directory**
   ```bash
   cd sse-example
   ```

2. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd ../frontend
   npm install
   ```

### Running the application

1. **Start the backend server** (Terminal 1):
   ```bash
   cd backend
   node server.js
   ```
   
   The server will start on `http://localhost:3000` and begin the simulated worker task.

2. **Start the frontend development server** (Terminal 2):
   ```bash
   cd frontend
   npm run dev
   ```
   
   The React app will start on `http://localhost:5173` (or similar port shown in terminal).

3. **Open your browser** and navigate to the frontend URL to see the real-time progress updates!

### What you'll see

- A progress bar that updates in real-time from 0% to 100%
- Progress updates streaming from the server every 100ms
- The cycle repeats automatically when it reaches 100%
- Browser developer tools will show the EventSource connection in the Network tab

## API Endpoints

### GET `/events`
- **Description**: SSE endpoint for real-time progress updates
- **Response**: Text/event-stream with progress data
- **Data format**: 
  ```json
  {
    "moved": 45,
    "total": 100,
    "percent": "45.00"
  }
  ```

## Technologies Used

### Backend
- **Express.js**: Web framework for Node.js
- **CORS**: Cross-origin resource sharing middleware
- **EventEmitter**: Node.js events for progress communication

### Frontend  
- **React**: UI library for building the interface
- **Vite**: Fast build tool and development server
- **EventSource API**: Browser API for consuming server-sent events

## Learning Points

This example demonstrates:

1. **SSE vs WebSockets**: SSE is simpler for one-way server-to-client communication
2. **Event-driven patterns**: Clean separation using EventEmitter
3. **Real-time updates**: How to stream data without polling
4. **CORS handling**: Enabling cross-origin requests for development
5. **Connection management**: Handling client connections and cleanup

## Extending the example

You can extend this example by:

- Adding multiple concurrent tasks with different progress streams
- Implementing user authentication for personalized progress
- Adding error handling and retry logic
- Storing progress in a database for persistence
- Adding WebSocket support for bidirectional communication

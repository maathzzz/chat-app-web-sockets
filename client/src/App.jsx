import './App.css'
import io from 'socket.io-client';
import Chat from "./Components/Chat";
import { useState, useMemo } from 'react';

const socket = io.connect("http://localhost:3001");
// const socket = useMemo(() => io('http://localhost:3000'), []);

console.log(socket)

function App() {
  const socket = useMemo(() => io('http://localhost:3001'), []);
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () =>{
    if (username !== "" && room !== "") {

      // socket.emit("join_room", username);
      socket.emit("join_room", room);
      setShowChat(true);
      console.log(`${username} with ID: ${socket.id} joined the room ${room}`)
    }
  }

  return (
    <div className="App">
      {!showChat ? (
      <div className="joinChatContainer">
      <h4>Join a Chat</h4>
      <input type="text" placeholder="Type your username..." onChange={(event) => {setUsername(event.target.value)}}/>
      <input type="text" placeholder="ROOM ID..." onChange={(event) => {setRoom(event.target.value)}}/>
      <button onClick={joinRoom}> Join a Room </button>
      </div>
      )
    : (
      <Chat socket={socket} username={username} room={room} />
    )}
    </div>
  )
}

export default App

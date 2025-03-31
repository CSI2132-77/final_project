import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Button } from "@mui/material";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

interface Room {
    room_id: number;
    hotel_id: number;
    price: string;
    capacity: string;
    view_type: string;
    is_extendable: boolean;
}

function App() {
    const [data, setData] = useState<Room[]>([]);
    const params = {
        chain_id: "1",
        hotel_id: "1",
        // capacity: "suite",
        // address: "100 Park Avenue, New York, NY",
        // category: "5",
        // total_rooms: "6",
        // price: "600.00"
    };

    useEffect(() => {
        const queryString = new URLSearchParams(params).toString();

        axios.get(`/api/room/available?${queryString}`) // Replace with your actual API base URL
            .then(response => {
                console.log("API URL:", `/api/room/available?${queryString}`);
                console.log("API Response:", response.data);
                if (response.data) {
                    setData(response.data);
                } else {
                    console.error("No available rooms found in the response");
                }
            })
            .catch(error => console.error("Error fetching data", error))
            .finally(() => console.log("Data fetched"));
    }, []);

    return (
        <Container>
            <Typography
                variant="h3"
                gutterBottom>
                Searching Available Rooms
            </Typography>
            <Typography
                variant="h5"
                gutterBottom>
                Search Criteria
                {Object.entries(params).map(([key, value]) => (
                    <Typography key={key}>
                        {key}: {value}
                    </Typography>
                ))}
            </Typography>
            <hr style={{ margin: '20px 0', border: '1px solid #ccc' }} />
            {
                data.length > 0 ? (
                    data.map((room) => (
                        <div key={room.room_id} style={{ marginBottom: '20px' }}>
                            <Typography variant="h6">Room ID: {room.room_id}</Typography>
                            <Typography>Hotel ID: {room.hotel_id}</Typography>
                            <Typography>Price: {room.price}</Typography>
                            <Typography>Capacity: {room.capacity}</Typography>
                            <Typography>View Type: {room.view_type}</Typography>
                            <Typography>Extendable: {room.is_extendable ? "Yes" : "No"}</Typography>
                        </div>
                    ))
                )
             : (
                <Typography
                    variant="body1">
                    Loading...
                </Typography>
            )}
            <Button
                variant="contained"
                color="primary"
                style={{ marginTop: '20px' }}>
                Material UI Button
            </Button>
        </Container>
    );
}




/*
  const [count, setCount] = useState(0)
  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
*/

export default App

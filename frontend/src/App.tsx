import React, { useEffect, useState } from "react";
import axios from "axios";
import { Container, Typography, Button } from "@mui/material";
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

function App() {
  const [message, setMessage] = useState<string>("")

  useEffect(() => {
    // Call a get request using axios
    // Then set the message state to the response data
    axios.get("/api/")
      .then(response => setMessage(response.data.message))
      .catch(error => console.error("Error fetching data", error))
      .finally(() => console.log("Data fetched"))
  }, [])

  return (
      <Container>
          <Typography
            variant="h3"
            gutterBottom>
              FastAPI + React + Vite + MUI (TypeScript)
          </Typography>
          <Typography
            variant="body1">
              {message || "Loading..."}
          </Typography>
          <Button
            variant="contained"
            color="primary"
            style={{ marginTop: '20px' }}>
              Material UI Button
          </Button>
      </Container>
  );




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
}

export default App

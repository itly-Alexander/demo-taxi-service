import "./App.css";
import React from "react";
import BasicTabs from "./components/Tabs";
import { Box, Typography } from "@mui/material";

function App() {
  const imageUrl = `${process.env.PUBLIC_URL}/dizzytaxi.gif`;

  return (
    <div className="App">
      <header>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <img src={imageUrl} style={{ width: 250 }} />
          <Box>
            <Typography variant="h3">TRTC</Typography>
            <Typography sx={{ fontSize: 14 }}>
              Totally reliable Taxi Company Inc.
            </Typography>
          </Box>
          <img src={imageUrl} style={{ width: 250, transform: "scaleX(-1)" }} />
        </Box>
        <BasicTabs />
      </header>
    </div>
  );
}

export default App;

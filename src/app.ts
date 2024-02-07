import express from "express";
import mongoose from "mongoose";
import path from "path";
import cors from "cors";

import clientRoutes from "./routes/clientRoutes";
import fleetRoutes from "./routes/fleetRoutes";
import rideRoutes from "./routes/rideRoutes";

const app = express();

app.use(cors());

app.use(express.json());

mongoose
  .connect(process.env.MONGODB_URI as string)
  .then(() => console.log("Connection to MongoDB is successful!"))
  .catch((error: string) =>
    console.log(`Could not connect to MongoDB ${error}`)
  );

app.use("/api/clients", clientRoutes);
app.use("/api/fleets", fleetRoutes);
app.use("/api/rides", rideRoutes);

app.use(express.static(path.join(__dirname, "..", "client", "build")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "client", "build", "index.html"));
});

app.listen(process.env.PORT, () => {
  return console.log(
    `Node server is running at http://localhost:${process.env.PORT}`
  );
});

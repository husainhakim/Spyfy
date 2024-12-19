import express from "express";
import cors from "cors";
import connectCloudinary from "./src/config/cloudinary.js";
import "dotenv/config";
import connectDB from "./src/config/mongodb.js";

// app config
const app = express();
const port = process.env.PORT || 4000;
connectCloudinary();
connectDB();

// middlewares
app.use(express.json());
app.use(cors());

// Initializing Routers
// app.use("/api/song", songRouter);
// app.use("/api/album", albumRouter);

app.use("/api", require("./src/routes"));

app.get("/", (req, res) => res.send("API Working"));

app.listen(port, () => console.log(`Server started on ${port}`));
const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes");
const listingRoutes = require("./routes/listing.routes");

const app = express();

app.use(cors());
app.use(express.json());

// Health check pour CI / OpenShift
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);
app.get('/', (req, res) => {res.send('Maison Epouvante Backend Deploye');});

module.exports = app;

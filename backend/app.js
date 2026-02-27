const express = require("express");
const cors = require("cors");

const authRoutes = require("./src/routes/auth.routes.js");
const listingRoutes = require("./src/routes/listing.routes.js");

const app = express();

app.use(cors());
app.use(express.json());

// Health check (important pour CI/CD)
app.get("/health", (req, res) => {
res.json({ status: "ok" });
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);

app.get("/", (req, res) => {
res.send("Backend MaisonEpouvante Deploy :)");
});

module.exports = app;
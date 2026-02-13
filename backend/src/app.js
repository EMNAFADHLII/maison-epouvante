const express = require("express");
const cors = require("cors");

const authRoutes = require("./routes/auth.routes.js");
const listingRoutes = require("./routes/listing.routes.js");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/listings", listingRoutes);

app.get("/health", (req, res) => {
  res.status(200).json({ status: "ok" });
});

module.exports = app;


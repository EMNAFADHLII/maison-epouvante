const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware.js");
const { getListings, createListing } = require("../controllers/listing.controllers.js");

router.get("/", getListings);
router.post("/", authMiddleware, createListing);

module.exports = router;

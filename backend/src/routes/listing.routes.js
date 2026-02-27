const express = require("express");
const router = express.Router();

const { createListing } = require("../controllers/listing.controllers.js");

router.post("/", createListing);

module.exports = router;
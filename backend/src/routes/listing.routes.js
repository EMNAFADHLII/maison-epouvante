const express = require("express");
const Listing = require("../models/listing");
const authMiddleware = require("../middleware/auth.middleware");

const router = express.Router();

/**
 * CREATE listing
 */
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description, location, price, category, imageUrl } = req.body;

    if (!title || !description || !location || !price || !category) {
      return res.status(400).json({ message: "Champs manquants" });
    }

    const listing = new Listing({
      title,
      description,
      location,
      price,
      category,
      imageUrl,
      owner: req.user.id,
    });

    const saved = await listing.save();
    res.status(201).json(saved);
  } catch (error) {
    res.status(500).json({ message: "Erreur création annonce" });
  }
});

/**
 * GET all listings
 */
router.get("/", async (req, res) => {
  const listings = await Listing.find().sort({ createdAt: -1 });
  res.json(listings);
});

/**
 * DELETE listing
 */
router.delete("/:id", authMiddleware, async (req, res) => {
  const listing = await Listing.findById(req.params.id);

  if (!listing) return res.status(404).json({ message: "Introuvable" });
  if (listing.owner.toString() !== req.user.id)
    return res.status(403).json({ message: "Interdit" });

  await listing.deleteOne();
  res.json({ message: "Annonce supprimée" });
});

module.exports = router;

const Listing = require("../models/listing");

exports.getListings = async (req, res) => {
  try {
    const listings = await Listing.find().sort({ createdAt: -1 });
    return res.status(200).json(listings);
  } catch (error) {
    console.error("GET LISTINGS ERROR:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

exports.createListing = async (req, res) => {
  try {
    const { title, description, location, price, category, imageUrl } = req.body;

    if (!title || !description || !location || price === undefined) {
      return res.status(400).json({
        message: "title, description, location and price are required",
      });
    }

    const normalizedCategory = category || "Mysterieuse";
    const allowedCategories = ["Hantee", "Abandonnee", "Maudite", "Mysterieuse"];
    if (!allowedCategories.includes(normalizedCategory)) {
      return res.status(400).json({ message: "Invalid category" });
    }

    const listing = await Listing.create({
      title,
      description,
      location,
      price: Number(price),
      category: normalizedCategory,
      imageUrl: imageUrl || "",
      owner: req.user.id,
    });

    return res.status(201).json({
      message: "Listing created",
      listing,
    });
  } catch (error) {
    console.error("CREATE LISTING ERROR:", error);
    return res.status(500).json({ message: "Server error", error: error.message });
  }
};

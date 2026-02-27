// backend/src/controllers/auth.controllers.js

const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// IMPORTANT : ton modèle est dans backend/models/user.js
// Comme ce fichier est dans backend/src/controllers/, on remonte de 2 niveaux :
const User = require("../../models/user");

/**
 * REGISTER
 * POST /api/auth/register
 * Body: { email, password, firstname?, lastname? }
 */
exports.register = async (req, res) => {
 try {
 const { email, password, firstname, lastname } = req.body;

 // Validation minimale
 if (!email || !password) {
 return res.status(400).json({ message: "email and password are required" });
 }

 // Exemple: mot de passe min 6 (tu peux adapter)
 if (password.length < 6) {
 return res.status(400).json({
 message: "Password must be at least 6 characters long",
 });
 }

 // Vérifie si déjà existant
 const existing = await User.findOne({ email });
 if (existing) {
 return res.status(409).json({ message: "User already exists" });
 }

 // Hash password
 const hashedPassword = await bcrypt.hash(password, 10);

 // Création user
 const user = await User.create({
 email,
 password: hashedPassword,
 firstname: firstname || "",
 lastname: lastname || "",
 });

 return res.status(201).json({
 message: "Register successful",
 user: {
 id: user._id,
 email: user.email,
 firstname: user.firstname,
 lastname: user.lastname,
 },
 });
 } catch (error) {
 console.error("REGISTER ERROR:", error);
 return res.status(500).json({ message: "Server error", error: error.message });
 }
};

/**
 * LOGIN
 * POST /api/auth/login
 * Body: { email, password }
 */
exports.login = async (req, res) => {
 try {
 const { email, password } = req.body;

 // Validation minimale
 if (!email || !password) {
 return res.status(400).json({ message: "email and password are required" });
 }

 // Cherche l'user
 const user = await User.findOne({ email });
 if (!user) {
 return res.status(404).json({ message: "User not found" });
 }

 // Vérifie mot de passe
 const isMatch = await bcrypt.compare(password, user.password);
 if (!isMatch) {
 return res.status(401).json({ message: "Invalid credentials" });
 }

 // Vérifie JWT_SECRET
 if (!process.env.JWT_SECRET) {
 return res.status(500).json({ message: "JWT_SECRET is missing in .env" });
 }

 // Génère token
 const token = jwt.sign(
 { id: user._id, email: user.email },
 process.env.JWT_SECRET,
 { expiresIn: "1d" }
 );

 return res.status(200).json({
 message: "Login successful",
 token,
 user: {
 id: user._id,
 email: user.email,
 firstname: user.firstname || "",
 lastname: user.lastname || "",
 },
 });
 } catch (error) {
 console.error("LOGIN ERROR:", error);
 return res.status(500).json({ message: "Server error", error: error.message });
 }
};
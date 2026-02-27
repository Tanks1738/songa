const cors = require("cors");
const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const db = require("./db"); // MySQL pool

const app = express();

// ✅ Middleware first
app.use(cors());
app.use(express.json());

// REGISTER
app.post("/register", async (req, res) => {
  const { username, password, role, driverId, firstName, lastName, cellNumber, email } = req.body;
  if (!username || !password || !role || !firstName || !lastName || !cellNumber || !email) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const password_hash = await bcrypt.hash(password, 10);
    await db.query(
      "INSERT INTO users (username, password_hash, role, driver_id, first_name, last_name, cell_number, email) VALUES (?, ?, ?, ?, ?, ?, ?, ?)",
      [username, password_hash, role, role === "driver" ? driverId : null, firstName, lastName, cellNumber, email]
    );
    res.json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Registration error:", err);
    res.status(500).json({ error: "Failed to register user" });
  }
});

// LOGIN
app.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const [rows] = await db.query("SELECT * FROM users WHERE username = ?", [username]);
    const user = rows[0];
    if (!user) return res.status(401).json({ error: "Invalid credentials" });

    const valid = await bcrypt.compare(password, user.password_hash);
    if (!valid) return res.status(401).json({ error: "Invalid credentials" });

    const token = jwt.sign(
      { id: user.id, role: user.role, driverId: user.driver_id },
      process.env.JWT_SECRET || "mysecret",
      { expiresIn: "1h" }
    );

    res.json({ token });
  } catch (err) {
    console.error("Login error:", err);
    res.status(500).json({ error: "Server error" });
  }
});

// ✅ Start server once
app.listen(3001, () => console.log("Server running on port 3001"));
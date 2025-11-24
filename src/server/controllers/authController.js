import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { pool } from "../config/db.js";

function generateAccessToken(user) {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );
}

function generateRefreshToken(user) {
  return jwt.sign(
    {
      id: user.id,
      name: user.name,
      email: user.email,
      created_at: user.created_at,
    },
    process.env.REFRESH_TOKEN_SECRET,
    { expiresIn: "1d" }
  );
}

export const register = async (req, res) => {
  console.log("register");
  const { name, email, password } = req.body;

  try {
    const userExist = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (userExist.rowCount > 0) {
      return res.status(400).json({ error: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await pool.query(
      "INSERT INTO users (name,email,password_hash) VALUES ($1,$2,$3) RETURNING id, name, email, created_at",
      [name, email, hashedPassword]
    );

    const user = newUser.rows[0];

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(201).json({
      messege: "user registered successfully",
      accessToken,
      user,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error during registration" });
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);
    if (result.rows.length === 0) {
      return res.body.status(400).json({ error: "Invalid email or password" });
    }

    const user = result.rows[0];
    // console.log(user);

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: "Invalid email or password" });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    res.cookie("refreshToken", refreshToken, {
      httpOnly: true,
      secure: true,
      sameSite: "Strict",
      maxAge: 24 * 60 * 60 * 1000, // 1 day
    });

    res.status(200).json({
      messege: "Login successfull",
      accessToken,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        created_at: user.created_at,
      },
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Server error during login" });
  }
};

export const refreshToken = async (req, res) => {
  const token = req.cookies.refreshToken;
  if (!token) return res.status(401).json({ error: "No refresh token" });

  try {
    const decoded = jwt.verify(token, process.env.REFRESH_TOKEN_SECRET);
    const accessToken = generateAccessToken(decoded);
    res.json({ accessToken });
  } catch (err) {
    console.error(err);
    res.status(403).json({ error: "Invalid refresh token" });
  }
};

export const logout = (req, res) => {
  res.clearCookie("refreshToken", {
    httpOnly: true,
    secure: true,
    sameSite: "Strict",
  });
  res.status(200).json({ messege: "Logged out successfully" });
};

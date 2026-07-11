const express = require("express");
const router = express.Router();
const CryptoUser = require("../models/cryptoUser");
const passport = require("../config/AdminPassport");
const { ensureAuthenticated } = require("../config/auth"); // If this is for users, ensure you have an admin check
const dotenv = require("dotenv");

dotenv.config();

// Login GET
router.get("/admin", async (req, res) => {
  res.render("adminLogin");
});

// Login POST - Validates PIN and handles session routing
router.post("/admin-login", (req, res, next) => {
  const { pin } = req.body;

  if (pin !== process.env.ADMIN_PIN) {
    req.flash("error_msg", "Incorrect Admin Pin");
    return res.redirect("/admin");
  }

  // Set a lightweight admin session key (or use passport authentication)
  req.session.isAdmin = true;
  return res.redirect("/crypto-user");
});

// Middleware guard to protect admin routes from direct URL access
const verifyAdminSession = (req, res, next) => {
  if (req.session && req.session.isAdmin) {
    return next();
  }
  req.flash("error_msg", "Unauthorized access. Please authenticate.");
  res.redirect("/admin");
};

// All Users Dashboard - PROTECTED
router.get("/crypto-user", verifyAdminSession, async (req, res) => {
  try {
    const allUsers = await CryptoUser.find();
    res.render("cryptouser", { tickets: allUsers });
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Toggle Account Status Route - NEW
router.post("/toggle-status/:id", verifyAdminSession, async (req, res) => {
  try {
    const user = await CryptoUser.findById(req.params.id);
    if (!user) return res.status(404).send("User not found");

    // Alternates status conditionally
    user.accountStatus = user.accountStatus === "Active" ? "Not Active" : "Active";
    await user.save();

    req.flash("success_msg", `Updated status for ${user.email} to ${user.accountStatus}`);
    res.redirect("/crypto-user");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Edit User GET - PROTECTED
router.get("/edit-cryptouser/:id", verifyAdminSession, async (req, res) => {
  const ticket = await CryptoUser.findById(req.params.id);
  if (!ticket) {
    return res.send("error, cannot get item");
  }
  res.render("editCryptoUser", { ticket });
});

// Edit User POST - PROTECTED
router.post("/edit-cryptouser/:id", verifyAdminSession, async (req, res) => {
  const { id } = req.params;
  const {
    fullname,
    email,
    telephone,
    username,
    accountBalance,
    totalProfit,
    totalBonus,
    withdrawal,
    deposit,
  } = req.body;

  try {
    const editUser = await CryptoUser.findByIdAndUpdate(id, {
      fullname,
      email,
      telephone,
      username,
      accountBalance,
      totalProfit,
      totalBonus,
      withdrawal,
      deposit,
    });

    if (!editUser) return res.send("error");

    req.flash("success_msg", "You have successfully updated " + email);
    res.redirect("/crypto-user");
  } catch (err) {
    res.status(500).send("Server Error");
  }
});

// Delete User Route - PROTECTED
router.get("/delete-cryptouser/:id", verifyAdminSession, async (req, res) => {
  const ticketId = req.params.id;
  try {
    await CryptoUser.findByIdAndDelete(ticketId);
    req.flash("success_msg", "User account deleted.");
    res.redirect("/crypto-user");
  } catch (err) {
    console.error(err);
    res.status(500).send("Server Error");
  }
});

// Admin Logout - Clears Session State
router.get("/admin-logout", (req, res) => {
  req.session.isAdmin = false;
  req.flash("success_msg", "Logged out of admin terminal.");
  res.redirect("/admin");
});

module.exports = router;

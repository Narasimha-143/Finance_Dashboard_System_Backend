const express = require("express");
const router = express.Router();

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  toggleUserStatus,
  deleteUser,     
  restoreUser,     
} = require("../controllers/userController");

// Middleware
const authenticateUser = require("../middleware/authMiddleware");
const { authorizeRoles } = require("../middleware/roleMiddleware");

// Validation
const validate = require("../middleware/validateMiddleware");
const {
  createUserSchema,
  updateUserSchema,
} = require("../validators/userValidator");


// CREATE USER
router.post(
  "/",
  validate(createUserSchema),
  createUser
);

// GET ALL USERS (Admin only)
router.get(
  "/",
  authenticateUser,
  authorizeRoles("admin"),
  getUsers
);

// GET SINGLE USER (Admin only)
router.get(
  "/:id",
  authenticateUser,
  authorizeRoles("admin"),
  getUserById
);

// UPDATE USER (Admin only)
router.put(
  "/:id",
  authenticateUser,
  authorizeRoles("admin"),
  validate(updateUserSchema),
  updateUser
);

// TOGGLE USER STATUS (Admin only)
router.patch(
  "/:id/toggle-status",
  authenticateUser,
  authorizeRoles("admin"),
  toggleUserStatus
);

// SOFT DELETE USER (Admin only)
router.delete(
  "/:id",
  authenticateUser,
  authorizeRoles("admin"),
  deleteUser
);

//  RESTORE USER (Admin only)
router.patch(
  "/:id/restore",
  authenticateUser,
  authorizeRoles("admin"),
  restoreUser
);

module.exports = router;
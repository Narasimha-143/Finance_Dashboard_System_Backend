const express = require("express");
const router = express.Router();

const {
  createRecord,
  getRecords,
  updateRecord,
  deleteRecord,
} = require("../controllers/recordController");

const { authorizeRoles } = require("../middleware/roleMiddleware");
const authenticateUser = require("../middleware/authMiddleware");

//  Validation
const validate = require("../middleware/validateMiddleware");
const { recordSchema } = require("../validators/recordValidator");


//  CREATE (Admin only + Validation)
router.post(
  "/",
  authenticateUser,
  authorizeRoles("admin"),
  validate(recordSchema),
  createRecord
);


//  READ (All roles)
router.get(
  "/",
  authenticateUser,
  authorizeRoles("admin", "analyst", "viewer"),
  getRecords
);


//  UPDATE (Admin only + Validation)
router.put(
  "/:id",
  authenticateUser,
  authorizeRoles("admin"),
  validate(recordSchema),
  updateRecord
);


//  DELETE (Admin only)
router.delete(
  "/:id",
  authenticateUser,
  authorizeRoles("admin"),
  deleteRecord
);

module.exports = router;
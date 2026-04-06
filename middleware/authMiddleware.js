const jwt = require("jsonwebtoken");
const User = require("../models/user");

const authenticateUser = async (req, res, next) => {
  try {
    // 1. Get Authorization header
    const header = req.headers.authorization;

    if (!header || !header.startsWith("Bearer ")) {
      return res.status(401).json({ message: "No token provided" });
    }

    // 2. Extract token
    const token = header.split(" ")[1];

    // 3. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4. Fetch full user from DB
    const user = await User.findById(decoded.id).select("-password");

    // 5. Check if user exists
    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    // 6. SOFT DELETE CHECK
    if (user.isDeleted) {
      return res.status(403).json({
        message: "Account has been deleted. Please contact admin.",
      });
    }

    // 7. Check if user is active
    if (user.isActive === false) {
      return res.status(403).json({ message: "User account is inactive" });
    }

    // 8. Attach user to request
    req.user = user;

    // 9. Continue
    next();
  } catch (err) {
    return res.status(401).json({
      message: "Invalid or expired token",
    });
  }
};

module.exports = authenticateUser;
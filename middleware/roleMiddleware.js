const authorizeRoles = (...roles) => {
  return (req, res, next) => {
    try {
      // Check authentication
      if (!req.user) {
        return res.status(401).json({
          message: "User not authenticated",
        });
      }

      // Check if account is active
      if (req.user.isActive === false) {
        return res.status(403).json({
          message: "User account is inactive",
        });
      }

      // Normalize roles
      const userRole = req.user.role.toLowerCase();
      const allowedRoles = roles.map((r) => r.toLowerCase());

      // Check authorization
      if (!allowedRoles.includes(userRole)) {
        return res.status(403).json({
          message: `Access denied. Allowed roles: ${roles.join(", ")}`,
        });
      }

      next();
    } catch (error) {
      return res.status(500).json({
        message: "Authorization error",
      });
    }
  };
};

module.exports = { authorizeRoles };
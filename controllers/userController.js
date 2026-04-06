const User = require("../models/user");

//  CREATE USER
exports.createUser = async (req, res, next) => {
  try {
    const user = await User.create(req.body);
    res.status(201).json({
      message: "User created successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};

//  GET ALL USERS (Pagination + Filtering + Search + Sorting + Soft Delete)
exports.getUsers = async (req, res, next) => {
  try {
    // 1. Pagination
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 5;
    const skip = (page - 1) * limit;

    // 2. Filtering (exclude deleted users)
    const filter = { isDeleted: false };

    if (req.query.role) {
      filter.role = req.query.role;
    }

    if (req.query.isActive !== undefined) {
      filter.isActive = req.query.isActive === "true";
    }

    // 3. Search
    if (req.query.search) {
      filter.name = {
        $regex: req.query.search,
        $options: "i",
      };
    }

    // 4. Sorting
    const sortBy = req.query.sortBy || "createdAt";
    const order = req.query.order === "desc" ? -1 : 1;

    // 5. Count
    const totalUsers = await User.countDocuments(filter);

    // 6. Fetch users
    const users = await User.find(filter)
      .sort({ [sortBy]: order })
      .skip(skip)
      .limit(limit);

    res.json({
      totalUsers,
      currentPage: page,
      totalPages: Math.ceil(totalUsers / limit),
      users,
    });
  } catch (err) {
    next(err);
  }
};

//  GET SINGLE USER (exclude deleted)
exports.getUserById = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (err) {
    next(err);
  }
};

//  UPDATE USER (ROLE / STATUS ONLY)
exports.updateUser = async (req, res, next) => {
  try {
    const allowedUpdates = ["role", "isActive"];

    const updates = {};
    allowedUpdates.forEach((field) => {
      if (req.body[field] !== undefined) {
        updates[field] = req.body[field];
      }
    });

    const user = await User.findOneAndUpdate(
      { _id: req.params.id, isDeleted: false }, //  prevent updating deleted users
      updates,
      { new: true, runValidators: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User updated successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};

//  TOGGLE ACTIVE / INACTIVE (exclude deleted)
exports.toggleUserStatus = async (req, res, next) => {
  try {
    const user = await User.findOne({
      _id: req.params.id,
      isDeleted: false,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.isActive = !user.isActive;
    await user.save();

    res.json({
      message: "User status toggled successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};

//  SOFT DELETE USER
exports.deleteUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        isDeleted: true,
        deletedAt: new Date(),
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User soft deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};

//  RESTORE USER
exports.restoreUser = async (req, res, next) => {
  try {
    const user = await User.findByIdAndUpdate(
      req.params.id,
      {
        isDeleted: false,
        deletedAt: null,
      },
      { new: true }
    );

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({
      message: "User restored successfully",
      user,
    });
  } catch (err) {
    next(err);
  }
};
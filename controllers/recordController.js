const Record = require("../models/record");

//  CREATE RECORD
exports.createRecord = async (req, res) => {
  try {
    const record = await Record.create(req.body);
    res.status(201).json({
      message: "Record created successfully",
      record,
    });
  } catch (err) {
    next(err);
  }
};

//  GET RECORDS (WITH FILTERING)
exports.getRecords = async (req, res) => {
  try {
    const { type, category, startDate, endDate } = req.query;

    let filter = {};

    if (type) filter.type = type;
    if (category) filter.category = category;

    //  Date filtering
    if (startDate && endDate) {
      filter.date = {
        $gte: new Date(startDate),
        $lte: new Date(endDate),
      };
    }

    const records = await Record.find(filter).sort({ date: -1 });

    res.json(records);
  } catch (err) {
    next(err);
  }
};

//  UPDATE RECORD
exports.updateRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({
      message: "Record updated successfully",
      record,
    });
  } catch (err) {
    next(err);
  }
};

//  DELETE RECORD
exports.deleteRecord = async (req, res) => {
  try {
    const record = await Record.findByIdAndDelete(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json({
      message: "Record deleted successfully",
    });
  } catch (err) {
    next(err);
  }
};
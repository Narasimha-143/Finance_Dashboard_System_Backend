const Record = require("../models/record");

exports.getDashboardSummary = async (req, res) => {
  try {
    //  Total Income
    const income = await Record.aggregate([
      { $match: { type: "income" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    //  Total Expense
    const expense = await Record.aggregate([
      { $match: { type: "expense" } },
      { $group: { _id: null, total: { $sum: "$amount" } } },
    ]);

    const totalIncome = income[0]?.total || 0;
    const totalExpense = expense[0]?.total || 0;

    //  Category-wise totals
    const categoryTotals = await Record.aggregate([
      {
        $group: {
          _id: "$category",
          total: { $sum: "$amount" },
        },
      },
    ]);

    //  Recent activity (last 5 records)
    const recentActivity = await Record.find()
      .sort({ date: -1 })
      .limit(5);

    //  Monthly trends
    const monthlyTrends = await Record.aggregate([
      {
        $group: {
          _id: { $month: "$date" },
          total: { $sum: "$amount" },
        },
      },
      { $sort: { "_id": 1 } },
    ]);

    res.json({
      totalIncome,
      totalExpense,
      netBalance: totalIncome - totalExpense,
      categoryTotals,
      recentActivity,
      monthlyTrends,
    });
  } catch (err) {
    next(err);
  }
};
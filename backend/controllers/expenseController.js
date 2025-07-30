import expenseModel from "../models/expenseSchema.js";

const addExpense = async (req, res) => {
  const userId = req.user?.id;
  console.log(req.body)
  const { title, amount, category, description, date } = req.body;

  const parsedAmount = Number(amount);

  try {
    if (!title  || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Amount must be a positive integer" });
    }

    const newExpense = new expenseModel({
      userId,
      title,
      amount,
      category,
      description,
      date,
    });

    await newExpense.save();

    res
      .status(200)
      .json({ success: true, message: "Income added", data: newExpense });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server issue" });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const deleteExpense = await expenseModel.findByIdAndDelete(id);

    if (!deleteExpense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    res
      .status(200)
      .json({ success: false, message: "Expense Deleted", deleteExpense });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server issue" });
  }
};

const updateExpense = async (req, res) => {
  const id = req.params;
  const { title, amount, income, category, description, date } = req.body;

  try {
    const expenseUpdate = await expenseModel.findById(id);

    if (!expenseUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found to update" });
    }

    expenseUpdate.title = title || expenseUpdate.title;
    expenseUpdate.amount = amount || expenseUpdate.amount;
    expenseUpdate.category = category || expenseUpdate.category;
    expenseUpdate.description = description || expenseUpdate.description;
    expenseUpdate.date = date || expenseUpdate.date;
    expenseUpdate.income = income || expenseUpdate.income;

    await expenseUpdate.save();

    res
      .status(200)
      .json({ success: true, message: "Expense updated", data: expenseUpdate });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server issue" });
  }
};

const getExpense = async (req, res) => {
  try {
    const userId = req.user?.id;
    const getExpense = await expenseModel.find({ userId: userId });

    if (!getExpense) {
      return res
        .status(404)
        .json({ success: false, message: "Expense not found" });
    }

    res.status(200).json({ success: true, data: getExpense });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server issue" });
  }
};

export { addExpense, deleteExpense, updateExpense, getExpense };

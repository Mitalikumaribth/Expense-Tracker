import IncomeModel from "../models/incomeSchema.js";

const addIncome = async (req, res) => {
    // console.log(req.user,"333333")
  const userId = req.user?.id;

  const { title, amount, income, category, description, date } = req.body;

  const parsedAmount = Number(amount);
    console.log(req.body)
  try {
    if (!title || !category || !description || !date) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (isNaN(parsedAmount) || parsedAmount <= 0) {
      return res
        .status(400)
        .json({ success: false, message: "Amount must be a positive integer" });
    }

    const newIncome = new IncomeModel({
      userId,
      title,
      amount,
      category,
      description,
      date,
      income,
    });

    await newIncome.save();

    res
      .status(200)
      .json({ success: true, message: "Income added", data: newIncome });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server issue" });
  }
};



const deleteIncome = async (req, res) => {
  console.log(req.params,"ssss")
  const { id } = req.params;

  try {
    const income = await IncomeModel.findByIdAndDelete(id);

    if (!income) {
      return res
        .status(404)
        .json({ success: false, message: "Income not found" });
    }

    res.status(200).json({ success: true, message: "Income Deleted", income });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server issue" });
  }
};



const updateIncome = async (req, res) => {
  const {id} = req.params;
  const { title, amount, income, category, description, date } = req.body;

  try {
    const incomeUpdate = await IncomeModel.findById(id);

    if (!incomeUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Income not found to update" });
    }

    incomeUpdate.title = title || incomeUpdate.title;
    incomeUpdate.amount = amount || incomeUpdate.amount;
    incomeUpdate.category = category || incomeUpdate.category;
    incomeUpdate.description = description || incomeUpdate.description;
    incomeUpdate.date = date || incomeUpdate.date;
    incomeUpdate.income = income || incomeUpdate.income;

    await updateIncome.save();

    res
      .status(200)
      .json({ success: true, message: "Income updated", data: expense });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server issue" });
  }
};

const getIncome = async (req, res) => {
  try {
    console.log(req.user.id + "hhhh");
    const userId = req.user?.id;
    const getIncome = await IncomeModel.find({ userId: userId });

    if (!getIncome) {
      return res
        .status(404)
        .json({ success: false, message: "Income not found" });
    }

    res.status(200).json({ success: true, data: getIncome });
  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Internal server issue" });
  }
};

export { addIncome, deleteIncome, updateIncome, getIncome };

const Customer = require("../models/Customer");

// Add customer
exports.addCustomer = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const userId = req.user.id || req.user._id;

    const customer = await Customer.create({
      name,
      email,
      phone,
      address,
      user: userId,
    });

    res.status(201).json({
      success: true,
      message: "Customer added successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding customer",
      error: error.message,
    });
  }
};

// Get all customers
exports.getCustomers = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const customers = await Customer.find({ user: userId }).sort({
      createdAt: -1,
    });

    res.status(200).json({
      success: true,
      customers,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching customers",
      error: error.message,
    });
  }
};

// Update customer
exports.updateCustomer = async (req, res) => {
  try {
    const { name, email, phone, address } = req.body;
    const userId = req.user.id || req.user._id;

    const customer = await Customer.findOneAndUpdate(
      {
        _id: req.params.id,
        user: userId,
      },
      {
        name,
        email,
        phone,
        address,
      },
      {
        new: true,
        runValidators: true,
      }
    );

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer updated successfully",
      customer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error updating customer",
      error: error.message,
    });
  }
};

// Delete customer
exports.deleteCustomer = async (req, res) => {
  try {
    const userId = req.user.id || req.user._id;

    const customer = await Customer.findOneAndDelete({
      _id: req.params.id,
      user: userId,
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error deleting customer",
      error: error.message,
    });
  }
};
// Import Customer model
const Customer = require('./models/Customer');

// Add Customer
exports.addCustomer = async (req, res) => {
  try {
    const { name, contactNumber, address } = req.body;

    // Save the customer
    const customer = new Customer({ name, contactNumber, address });
    await customer.save();

    res.status(201).json({ message: 'Customer added successfully' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

// Get Customers
exports.getCustomers = async (req, res) => {
  try {
    // Retrieve all customers
    const customers = await Customer.find();

    res.json(customers);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

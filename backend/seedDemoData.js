const mongoose = require("mongoose");
const dotenv = require("dotenv");
const bcrypt = require("bcryptjs");

dotenv.config();

const User = require("./models/User");
const Product = require("./models/Product");
const Customer = require("./models/Customer");
const Sale = require("./models/Sale");

const seedDemoData = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("MongoDB connected");

    let demoUser = await User.findOne({ email: "demo@bizsense.com" });

    if (!demoUser) {
      const hashedPassword = await bcrypt.hash("demo123", 10);

      demoUser = await User.create({
        name: "Demo Business Owner",
        email: "demo@bizsense.com",
        password: hashedPassword,
      });
    }

    await Product.deleteMany({ user: demoUser._id });
    await Customer.deleteMany({ user: demoUser._id });
    await Sale.deleteMany({ user: demoUser._id });

    const products = await Product.insertMany([
      {
        name: "Dell Inspiron Laptop",
        category: "Electronics",
        costPrice: 120000,
        price: 150000,
        quantity: 20,
        lowStockLimit: 5,
        supplier: "Dell Lanka",
        user: demoUser._id,
      },
      {
        name: "Logitech Wireless Mouse",
        category: "Accessories",
        costPrice: 2500,
        price: 4500,
        quantity: 80,
        lowStockLimit: 15,
        supplier: "TechZone",
        user: demoUser._id,
      },
      {
        name: "Mechanical Keyboard",
        category: "Accessories",
        costPrice: 4000,
        price: 7500,
        quantity: 35,
        lowStockLimit: 8,
        supplier: "TechZone",
        user: demoUser._id,
      },
      {
        name: "Samsung Monitor",
        category: "Electronics",
        costPrice: 45000,
        price: 65000,
        quantity: 18,
        lowStockLimit: 4,
        supplier: "Samsung Lanka",
        user: demoUser._id,
      },
      {
        name: "HP Printer",
        category: "Office Equipment",
        costPrice: 38000,
        price: 55000,
        quantity: 10,
        lowStockLimit: 3,
        supplier: "HP Distributors",
        user: demoUser._id,
      },
      {
        name: "Office Chair",
        category: "Furniture",
        costPrice: 18000,
        price: 28000,
        quantity: 25,
        lowStockLimit: 6,
        supplier: "Comfort Furnishers",
        user: demoUser._id,
      },
      {
        name: "Desk Lamp",
        category: "Home Office",
        costPrice: 2500,
        price: 5200,
        quantity: 30,
        lowStockLimit: 7,
        supplier: "BrightLite",
        user: demoUser._id,
      },
      {
        name: "Notebook Pack",
        category: "Stationery",
        costPrice: 600,
        price: 1200,
        quantity: 100,
        lowStockLimit: 20,
        supplier: "PaperWorld",
        user: demoUser._id,
      },
      {
        name: "USB Flash Drive",
        category: "Accessories",
        costPrice: 1800,
        price: 3200,
        quantity: 70,
        lowStockLimit: 15,
        supplier: "Kingston Lanka",
        user: demoUser._id,
      },
      {
        name: "Router",
        category: "Networking",
        costPrice: 8500,
        price: 14500,
        quantity: 28,
        lowStockLimit: 6,
        supplier: "NetworkHub",
        user: demoUser._id,
      },
      {
        name: "Printer Ink Set",
        category: "Office Supplies",
        costPrice: 3000,
        price: 5200,
        quantity: 60,
        lowStockLimit: 10,
        supplier: "PrintCare",
        user: demoUser._id,
      },
      {
        name: "Webcam HD",
        category: "Electronics",
        costPrice: 5500,
        price: 9500,
        quantity: 22,
        lowStockLimit: 5,
        supplier: "Digital Hub",
        user: demoUser._id,
      },
      {
        name: "External Hard Drive",
        category: "Storage",
        costPrice: 14000,
        price: 22000,
        quantity: 16,
        lowStockLimit: 4,
        supplier: "Kingston Lanka",
        user: demoUser._id,
      },
      {
        name: "Power Bank",
        category: "Accessories",
        costPrice: 4500,
        price: 7800,
        quantity: 45,
        lowStockLimit: 10,
        supplier: "Digital Hub",
        user: demoUser._id,
      },
      {
        name: "Projector",
        category: "Office Equipment",
        costPrice: 85000,
        price: 120000,
        quantity: 7,
        lowStockLimit: 2,
        supplier: "OfficePro",
        user: demoUser._id,
      },
    ]);

    const customers = await Customer.insertMany([
      {
        name: "Shanaya Dias",
        email: "shanaya@gmail.com",
        phone: "0710123456",
        address: "Wattala",
        user: demoUser._id,
      },
      {
        name: "Kavindu Perera",
        email: "kavindu@gmail.com",
        phone: "0779012345",
        address: "Panadura",
        user: demoUser._id,
      },
      {
        name: "Ryan De Silva",
        email: "ryan@gmail.com",
        phone: "0748901234",
        address: "Moratuwa",
        user: demoUser._id,
      },
      {
        name: "Amaya Wijesinghe",
        email: "amaya@gmail.com",
        phone: "0707890123",
        address: "Nugegoda",
        user: demoUser._id,
      },
      {
        name: "Kevin Jayasinghe",
        email: "kevin@gmail.com",
        phone: "0726789012",
        address: "Kurunegala",
        user: demoUser._id,
      },
      {
        name: "Nethmi Fernando",
        email: "nethmi@gmail.com",
        phone: "0785678901",
        address: "Matara",
        user: demoUser._id,
      },
      {
        name: "Michael Silva",
        email: "michael@gmail.com",
        phone: "0754567890",
        address: "Galle",
        user: demoUser._id,
      },
      {
        name: "Sarah Perera",
        email: "sarah.perera@gmail.com",
        phone: "0713456789",
        address: "Kandy",
        user: demoUser._id,
      },
      {
        name: "Allie Mendez",
        email: "allie@gmail.com",
        phone: "0762345678",
        address: "Negombo",
        user: demoUser._id,
      },
      {
        name: "John Logan",
        email: "john.logan@gmail.com",
        phone: "0771234567",
        address: "Colombo",
        user: demoUser._id,
      },
      {
        name: "Sarah Jayasinghe",
        email: "sarah.jayasinghe@gmail.com",
        phone: "0765558899",
        address: "Kandy",
        user: demoUser._id,
      },
      {
        name: "John Silva",
        email: "john.silva@gmail.com",
        phone: "0751112233",
        address: "Galle",
        user: demoUser._id,
      },
      {
        name: "Amanda Fernando",
        email: "amanda@gmail.com",
        phone: "0771234567",
        address: "Colombo",
        user: demoUser._id,
      },
      {
        name: "Nimal Perera",
        email: "nimal@gmail.com",
        phone: "0712223334",
        address: "Negombo",
        user: demoUser._id,
      },
    ]);

    const sales = [];

    for (let i = 0; i < 300; i++) {
      const product = products[Math.floor(Math.random() * products.length)];
      const customer = customers[Math.floor(Math.random() * customers.length)];

      const quantity = Math.floor(Math.random() * 3) + 1;
      const subtotal = product.price * quantity;
      const itemProfit = (product.price - product.costPrice) * quantity;

      const month = Math.floor(Math.random() * 6);
      const day = Math.floor(Math.random() * 25) + 1;

      sales.push({
        customer: customer._id,
        products: [
          {
            product: product._id,
            name: product.name,
            quantity,
            price: product.price,
            subtotal,
            costPrice: product.costPrice,
            profit: itemProfit,
          },
        ],
        totalAmount: subtotal,
        totalProfit: itemProfit,
        user: demoUser._id,
        createdAt: new Date(2026, month, day),
        updatedAt: new Date(2026, month, day),
      });
    }

    await Sale.insertMany(sales);

    console.log("Demo data inserted successfully");
    console.log("Products:", products.length);
    console.log("Customers:", customers.length);
    console.log("Sales:", sales.length);
    console.log("Demo login:");
    console.log("Email: demo@bizsense.com");
    console.log("Password: demo123");

    process.exit();
  } catch (error) {
    console.error("Seed error:", error);
    process.exit(1);
  }
};

seedDemoData();
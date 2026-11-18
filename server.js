
const express = require("express");
const cors = require("cors");

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// Temporary user data
let users = [
    {
        id: 1,
        name: "Arun",
        email: "arun@gmail.com",
        age: 22
    },
    {
        id: 2,
        name: "Kumar",
        email: "kumar@gmail.com",
        age: 23
    }
];

// HOME API
app.get("/", (req, res) => {
    res.send("Welcome to CodeOrbitTech REST API!");
});

// GET - View all users
app.get("/api/users", (req, res) => {
    res.status(200).json({
        message: "Users retrieved successfully",
        users: users
    });
});

// GET - View user by ID
app.get("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    res.json(user);
});

// POST - Create new user
app.post("/api/users", (req, res) => {
    const { name, email, age } = req.body;

    if (!name || !email || age === undefined) {
        return res.status(400).json({
            message: "Please provide name, email and age"
        });
    }

    const newUser = {
        id: Date.now(),
        name,
        email,
        age
    };

    users.push(newUser);

    res.status(201).json({
        message: "User created successfully",
        user: newUser
    });
});

// PUT - Update user
app.put("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    const { name, email, age } = req.body;

    if (!name || !email || age === undefined) {
        return res.status(400).json({
            message: "Please provide name, email and age"
        });
    }

    user.name = name;
    user.email = email;
    user.age = age;

    res.json({
        message: "User updated successfully",
        user
    });
});

// DELETE - Remove user
app.delete("/api/users/:id", (req, res) => {
    const id = Number(req.params.id);

    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({
            message: "User not found"
        });
    }

    users.splice(index, 1);

    res.json({
        message: "User deleted successfully"
    });
});


// Handle unknown API routes
app.use((req, res) => {
    res.status(404).json({
        message: "API route not found"
    });
});

// Start server
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

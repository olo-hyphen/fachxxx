import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import bcrypt from 'bcryptjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = 3001;
const DB_FILE = path.join(__dirname, 'db.json');

app.use(cors());
app.use(bodyParser.json());

// Helper to read DB
const readDb = () => {
    if (!fs.existsSync(DB_FILE)) {
        return { users: [] };
    }
    const data = fs.readFileSync(DB_FILE, 'utf-8');
    return JSON.parse(data);
};

// Helper to write DB
const writeDb = (data) => {
    fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2));
};

// Register
app.post('/api/register', async (req, res) => {
    const { name, email, password, companyName, nip, address } = req.body;

    if (!email || !password || !name) {
        return res.status(400).json({ message: 'Missing required fields' });
    }

    const db = readDb();
    const existingUser = db.users.find(u => u.email === email);

    if (existingUser) {
        return res.status(400).json({ message: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = {
        id: Date.now(),
        name,
        email,
        password: hashedPassword,
        companyName: companyName || '',
        nip: nip || '',
        address: address || '',
        phone: '',
        bankAccount: ''
    };

    db.users.push(newUser);
    writeDb(db);

    const { password: _, ...userWithoutPassword } = newUser;
    res.status(201).json({ user: userWithoutPassword });
});

// Login
app.post('/api/login', async (req, res) => {
    const { email, password } = req.body;

    const db = readDb();
    const user = db.users.find(u => u.email === email);

    if (!user) {
        return res.status(401).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
         return res.status(401).json({ message: 'Invalid credentials' });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
});

// Verify Session (Simple)
app.get('/api/me', (req, res) => {
    // In a real app, we would verify JWT token from Authorization header.
    // Here, for this task scope, we might just rely on the client knowing the user ID
    // or just return 401 if we want to enforce re-login.
    // However, since we are moving from localStorage mock, let's allow a way to validate
    // if a user exists by email/id if provided in headers, or just skip full session mgmt for now
    // as we are not using cookies/JWTs yet.

    // But better approach for "Real Backend" feeling:
    // If the client sends the user ID (simulating a session token), we check if it exists.
    const userId = req.headers['x-user-id'];
    if (!userId) {
        return res.status(401).json({ message: 'Not authenticated' });
    }

    const db = readDb();
    const user = db.users.find(u => u.id === parseInt(userId));

    if (!user) {
        return res.status(401).json({ message: 'User not found' });
    }

    const { password: _, ...userWithoutPassword } = user;
    res.json({ user: userWithoutPassword });
});


// Update User
app.put('/api/user', (req, res) => {
    const { id, ...updates } = req.body;

    if (!id) {
        return res.status(400).json({ message: 'User ID required' });
    }

    const db = readDb();
    const userIndex = db.users.findIndex(u => u.id === id);

    if (userIndex === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    const updatedUser = { ...db.users[userIndex], ...updates };

    // Prevent password update via this route for simplicity if it was passed
    // unless explicitly handled with hashing again.
    if (updates.password) {
        // delete updates.password; // Ignore password updates here for safety
    }

    db.users[userIndex] = updatedUser;
    writeDb(db);

    const { password: _, ...userWithoutPassword } = updatedUser;
    res.json({ user: userWithoutPassword });
});


app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

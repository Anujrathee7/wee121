"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const path_1 = __importDefault(require("path"));
const Book_1 = require("./models/Book");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 1234;
app.use(express_1.default.json());
if (process.env.NODE_ENV === 'development') {
    app.use((0, cors_1.default)({ origin: 'http://localhost:3000' }));
}
// Database setup
mongoose_1.default.connect('mongodb://localhost:27017/books');
// POST /api/book
app.post('/api/book', async (req, res) => {
    try {
        const newBook = new Book_1.Book(req.body);
        const saved = await newBook.save();
        res.status(201).json(saved);
    }
    catch (err) {
        res.status(400).json({ error: 'Failed to save book' });
    }
});
// GET /api/book/:name
app.get('/api/book/:name', async (req, res) => {
    try {
        const book = await Book_1.Book.findOne({ name: req.params.name });
        if (book) {
            res.json(book);
        }
        else {
            res.status(404).json({ error: 'Book not found' });
        }
    }
    catch {
        res.status(500).json({ error: 'Server error' });
    }
});
// Serve React build in production
if (process.env.NODE_ENV === 'production') {
    app.use(express_1.default.static(path_1.default.resolve(__dirname, '../../client/build')));
    app.get('*', (_, res) => {
        res.sendFile(path_1.default.resolve(__dirname, '../../client/build', 'index.html'));
    });
}
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

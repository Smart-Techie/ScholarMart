const express = require('express');
const router = express.Router();
const db = require('../config/db');
const { authenticate, isAdmin } = require('../middleware/auth');

const defaultCategories = [
    { id: 1, name: 'Hostel Essentials' },
    { id: 2, name: 'Gadgets' },
    { id: 3, name: 'Textbooks & Notes' },
    { id: 4, name: 'Fashion & Apparel' },
    { id: 5, name: 'Food & Provisions' },
    { id: 6, name: 'Services & Tutorials' },
    { id: 7, name: 'Stationery & Supplies' },
    { id: 8, name: 'Beauty & Personal Care' },
    { id: 9, name: 'Other Campus Items' }
];

// Get all categories
router.get('/', async (req, res) => {
    try {
        const result = await db.query('SELECT * FROM categories');
        if (result.rows && result.rows.length > 0) {
            return res.json({ status: 'success', categories: result.rows });
        }
        // Fallback: Return 9 default categories if table is unpopulated
        return res.json({ status: 'success', categories: defaultCategories });
    } catch (err) {
        // Fallback even on DB connection/table missing errors
        return res.json({ status: 'success', categories: defaultCategories });
    }
});

// Add a category (DISABLED: predefined categories only)
router.post('/', authenticate, isAdmin, async (req, res) => {
    return res.status(403).json({ status: 'error', message: 'Category addition is disabled. Predefined categories are fixed.' });
});

module.exports = router;

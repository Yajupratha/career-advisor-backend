const express = require('express');
const { body, validationResult } = require('express-validator'); // Import express-validator
const Career = require('../models/Career'); // Import Career model

const router = express.Router();

// ✅ Validation rules for adding a career
const validateCareer = [
    body('name').isString().withMessage('Name must be a string and required.').notEmpty(),
    body('description').isString().withMessage('Description must be a string and required.').notEmpty(),
    body('educationLevel').isString().withMessage('Education level must be a string.').notEmpty(),
    body('skillsRequired').isArray({ min: 1 }).withMessage('Skills must be a non-empty array.'),
    body('jobRoles').isArray().withMessage('Job roles must be an array.'),
    body('industries').isArray().withMessage('Industries must be an array.')
];

// ✅ Route to add a new career (with validation)
router.post('/add', validateCareer, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const career = new Career(req.body);
        await career.save();
        res.status(201).json({ message: 'Career added successfully!', career });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Route to get all careers
router.get('/', async (req, res) => {
    try {
        const careers = await Career.find();
        careers = careers.filter(career => career.name && career.name.trim() !== ""); // Filter out empty names
        res.json(careers);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// ✅ Validation rules for filtering careers
const validateFilter = [
    body('skills').optional().isArray().withMessage('Skills must be an array.'),
    body('educationLevel').optional().isString().withMessage('Education level must be a string.'),
    body('industries').optional().isArray().withMessage('Industries must be an array.')
];

// ✅ Route to filter careers (with validation)
router.post('/filter', validateFilter, async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }

    try {
        const { skills, educationLevel, industries } = req.body;

        // Ensure at least one filter criterion is provided
        if (!skills && !educationLevel && !industries) {
            return res.json({ message: "Please provide at least one filter criterion." });
        }

        console.log("Received Request Body:", req.body);

        // Query careers based on provided filters
        const careers = await Career.find({
            ...(educationLevel && { educationLevel: educationLevel }),
            ...(industries && { industries: { $in: industries } }),
            ...(skills && { skillsRequired: { $in: skills } })
        });

        console.log("MongoDB Query Result:", careers);

        if (careers.length === 0) {
            return res.json({ message: "No matching careers found." });
        }

        res.json(careers);
    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ error: error.message });
    }
});

// Export the router
module.exports = router;

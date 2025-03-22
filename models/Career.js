const mongoose = require('mongoose');

const careerSchema = new mongoose.Schema({
    name: String,
    description: String,
    skillsRequired: [String],  // List of skills
    educationLevel: String,    // Example: Bachelor's, Master's, etc.
    jobRoles: [String],        // Example: Software Engineer, Data Scientist
    industries: [String],      // Example: IT, Healthcare, Finance
});

module.exports = mongoose.model('Career', careerSchema);

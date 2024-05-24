const mongoose = require('mongoose');

const TeamSchema = new mongoose.Schema({
    teamname: String,
    teamlead: String, // New field for team lead name
    branch: String    // New field for branch
});

const TeamModel = mongoose.model("team", TeamSchema);

module.exports = TeamModel;
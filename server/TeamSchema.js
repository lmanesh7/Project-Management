const mongoose = require("mongoose");

const TeamNameSchema = new mongoose.Schema(
  {
    team_name: {
      type: String,
     unique: true,
    }
  },
  {
    collection: "TeamName",
  }
);


module.exports = mongoose.model("TeamName", TeamNameSchema);
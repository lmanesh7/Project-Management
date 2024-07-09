const mongoose = require("mongoose");

const AssignedSchema = new mongoose.Schema(
  {
    user_story_id: mongoose.Schema.Types.ObjectId,
    user_id: mongoose.Schema.Types.ObjectId,
  },
  {
    collection: "Assigned",
  }
);

module.exports = mongoose.model("Assigned", AssignedSchema);

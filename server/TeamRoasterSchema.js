const mongoose = require("mongoose");

const TeamRosterSchema = new mongoose.Schema(
  {
    team_id: mongoose.Schema.Types.ObjectId,
    member_id: mongoose.Schema.Types.ObjectId,
  },
  {
    collection: "TeamRoster",
  }
);

module.exports = mongoose.model("TeamRoster", TeamRosterSchema);

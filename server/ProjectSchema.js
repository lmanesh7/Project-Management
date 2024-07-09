const mongoose = require("mongoose");

const ProjectSchema = new mongoose.Schema(
  {
    proj_name:{ type: String,
      unique: true,
    },
    proj_desc: String,
    prod_owner_id: mongoose.Schema.Types.ObjectId,
    mgr_id: mongoose.Schema.Types.ObjectId,
    team_id: mongoose.Schema.Types.ObjectId
    
  },
  {
    collection: "Projects",
  }
);


module.exports = mongoose.model("Project", ProjectSchema);
const mongoose = require("mongoose");

const TaskListSchema = new mongoose.Schema(
  {
    task: String,
    user_story_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'UserStory', 
    },
    created_by: mongoose.Schema.Types.ObjectId,
    status: String,
  },
  {
    collection: "TaskList",
  }
);

module.exports  = mongoose.model("TaskList", TaskListSchema);

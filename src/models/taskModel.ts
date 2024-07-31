import mongoose, { Schema } from "mongoose";

const taskSchema = new Schema({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  title: { type: String, required: true },
  description: String,
  status: {
    type: String,
    enum: ["To-Do", "In Progress", "Under Review", "Completed"],
    default: "To-Do",
  },
  priority: { type: String, enum: ["Low", "Medium", "Urgent"], default: "Low" },
  deadline: Date,
});

const TaskModel = mongoose.models.Task || mongoose.model("Task", taskSchema);
export default TaskModel;

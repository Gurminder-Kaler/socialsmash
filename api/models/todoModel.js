const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const todoModelSchema = Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String, //name of chatroom
    required: "Name is required!",
  },
  description: {
    type: String, //name of chatroom
    required: "Description is required!",
  },
  priority: {
    type: Number, //name of chatroom
    required: "Numeric Priority is required!",
  },
  isActive: {
    type: String,
    nullable: true
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("Todo", todoModelSchema);

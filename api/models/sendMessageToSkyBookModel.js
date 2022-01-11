const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const sendMessageToSkyBookSchema = Schema({
  _id: Schema.Types.ObjectId,
  user: { type: Schema.Types.ObjectId, ref: "User" },
  attachment: {
    type: String, //for reply
    default: null,
  },
  message: {
    type: String,
  },
  reportType: { type: Schema.Types.ObjectId, ref: "ReportType" },
  reply: {
    type: String,
  },
  status: {
    type: String,
    trim: true,
    enum: ["pending", "resolved", "ongoing"],
    default: "pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: null,
  },
  deletedAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model(
  "SendMessageToSkyBook",
  sendMessageToSkyBookSchema
);

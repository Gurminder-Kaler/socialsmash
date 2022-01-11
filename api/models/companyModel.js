const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const companySchema = Schema({
  _id: Schema.Types.ObjectId,
  name: {
    type: String,
  },
  about: {
    type: String,
  },
  image: {
    type: String,
  },
  coverImage: {
    type: String,
    default: null,
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: "CompanyCategory",
  },
  status: {
    type: String,
    trim: true,
    enum: ["hidden", "visible"],
    default: "visible",
  },
  createdBy: {
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
  deletedAt: {
    type: Date,
    default: null,
  },
});

module.exports = mongoose.model("Company", companySchema);

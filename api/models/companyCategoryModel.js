const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const companyCategorySchema = Schema({
  _id: Schema.Types.ObjectId,
  category: {
    type: String,
  },
  parent: {
    type: String,
    default: null,
  },
  image: {
    type: String,
    default: null,
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

module.exports = mongoose.model("CompanyCategory", companyCategorySchema);

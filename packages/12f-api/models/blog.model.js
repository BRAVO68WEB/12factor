const mongoose = require("mongoose");

const BlogSchema = new mongoose.Schema(
  {
    Title: {
      type: String,
      required: true,
    },
    Content: {
      type: String,
      required: true,
    },
    Tags: [
      {
        type: String,
        required: true,
      },
    ],
    Author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    isPublished: {
      type: Boolean,
      default: false,
    },
    publishedOn: {
      type: Date,
      default: null,
    },
    isDraft: { type: Boolean, default: true },
    reference: [
      {
        type: String,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Blogs", BlogSchema);

const mongoose = require("mongoose");

const logSchema = new mongoose.Schema({
  actor: {
    type: String,
    required: true,
    trim: true
  },
  role: {
    type: String,
    enum: ["admin", "user", "system"],
    required: true
  },
  action: {
    type: String,
    required: true,
    trim: true
  },
  resource: {
    type: String,
    required: true,
    trim: true
  },
  resourceType: {
    type: String,
    required: true
  },
  ipAddress: {
    type: String,
    match: [/^(\d{1,3}\.){3}\d{1,3}$/, "Invalid IP address"]
  },
  region: String,
  severity: {
    type: String,
    enum: ["LOW", "MEDIUM", "HIGH"],
    uppercase: true,
    required: true
  },
  status: {
    type: String,
    enum: ["Resolved", "Unresolved"],
    default: "Unresolved"
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});


logSchema.index({ timestamp: -1 });
logSchema.index({ severity: 1 });
logSchema.index({ status: 1 });
logSchema.index({ actor: 1 });

logSchema.index({
  actor: "text",
  action: "text",
  resource: "text"
});

module.exports = mongoose.model("Log", logSchema);
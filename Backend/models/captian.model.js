const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const captianSchema = new mongoose.Schema({
  fullname: {
    firstname: {
      type: String,
      required: true,
      minlength: [3, "First name must be at least 3 characters"],
    },
    lastname: {
      type: String,
      required: true,
      minlength: [3, "Last name must be at least 3 characters"],
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    minlength: [10, "Email must be at least 10 characters"],
  },
  password: {
    type: String,
    unique: true,
    select: false,
  },
  socketId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["active", "inactive"],
    default: "inactive",
  },
  vehicle: {
    color: {
      type: String,
      required: true,
      minlength: [3, "Color must be at least 3 characters"],
    },
    plate: {
      type: String,
      required: true,
      unique: true,
      minlength: [3, "plate must be at least 3 characters"],
    },
    capacity: {
      type: Number,
      required: true,
      min: [1, "Capacity must be at least 1"],
    },
    vehicleType: {
      type: String,
      enum: ["car", "motorcycle", "auto"],
      required: true,
    },
  },
  location: {
    latitude: {
      type: Number,
    },
    longitude: {
      type: Number,
    },
  },
});
captianSchema.methods.generateAuthToken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "24h",
  });
  return token;
};
captianSchema.methods.ComparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};
captianSchema.statics.hashPassword = async function (password) {
  return bcrypt.hash(password, 10);
};

const captianModel = mongoose.model("captian", captianSchema);

module.exports = captianModel;

const captainModel = require("../models/captian.model");
const captainService = require("../services/captain.services");
const { validationResult } = require("express-validator");
const blacklistTokenModel = require("../models/blacklistToken.model");
const captianModel = require("../models/captian.model");

module.exports.registerCaptain = async (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { fullname, email, password, vehicle } = req.body;
  const hashPassword = await captainModel.hashPassword(password);

  const isCaptainAlreadyExist = await captianModel.findOne({ email });
  if (isCaptainAlreadyExist) {
    res.status(400).json({ message: "Captain already exist" });
  }

  const captain = await captainService.createCaptain({
    firstname: fullname.firstname,
    lastname: fullname.lastname,
    email,
    password: hashPassword,
    color: vehicle.color,
    plate: vehicle.plate,
    capacity: vehicle.capacity,
    vehicleType: vehicle.vehicleType,
  });

  const token = captain.generateAuthToken();

  res.status(201).json({ token, captain });
};

module.exports.loginCaptain = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  const captain = await captainModel.findOne({ email }).select("+password");

  if (!captain) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const isMatch = await captain.ComparePassword(password);
  if (!isMatch) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  const token = captain.generateAuthToken();

  res.cookie("token", token);

  res.status(200).json({ token, captain });
};

module.exports.getCaptainProfile = async (req, res, next) => {
  res.status(200).json(req.captain);
};

module.exports.logoutCaptain = async (req, res, next) => {
  res.clearCookie("token");

  const token =
    req.cookies?.token ||
    (req.headers.authorization && req.headers.authorization.split(" ")[1]);

  if (token) {
    await blacklistTokenModel.create({ token });
  }

  res.status(200).json({ message: "Logged out successfully" });
};

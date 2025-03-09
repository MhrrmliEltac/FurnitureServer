const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

const UserSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, required: true, minlength: 6 },
    role: { type: String, enum: ["user", "admin"], default: "user" },
    avatar: { type: String, default: "https://example.com/default-avatar.png" },
  },
  { timestamps: true }
);

// Parol hash etmək (bcrypt əvəzinə bcryptjs istifadə edirik)
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    this.password = await bcrypt.hash(this.password, 10); // bcrypt.genSalt(10) olmadan
    next();
  } catch (error) {
    next(error);
  }
});

// Parolu müqayisə etmək
UserSchema.methods.comparePassword = async function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const UserModel = mongoose.model("users", UserSchema);

module.exports = UserModel;

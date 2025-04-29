const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true, unique: true, trim: true},
    password: {type: String, minlength: 6},
    googleId: { type: String }, 
    //role 1: super admin, role 2: normal adming, role 3: normal user
    role: {type: Number, default: 3},

    //for email verification
    verificationCode:  String,
    //for forget password
    forgotPasswordCode: String,
    isVerified: {type: Boolean, default: false},
    profilePic: {type: mongoose.Types.ObjectId, ref:"file"}
}, {timestamps: true})

// Check if the model has already been compiled
const User = mongoose.models.user || mongoose.model("user", userSchema);

// const User = mongoose.model("user", userSchema)

module.exports = User
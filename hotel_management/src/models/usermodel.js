const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const mongoose = require('mongoose');

// Define the User schema
const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    match: [
      /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/,
      'Please enter a valid email address',
    ],
  },
  password: {
    type: String,
    required: [true, "password must be required"],
    select: false,
    match: [
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      'Password must be at least 8 characters long and include one letter, one number, and one special character',
    ],
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  bookings: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Booking',
    },
  ],
  properties: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'properties'
    },
  ]
},{timestamps:true});

userSchema.methods.generateauthtoken = function () {
  const token = jwt.sign({ _id: this._id }, process.env.JWT_SECRET,
    { expiresIn: '5h' })
    return token;
}

userSchema.statics.authenticate = async function (email, password) {
  const user = await this.findOne({ email }).select("+password");
  if (!user) {
    throw new Error("Invalid username or password");
  }
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    throw new Error("Invalid username or password");
  }
  return user;
}

userSchema.pre("save", async function (next) {
  if (this.isModified("password")) {
    this.password = await bcrypt.hashSync(this.password, 10);
  }
  next();
})

const User = mongoose.model('User', userSchema);

module.exports = User;

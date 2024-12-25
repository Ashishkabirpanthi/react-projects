const User = require('../models/usermodel.js');
const jwt = require('jsonwebtoken');
const { CustomError } = require('./src/utils/customError.js');

exports.currentUser = (req, res) => {
    res.status(200).json({
        user: req.user
    });
}

exports.signup = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {

        const existingUser = User.findOne({ email })
        if (existingUser) return next(new CustomError('Email already exists', 400));

        const user = await User.create({ username, email, password });
        await user.save();

        const token = User.generateauthtoken();

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 5,
        });

        res.status(200).json({ success: true, Message: "User created successfully", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.login = async (req, res, next) => {
    const { email, password } = req.body;

    try {

        const existingUser = User.findOne({ email })
        if (!existingUser) return next(new CustomError('User Not found', 400));

        const user = await AuthenticateUser(email, password)

        const token = User.generateauthtoken();

        res.cookie('token', token, {
            httpOnly: true,
            maxAge: 1000 * 60 * 60 * 5,
        });

        res.status(200).json({ success: true, Message: "User login successfully", token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.logout = async (req, res, next) => {
    try {
        res.clearCookie('token', {
            httpOnly: true,
            secure: true,
        });


        res.status(200).json({ success: true, Message: "User logout successfully" });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.updateProfile = async (req, res, next) => {
    const { username, email, password } = req.body;
    try {
        if (username) req.user.username = username;
        if (email) req.user.email = email;
        if (password) req.user.password = password;

        await req.user.save();

        const user = req.user;


        res.status(200).json({ success: true, Message: "Profile updated successfully", user: user, });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports.resetPassword = async (req, res, next) => {
    const { email } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return next(new CustomError("User not found", 404));

        const resetToken = jwt.sign({ id: this._id }, process.env.JWT_SECRET_KEY, {
            expiresIn: "1h",
        });

        const resetLink = `http://localhost:5713/reset-password/${resetToken}`;

        const transporter = nodemailer.createTransport({
            service: "gmail",
            auth: {
                user: process.env.NODEMAILER_MAIL,
                pass: process.env.NODEMAILER_APP_PASSWORD,
            },
        });

        const mailOption = {
            from: process.env.NODEMAILER_MAIL,
            to: email,
            subject: "Password Reset Request",
            text: `Click on the link to reset your password ${resetLink}`
        }

        await transporter.sendMail(mailOption);

        res.json({ message: "Password reset link sent to your email" })

    } catch (error) {
        next(new CustomError(error.message, 500));
    }
};



const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.nodemail,
        pass: process.env.nodemailerpassword
    }
});

exports.sendEmail = (email, subject, html) => {
    const mailOptions = {
        from: process.env.nodemail,
        to: email,
        subject: subject,
        html: html
    };
    return transporter.sendEmail(mailOptions);
}
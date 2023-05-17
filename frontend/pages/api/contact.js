export default async function(req, res) {
    try {
        const nodemailer = require("nodemailer")
        const CryptoJS = require("crypto-js")

        const decryptedEmail = CryptoJS.AES.decrypt(req.body.email.replaceAll("*", "/"), "Secret Passphrase").toString(CryptoJS.enc.Utf8);

        console.log(decryptedEmail)

        const transporter = nodemailer.createTransport({
            host: process.env.NEXT_PUBLIC_HOST,
            port: process.env.NEXT_PUBLIC_MAIL_PORT,
            secure: process.env.NEXT_PUBLIC_SECURE,
            auth: {
                user: process.env.NEXT_PUBLIC_USER,
                pass: process.env.NEXT_PUBLIC_PASS,
            },
        });
    
        await transporter.sendMail({
            from: process.env.NEXT_PUBLIC_USER,
            to: decryptedEmail,
            subject: "Someone Landed on your Page",
            text: req.body.ipDetails,
        });

        res.send(decryptedEmail)
    } catch (err) {
        res.send(err)
    }
}
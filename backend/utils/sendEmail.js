const nodeMailer = require("nodemailer")
const { options } = require("../routes/productRoute")

const sendEmail = async (options)=>{
    const transporter = nodeMailer.createTransport({
        service: process.env.SMTP_SERVICE,
        auth: {
          user: process.env.SMTP_MAIL,
          pass: process.env.SMTP_PASSWORD,
        },
      });
    
      const mailOptions = {
        from: process.env.SMTP_MAIL,
        to: options.email,
        subject: options.subject,
        text: options.message,
      };
    console.log(process.env.SMTP_PASSWORD,process.env.SMTP_PORT,)
    await transporter.sendMail(mailOptions)
}
module.exports = sendEmail
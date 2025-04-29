//to send the verification code to the certain email

const nodeMail = require("nodemailer")
const {senderEmail, emailPassword} = require("../config/keys")    


const sendEmail = async (emailTo, subject, code, content) => {
    const transporter = nodeMail.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false,
        auth: {
            user: senderEmail, 
            pass: emailPassword,
        }
    })

    const message = {
        to: emailTo,
        subject: subject,
        html:`
            <div>
                <h3>Use this below code to ${content}</h3>
                <p><strong>Code : </strong> ${code}</p>
            </div>
            `,
    }

    await transporter.sendMail(message)
   
}

module.exports = sendEmail
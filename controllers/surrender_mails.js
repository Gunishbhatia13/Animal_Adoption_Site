const mailer = require('nodemailer')

const surrender_mails = async (email, name, petName, about, contact) => {

    let transporter = mailer.createTransport(
        {
            service: "gmail",
            auth: {
                user: "tirthangkardas@gmail.com",
                pass: "cdbzanodzdlmhfxm"
            }
        }
    )

    let info = transporter.sendMail({
        from: email,
        to: 'tirthangkardas@gmail.com',
        subject: "Paw Care (pet surrender request)",
        html: ` <h2>Owner's Name: ${name}</h2>
                <h2>Pet's Name: ${petName}</h2>
                <h2>${about}</h2>
                <h2>Contact: ${contact}</h2>
                <h2>Email: ${email}</h2>
            `, 
    });
}

module.exports = surrender_mails
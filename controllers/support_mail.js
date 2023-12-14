const mailer = require('nodemailer')

const support_mail = async (name, email, query, contact) => {

    let transporter = mailer.createTransport(
        {
            service: "gmail",
            auth: {
                user: "tirthangkardas@gmail.com",
                pass: "iclvehgaaqzkgehz"
            }
        }
    )

    let info = transporter.sendMail({
        from: `${name} <${email}>`,
        to: 'tirthangkardas@gmail.com, dharshreya2018@gmail.com',
        subject: "Paw Care (Support Query)",
        html: 
            `   <h2>Name: ${name}</h2>
                <h2>${query}</h2>
                <h2>Contact Number: ${contact}</h2>
                <h2>Email: ${email}</h2>
            `,
    });
}

module.exports = support_mail
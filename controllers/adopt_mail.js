const mailer = require('nodemailer')

const adoption_mail = async (name, about, id, phone, email) => {

    let transporter = mailer.createTransport(
        {
            service: "gmail",
            auth: {
                user: "tirthangkardas@gmail.com",
                pass: "qtgpobtgioerrewt"
            }
        }
    )

    let info = transporter.sendMail({
        from: email,
        to: 'tirthangkardas@gmail.com',
        subject: "Paw Care (Adoption Request)",
        html: ` <h2>Pet's Name: ${name}</h2>
                <h2>${about}</h2>
                <h2>ID: ${id}</h2>
                <h2>Contact: ${phone}</h2>
                <h2>Email: ${email}</h2>
            `, 
    });
}

module.exports = adoption_mail
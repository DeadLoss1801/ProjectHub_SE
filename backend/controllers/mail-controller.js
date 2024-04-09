const nodemailer = require('nodemailer');


const transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
        user: 'deadloss1801@gmail.com',
        pass: 'ccqumarifjwbsytc'
    }
});

const mailHandler = async (req, res) => {
    const { name, email, message } = req.body;

    const mailOptions = {
        from: 'deadloss1801@gmail.com',
        to: 'abhi1801jeet@gmail.com',
        subject: 'Contact Form Submission',
        text: `Name: ${name}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Failed to send email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully');
        }
    });
}

const proposalHandler = async (req, res) => {
    const { email, title, description } = req.body;
    const mailOptions = {
        from: 'deadloss1801@gmail.com',
        to: 'abhi1801jeet@gmail.com',
        subject: 'Project proposal from new client',
        text: `Email: ${email}\nTitle: ${title}\nDescription: ${description}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send('Failed to send email');
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send('Email sent successfully');
        }
    });
}

module.exports = { mailHandler, proposalHandler }
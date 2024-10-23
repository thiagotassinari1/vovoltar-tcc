const nodemailer = require("nodemailer");
const dotenv = require("dotenv").config();

// Configura o transporte do nodemailer com as credenciais do Gmail
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.ACESS_EMAIL,
        pass: process.env.ACESS_PASS,
    },
});

// Função para enviar o email de interesse
function sendInterestEmail(req, res) {
    const { email, userName } = req.body;

    const mailOptions = {
        from: process.env.ACESS_EMAIL,
        to: email,
        subject: "Interesse no seu perfil - Vovoltar",
        text: `A empresa demonstrou interesse em seu perfil. Fique atento às próximas etapas.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            return res.status(500).json({
                success: false,
                message: "Erro ao enviar email de interesse.",
                error: error.message,
            });
        }
        res.status(200).json({
            success: true,
            message: `Email enviado com sucesso para ${userName}.`,
        });
    });
}

module.exports = {
    sendInterestEmail,
};

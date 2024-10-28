const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");

// Configura o transporte do nodemailer com as credenciais fornecidas
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.email,  // Verificar se o valor de process.env.EMAIL está correto
        pass: process.env.senha_email,  // Verificar se o valor de process.env.EMAIL_PASSWORD está correto
    },
});

// Função para enviar o e-mail de interesse
function sendInterestEmail(req, res) {
    const { email, userName } = req.body;

    console.log("Email de destino:", email);
    console.log("Nome do usuário:", userName);

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Interesse no seu perfil - Vovoltar",
        text: `A empresa demonstrou interesse em seu perfil. Fique atento às próximas etapas.`,
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Erro ao enviar email:", error);
            return res.status(500).json({
                success: false,
                message: "Erro ao enviar email de interesse.",
                error: error.message,
            });
        }
        console.log("Email enviado com sucesso:", info);
        res.status(200).json({
            success: true,
            message: `Email enviado com sucesso para ${userName}.`,
        });
    });    
}

module.exports = {
    sendInterestEmail,
};

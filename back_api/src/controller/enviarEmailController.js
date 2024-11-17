const dotenv = require("dotenv").config();
const nodemailer = require("nodemailer");

// Configura o transporte do nodemailer com as credenciais fornecidas
const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL,  // Certifique-se de que EMAIL está configurado corretamente no .env
        pass: process.env.SENHA_EMAIL,  // Certifique-se de que SENHA_EMAIL está configurado corretamente no .env
    },
});

// Função para enviar o e-mail de interesse
function sendInterestEmail(req, res) {
    const { email, userName, nomeEmpresa } = req.body;

    const mailOptions = {
        from: process.env.EMAIL,
        to: email,
        subject: "Interesse no seu perfil - Vovoltar",
        text: `Olá, ${userName}!

            A empresa ${nomeEmpresa} demonstrou interesse em seu perfil. Fique atento às próximas etapas do processo seletivo.

            Atenciosamente,
            Equipe Vovoltar.`,
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
        res.status(200).json({
            success: true,
            message: `Email enviado com sucesso para ${userName}.`,
        });
    });
}


// Função para enviar o e-mail de candidatura para a vaga
function candidatarVaga(req, res) {
    const { emailEnvio, userName, foneUser, nomeVaga, nomeEmpresa, emailCandidato } = req.body;

    // Configura as opções do e-mail de candidatura
    const mailOptions = {
        from: process.env.EMAIL,
        to: emailEnvio,
        subject: `Novo Candidato para a Vaga - ${nomeVaga}`,
        text: `Olá, ${nomeEmpresa}!
            Temos boas notícias! Um candidato se inscreveu para a sua vaga de ${nomeVaga}.
            
            Informações do Candidato:
            Nome: ${userName}
            E-mail de Contato: ${emailCandidato}
            Telefone: ${foneUser}

            Para dar continuidade ao processo seletivo, entre em contato diretamente com o candidato através do e-mail informado.
            Caso precise de suporte ou de mais informações, estamos à disposição para ajudar.

            Agradecemos por utilizar nossa plataforma e desejamos sucesso no processo de recrutamento!

            Atenciosamente,
            Equipe Vovôltar.`,
    };

    // Envia o e-mail utilizando o transporter configurado
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error("Erro ao enviar email de candidatura:", error);
            return res.status(500).json({
                success: false,
                message: "Erro ao enviar email de candidatura.",
                error: error.message,
            });
        }
        res.status(200).json({
            success: true,
            message: `Email de candidatura enviado com sucesso para ${nomeEmpresa}.`,
        });
    });
}

module.exports = {
    sendInterestEmail,
    candidatarVaga
};
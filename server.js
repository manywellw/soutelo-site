require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const nodemailer = require('nodemailer'); // Importa o nodemailer para envio de e-mails
const app = express();
const PORT = process.env.PORT || 3000;



// Configura a pasta public para arquivos estáticos (CSS, JS, Imagens)
app.use(express.static(path.join(__dirname, 'public')));

// Middleware para processar dados de formulários (Fale Conosco)
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors()); // Adicione isso logo após app = express();

// Rota Principal (Página Inicial)
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

// ROTA: Política de Privacidade (Apontando para politica.html conforme seu VS Code)
app.get('/politica-de-privacidade', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'politica.html'));
});

// Rota para receber os dados do formulário de contato e enviar por e-mail
app.post('/api/contato', async (req, res) => {
    console.log('Dados recebidos do formulário:');
    const { nome, telefone, area, email, mensagem } = req.body;

    // CONFIGURAÇÃO DO REMETENTE (Utilizando variáveis de ambiente)
    const transporter = nodemailer.createTransport({
        service: 'gmail', 
        auth: {
            user: process.env.EMAIL_USER, // Pega o e-mail do arquivo .env
            pass: process.env.EMAIL_PASS  // Pega a Senha de App do arquivo .env
        }
    });

    // LAYOUT DO E-MAIL QUE O ESCRITÓRIO VAI RECEBER (Notificação de Novo Lead)
    const emailEscritorio = {
        from: `"Site Soutelo & Azevedo" <${process.env.EMAIL_USER}>`,
        to: process.env.EMAIL_USER, // Envia para o próprio e-mail do escritório
        subject: `Novo Contato Comercial - ${nome} (${area})`,
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #dcdcdc; padding: 20px; border-radius: 5px;">
                <h2 style="color: #b5996d; border-bottom: 2px solid #b5996d; padding-bottom: 10px; margin-top: 0;">Nova Prospecção de Lead</h2>
                <p><strong>Nome do Cliente:</strong> ${nome}</p>
                <p><strong>E-mail:</strong> ${email}</p>
                <p><strong>Telefone/WhatsApp:</strong> ${telefone}</p>
                <p><strong>Área Jurídica de Interesse:</strong> ${area}</p>
                <div style="background-color: #f9f9f9; padding: 15px; border-left: 4px solid #b5996d; margin-top: 20px;">
                    <p style="margin: 0;"><strong>Mensagem enviada:</strong></p>
                    <p style="margin: 5px 0 0 0; font-style: italic;">"${mensagem}"</p>
                </div>
            </div>
        `
    };

    // LAYOUT DO E-MAIL QUE O CLIENTE VAI RECEBER (Confirmação Automática)
    const emailCliente = {
        from: `"Soutelo & Azevedo Advocacia" <${process.env.EMAIL_USER}>`,
        to: email, // Envia direto para o e-mail que o cliente preencheu no formulário
        subject: 'Recebemos a sua mensagem | Soutelo & Azevedo Advocacia',
        html: `
            <div style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; border: 1px solid #dcdcdc; padding: 20px; border-radius: 5px;">
                <h2 style="color: #b5996d; text-align: center; margin-top: 0;">Olá, ${nome}.</h2>
                <p>Confirmamos o recebimento dos seus dados através do nosso portal institucional.</p>
                <p>Nossa equipe especializada na área de <strong>${area || 'Advocacia Geral'}</strong> já foi notificada e está analisando as informações preliminares da sua mensagem.</p>
                <p>Um de nossos advogados entrará em contato diretamente com você pelo telefone <strong>${telefone || 'informado'}</strong> ou por este e-mail para darmos andamento ao seu atendimento.</p>
                <hr style="border: 0; border-top: 1px solid #eeeeee; margin: 20px 0;">
                <p style="font-size: 12px; color: #777; text-align: center; margin-bottom: 0;">
                    <strong>Soutelo & Azevedo Advocacia</strong><br>
                    Este é um e-mail automático de confirmação de recebimento. Por favor, não responda a esta mensagem.
                </p>
            </div>
        `
    };

try {
        console.log('Iniciando envio...');
        
        // Testa a conexão antes de enviar
        await transporter.verify();
        console.log('Conexão com Gmail verificada!');

        // Dispara os e-mails para os dois destinos ao mesmo tempo
        await Promise.all([
            transporter.sendMail(emailEscritorio),
            transporter.sendMail(emailCliente)
        ]);

        console.log('E-mails enviados com sucesso!');
        return res.status(200).json({ success: true, message: 'Mensagem enviada com sucesso!' });

    } catch (error) {
        // LOG REAL DO ERRO NO TERMINAL
        console.error('ERRO DETALHADO NO NODEMAILER:', error);
        
        // ENVIA ERRO REAL PARA O NAVEGADOR
        return res.status(500).json({ 
            success: false, 
            message: error.message // Isso mostrará o erro técnico no console do navegador
        });
    }
});

    // Rota para receber os dados do formulário de contato e enviar por e-mail
    app.listen(PORT, () => {
        console.log(`Servidor rodando com sucesso na porta ${PORT}`);
    });

# Soutelo & Azevedo Advocacia - Site Institucional

Este é o repositório do site institucional da **Soutelo & Azevedo Advocacia**. O projeto foi desenvolvido para apresentar os serviços do escritório, fornecer informações de contato e capturar leads qualificados de forma segura através de um formulário integrado.

---

## 🚀 Funcionalidades

* **Página Inicial (Landing Page):** Apresentação institucional e áreas de atuação jurídica.
* **Formulário de Contato Inteligente:** Envio de e-mails automatizados utilizando `Nodemailer`.
  * **Notificação para o Escritório:** Envio imediato dos dados do lead (Nome, Telefone, Área de Interesse e Mensagem) para o e-mail de atendimento.
  * **Confirmação para o Cliente:** Envio de um e-mail de resposta automática confirmando o recebimento do contato.
* **Política de Privacidade:** Página dedicada em conformidade com as diretrizes legais vigentes.
* **Segurança de Credenciais:** Isolamento completo de chaves e senhas usando variáveis de ambiente (`dotenv`).

---

## 🛠️ Tecnologias Utilizadas

* **Backend:** Node.js, Express
* **Envio de E-mail:** Nodemailer
* **Frontend:** HTML5, CSS3, JavaScript (arquivos estáticos)
* **Gerenciamento de Ambiente:** Dotenv

---

## 📦 Como Instalar e Rodar o Projeto Localmente

Siga os passos abaixo para executar o projeto em sua máquina:

### 1. Clonar o repositório
```bash
git clone [https://github.com/seu-usuario/soutelo-site.git](https://github.com/seu-usuario/soutelo-site.git)
cd soutelo-site
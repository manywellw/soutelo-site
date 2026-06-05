// --- CARROSSEL DINÂMICO DE BACKGROUND ---
const backgrounds = document.querySelectorAll('.hero-bg');
let currentIndex = 0;
const changeInterval = 5000; // Tempo de troca das fotos em milisegundos (5 segundos)

function changeBackground() {
    // Remove a classe ativa da imagem atual
    backgrounds[currentIndex].classList.remove('active');
    
    // Passa para o próximo índice
    currentIndex = (currentIndex + 1) % backgrounds.length;
    
    // Adiciona a classe ativa na nova imagem
    backgrounds[currentIndex].classList.add('active');
}

// Inicia o loop automático do carrossel
setInterval(changeBackground, changeInterval);


// --- ENVIO DO FORMULÁRIO DE CONTATO (AJAX) ---
const form = document.getElementById('form-contato');
const responseDiv = document.getElementById('form-response');

form.addEventListener('submit', async (e) => {
    e.preventDefault(); // Impede o recarregamento automático da página
    
    // Captura os dados do formulário
    const formData = new FormData(form);
    const data = Object.fromEntries(formData);
    
    responseDiv.style.color = '#b5996d';
    responseDiv.innerText = 'Enviando sua mensagem...';
    
    try {
        // Envia os dados para a nossa API no backend (server.js)
        const response = await fetch('/api/contato', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        
        const result = await response.json();
        
        if (result.success) {
            responseDiv.style.color = 'green';
            responseDiv.innerText = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
            form.reset(); // Limpa os campos do formulário
        } else {
            responseDiv.style.color = 'red';
            responseDiv.innerText = 'Ocorreu um erro ao enviar. Tente novamente.';
        }
    } catch (error) {
        console.error('Erro na requisição:', error);
        responseDiv.style.color = 'red';
        responseDiv.innerText = 'Erro ao conectar com o servidor.';
    }
});

// --- MENU MOBILE SIMPLES ---
const menuToggle = document.getElementById('mobile-menu');
const navMenu = document.querySelector('.nav-menu');

menuToggle.addEventListener('click', () => {
    if (navMenu.style.display === 'block') {
        navMenu.style.display = 'none';
    } else {
        navMenu.style.display = 'block';
        navMenu.style.style.backgroundColor = '#fff';
    }
});

// Seleciona o campo de telefone pelo ID
const inputTelefone = document.getElementById('telefone');

if (inputTelefone) {
    inputTelefone.addEventListener('input', (e) => {
        let valor = e.target.value;
        
        // Remove qualquer caractere que não seja número
        valor = valor.replace(/\D/g, "");
        
        // Aplica a formatação dinamicamente conforme o usuário digita
        if (valor.length > 0) {
            valor = "(" + valor;
        }
        if (valor.length > 3) {
            // Adiciona o fecha parênteses e um espaço após o DDD
            valor = valor.slice(0, 3) + ") " + valor.slice(3);
        }
        if (valor.length > 10) {
            // Formato para celular: (XX) 99999-9999
            valor = valor.slice(0, 10) + "-" + valor.slice(10, 14);
        } else if (valor.length > 7) {
            // Formato temporário enquanto digita ou para telefone fixo: (XX) 9999-9999
            valor = valor.slice(0, 9) + "-" + valor.slice(9);
        }
        
        // Atualiza o valor do campo com a máscara aplicada
        e.target.value = valor;
    });
}


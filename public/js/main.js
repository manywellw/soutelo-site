// --- CARROSSEL DINÂMICO DE BACKGROUND ---
const backgrounds = document.querySelectorAll('.hero-bg');
let currentIndex = 0;
const changeInterval = 5000; 

function changeBackground() {
    if (backgrounds.length > 0) {
        backgrounds[currentIndex].classList.remove('active');
        currentIndex = (currentIndex + 1) % backgrounds.length;
        backgrounds[currentIndex].classList.add('active');
    }
}
if (backgrounds.length > 0) {
    setInterval(changeBackground, changeInterval);
}

// --- ENVIO DO FORMULÁRIO DE CONTATO (AJAX) ---
const form = document.getElementById('form-contato');
const responseDiv = document.getElementById('form-response');

if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault(); 
        
        const formData = new FormData(form);
        const data = Object.fromEntries(formData);
        
        responseDiv.style.color = '#b5996d';
        responseDiv.innerText = 'Enviando sua mensagem...';
        
        try {
            const response = await fetch('/api/contato', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error('Erro na resposta do servidor');
            }

            const result = await response.json();
            
            if (result.success) {
                responseDiv.style.color = 'green';
                responseDiv.innerText = 'Mensagem enviada com sucesso! Entraremos em contato em breve.';
                form.reset(); 
            } else {
                responseDiv.style.color = 'red';
                responseDiv.innerText = 'Ocorreu um erro ao enviar. Tente novamente.';
            }
        } catch (error) {
            console.error('Erro detalhado da requisição:', error);
            responseDiv.style.color = 'red';
            responseDiv.innerText = 'Erro ao conectar: ' + error.message; 
        }
    });
}

// --- MENU MOBILE ---
const menuToggle = document.getElementById('mobile-menu'); // Certifique-se que o ID no HTML é este
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
    menuToggle.addEventListener('click', () => {
        // Alterna a classe 'active'. No CSS, você deve definir 
        // que .nav-menu.active { display: block !important; }
        navMenu.classList.toggle('active');
    });
}

// --- MÁSCARA DE TELEFONE ---
const inputTelefone = document.getElementById('telefone');

if (inputTelefone) {
    inputTelefone.addEventListener('input', (e) => {
        let valor = e.target.value.replace(/\D/g, "");
        if (valor.length > 0) valor = "(" + valor;
        if (valor.length > 3) valor = valor.slice(0, 3) + ") " + valor.slice(3);
        if (valor.length > 10) {
            valor = valor.slice(0, 10) + "-" + valor.slice(10, 14);
        } else if (valor.length > 7) {
            valor = valor.slice(0, 9) + "-" + valor.slice(9);
        }
        e.target.value = valor;
    });
}
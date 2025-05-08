// Função para mostrar o popup de login
function showLogin() {
    document.getElementById("login-popup").style.display = "flex";
}

// Função para fechar o popup de login
function closeLogin() {
    document.getElementById("login-popup").style.display = "none";
}

// Função de login (simula login bem-sucedido)
function login() {
    const username = document.getElementById("username").value;
    if (username) {
        alert("Login bem-sucedido! Bem-vindo, " + username + "!");
        document.getElementById("username").value = '';  // Limpa os campos
        closeLogin();  // Fecha o popup
    } else {
        alert("Por favor, insira um nome de usuário.");
    }
}

// Função para redirecionar para o jogo (index.html)
function goToGame() {
    window.location.href = "index.html"; // Redireciona para a página index.html
}

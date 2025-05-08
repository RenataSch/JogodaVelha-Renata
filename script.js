// Seleciona todas as células do tabuleiro usando o atributo personalizado data-cell
const cells = document.querySelectorAll("[data-cell]");

// Obtém os elementos do pop-up de resultado
const resultPopup = document.getElementById("resultPopup");
const resultMessage = document.getElementById("resultMessage");
const closePopup = document.getElementById("closePopup");

// Define o jogador inicial como "X"
let currentPlayer = "X";

// Estado do tabuleiro, representado como um array de strings vazias
let boardState = ["", "", "", "", "", "", "", "", ""];

// Variável para controlar se o jogo terminou
let isGameOver = false;

// Adiciona um evento de clique para cada célula do tabuleiro
cells.forEach((cell, index) => {
    cell.addEventListener("click", () => {
        // Impede jogadas em células já preenchidas ou se o jogo já terminou
        if (isGameOver || cell.textContent !== "") return;

        // Define o símbolo do jogador atual na célula clicada
        cell.textContent = currentPlayer;
        // Atualiza o estado do tabuleiro
        boardState[index] = currentPlayer;

        // Verifica se o jogador atual venceu
        if (checkWinner(currentPlayer)) {
            isGameOver = true;
            showResult(`Jogador ${currentPlayer} venceu!`);
        } 
        // Verifica se todas as células foram preenchidas (empate)
        else if (boardState.every(cell => cell !== "")) {
            isGameOver = true;
            alert("Ninguém venceu, deu velha!"); // Mensagem de empate
        } 
        // Alterna entre os jogadores "X" e "O"
        else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
        }
    });
});

// Evento para fechar o pop-up e reiniciar o jogo
closePopup.addEventListener("click", () => {
    resultPopup.classList.add("hidden");
    resetGame();
});

// Função que verifica se um jogador venceu
function checkWinner(player) {
    // Padrões de vitória (linhas, colunas e diagonais)
    const winPatterns = [
        [0, 1, 2], // Linha superior
        [3, 4, 5], // Linha do meio
        [6, 7, 8], // Linha inferior
        [0, 3, 6], // Coluna esquerda
        [1, 4, 7], // Coluna do meio
        [2, 5, 8], // Coluna direita
        [0, 4, 8], // Diagonal principal
        [2, 4, 6]  // Diagonal secundária
    ];

    // Retorna true se algum dos padrões de vitória for atendido pelo jogador
    return winPatterns.some(pattern =>
        pattern.every(index => boardState[index] === player)
    );
}

// Exibe o resultado no pop-up
function showResult(message) {
    resultMessage.textContent = message; // Define a mensagem do pop-up
    resultPopup.classList.remove("hidden"); // Exibe o pop-up
}

// Reinicia o jogo para um novo início
function resetGame() {
    // Reseta o estado do tabuleiro
    boardState = ["", "", "", "", "", "", "", "", ""];
    // Limpa as células
    cells.forEach(cell => (cell.textContent = ""));
    // Reseta as variáveis do jogo
    isGameOver = false;
    currentPlayer = "X";
}

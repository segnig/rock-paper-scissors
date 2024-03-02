function pickComputerMove() {
    var moves = ["Rock", "Paper", "Scissors"];
    var randomIndex = Math.floor(Math.random() * moves.length);
    return moves[randomIndex];
}
let score = JSON.parse(localStorage.getItem("score")) || {
    wins: 0,
    loses: 0,
    ties: 0
}

updateScoreElements();

document.body.addEventListener('keydown', (event) => {
    if (event.key === 'r'){
        playGame('Rock');
    } else if (event.key === 'p') {
        playGame('Paper');
    } else if (event.key ==='s') {
        playGame('Scissors');
    }
}
)
function playGame(playerMove) {
    var computerMove = pickComputerMove();
    var result = "";

    if (playerMove === computerMove) {
        result = "Tie";
    } else if (
        (playerMove === "Rock" && computerMove === "Scissors") ||
        (playerMove === "Paper" && computerMove === "Rock") ||
        (playerMove === "Scissors" && computerMove === "Paper")
    ) {
        result = "You win";
    } else {
        result = "You lose";
    }
    if (result === "You win") {
        score.wins++;
    } else if (result === "You lose") {
        score.loses++;
    } else{
        score.ties++;
    }
    localStorage.setItem("score", JSON.stringify(score));

    updateScoreElements();

    document.querySelector(".js-move").innerHTML = `
    You <img src="images/${playerMove}-emoji.png" class="move-icon"> Computer<img src="images/${computerMove}-emoji.png" class="move-icon">
    `;
    document.querySelector(".js-result").textContent = result;
 
}

function resetScore() {
    score.loses = 0;
    score.ties = 0;
    score.wins = 0;
    localStorage.removeItem("score");
    updateScoreElements();
}


function updateScoreElements() {
    document.querySelector('.js-score').innerHTML =`Wins: ${score.wins} Losses: ${score.loses} Ties: ${score.ties}`
}


let isAutoPlaying = false;
let intervalId;

function autoPlay(){
    if (!isAutoPlaying) {
        intervalId = setInterval( () =>{
            const playerMove = pickComputerMove();
            playGame(playerMove);
    
        }, 1000);
        isAutoPlaying = true;
    } else{
        clearInterval(intervalId);
        isAutoPlaying = false;
    }
    
}
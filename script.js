let dino = document.querySelector('.dino');
let gameOver = document.querySelector('.gameOver');
let obstacle = document.querySelector('.obstacle');
let score = 0;
let cross = true;
let over = false;

let audiomu = new Audio('music.mp3');
let audioGo = new Audio('gameover.mp3');
let start = document.querySelector('.start');
start.addEventListener('click', ()=>{
over = false;
score = 0;
updateScore(score);
obstacle.classList.add('obstacleAni');
start.style.visibility = 'hidden';
gameOver.innerHTML = "Welcome to iDragon - Created by Mahi";
setTimeout(() => {
    audiomu.play();
}, 1000);
document.onkeydown = function (e) {
    if (e.keyCode == 38) {
        dino.classList.add('animateDino');
        setTimeout(() => {
            dino.classList.remove('animateDino');
        }, 700)
    }
    else if (e.keyCode == 39) {
        let dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX + 112) + "px";
    }
    else if (e.keyCode == 37) {
        dinoX = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
        dino.style.left = (dinoX - 112) + "px";
    }
}
setInterval(() => {
    let dx = parseInt(window.getComputedStyle(dino, null).getPropertyValue('left'));
    let dy = parseInt(window.getComputedStyle(dino, null).getPropertyValue('bottom'));

    let ox = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('left'));
    let oy = parseInt(window.getComputedStyle(obstacle, null).getPropertyValue('bottom'));


    let offsetX = Math.abs(dx - ox);
    let offsetY = Math.abs(dy - oy);

    if (offsetX < 145 && cross) {
        if(!over){
        score += 1;
        }
        updateScore(score);
        cross = false;
        setTimeout(() => {
            cross = true;
        }, 500);
        setTimeout(() => {
            let aniDur = parseFloat(window.getComputedStyle(obstacle, null).getPropertyValue('animation-duration'));
            if(aniDur < 3){}
            else{
            let newDur = aniDur - 0.1;
            obstacle.style.animationDuration = newDur + 's';
            }
            
        }, 500);
    }
    else if (offsetX < 73 && offsetY < 52) {
        gameOver.innerHTML = 'Game Over';
        obstacle.classList.remove('obstacleAni');
        start.style.visibility = 'visible';
        over = true;
        setTimeout(() => {
            audioGo.play();
        }, 1);
        setTimeout(() => {
            audioGo.pause();
            audiomu.pause();
        }, 1000);
    }
    
}, 10);
})
function updateScore(score) {
    scoreCont.innerHTML = "Your Score: " + score;
}
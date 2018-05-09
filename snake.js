var xPos = 0;
var yPos = 0;
var xVel = 0;
var yVel = 0;
var randomX = 250;
var randomY = 200;
var previousKeyCode = 0;
var trail=[];
var gs = 20;
var tail = 0;
var score = 0;
var leaderBoard = [0,0,0,0,0];
var max = 0;
var gameType = false; //false - game with edges
var egdes = document.getElementById('game-with-edges');
var withoutEdges = document.getElementById('game-without-edges');

window.onload=function() {
    canvas=document.getElementById("cs");
    context=canvas.getContext("2d");
    document.addEventListener("keydown", keyPush);
    setInterval(game,1000/15);
}
    
egdes.addEventListener("click", function() {
        gameType = false;
        document.getElementById('actual').innerHTML = 'Actual game type: Egdes';
        canvas.style.border = "2px solid red";
    
        gameOver();
    });
    
    withoutEdges.addEventListener("click", function() {
        gameType = true;
        document.getElementById('actual').innerHTML = 'Actual game type: Without  egdes';
        canvas.style.border = "none";
        gameOver();
    });

function game() {
    context.clearRect(0,0, canvas.width, canvas.height);
    
    xPos += xVel;
    yPos += yVel;
    
    if(!gameType){
        if(xPos > 200 || xPos < -200 || yPos > 200 || yPos < -200) {
            gameOver();
        }
    }
    else {
        if(xPos > 200) xPos = -200;
        if(xPos < -200) xPos = 200;
        if(yPos > 200) yPos = -200;
        if(yPos < -200) yPos = 200;
    }
    

    context.fillStyle = "rgba(20,200,10,0.9)";
    context.fillRect(canvas.width/2 + xPos, canvas.height/2 + yPos, 10,10);
    
    //draw the tail
    context.fillStyle = "rgba(20,200,10,0.5)";
    for(var i = 0; i < trail.length; i++) {
        context.fillRect(trail[i][0],trail[i][1],9,9);
    }
    
    trail.push([xPos+200.5, yPos+200.5]);
    
    while(trail.length>tail) {
        trail.shift();
    }
        
    context.fillStyle = "red";
    if((xPos+200) == randomX && (yPos+200) == randomY){
        randomX = Math.floor(Math.random() * (canvas.width/10))*10;
        randomY = Math.floor(Math.random() * (canvas.width/10))*10;
        tail++;
        score++;
        console.log(trail);
    }
    context.fillRect(randomX, randomY, 10,10);
    
    document.getElementById('score').innerHTML = score;
}
function showScore() {
    var html = "";
    html += '<h1>Poprzednie wyniki:</h1>';
    html += '<ul>';
    html += '<li><span>' + leaderBoard[0] + ' pkt</span></li>';
    html += '<li><span>' + leaderBoard[1] + ' pkt</span></li>';
    html += '<li><span>' + leaderBoard[2] + ' pkt</span></li>';
    html += '<li><span>' + leaderBoard[3] + ' pkt</span></li>';
    html += '<li><span>' + leaderBoard[4] + ' pkt</span></li>';
    html += '</ul>';
    document.getElementById('scoreTable').innerHTML = html;
}
function maxScore() {
    for(var i = 0; i < leaderBoard.length; i++) {
        if(leaderBoard[i] > max) {
            max = leaderBoard[i];
        }
    }
    
    console.log("hlao");
    return max; 
}

function gameOver() {
    trail.length = 0;
    xPos = 0;
    yPos = 0;
    xVel = 0;
    yVel = 0;
    previousKeyCode = 0;
    
    leaderBoard[4] = leaderBoard[3];
    leaderBoard[3] = leaderBoard[2];
    leaderBoard[2] = leaderBoard[1];
    leaderBoard[1] = leaderBoard[0];
    leaderBoard[0] = score;
    showScore();
    document.getElementById('best-score').innerHTML = maxScore() + ' pkt';
    score = 0;
    tail = 0;
}
function keyPush(keyPressed) {
    var keyCode = keyPressed.keyCode;
    //console.log(keyCode, "xPos: ", xPos, "yPos: ", yPos);
    if(keyCode == 38 && previousKeyCode != 40) {
        previousKeyCode = keyCode;
        yVel = -10;
        xVel = 0;
    }
    else if(keyCode == 39 && previousKeyCode != 37) {
        previousKeyCode = keyCode;
        xVel = 10;
        yVel = 0;
    }
    else if(keyCode == 40 && previousKeyCode != 38) {
        previousKeyCode = keyCode;
        yVel = 10;
        xVel = 0;
    }
    else if(keyCode == 37 && previousKeyCode != 39) {
        previousKeyCode = keyCode;
        xVel = -10;
        yVel = 0;
    }
}
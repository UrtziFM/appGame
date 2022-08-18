//Select canvas from html
const cvs = document.getElementById("Arcanoid");
//Using 2d tool for graphics from canvas
const ctx = cvs.getContext("2d");


// Create the  ball
const ball = {
    x: cvs.width/2,
    y: cvs.height/2,
    radius: 6,
    speed: 5,
    velocityX: 5,
    velocityY: 5,
    color: "WHITE"
}

// Create the user padle
const user = {
    x: (cvs.width - 60)/2, //in the middle of the screen
    y: cvs.height - 30, // on the bottom of the screen
    width: 60,
    height: 10,
    color: "WHITE",
    score: 0
}

// Create the bricks
var brickRowCount = 4;
var brickColumnCount = 10;
var brickWidth = 50;
var brickHeight = 20;
var brickPadding = 5;
var brickOffsetTop = 15;
var brickOffsetLeft = 25;
// The matrix for bricks
var bricks = [];
for(c=0; c<brickColumnCount; c++) {
    bricks[c] = [];
    for(r=0; r<brickRowCount; r++) {
        bricks[c][r] = { x: 0, y: 0, status: 1 };
    }
}
// The Score
var score = 0;
function drawScore() {
    ctx.font = "16px Arial";
    ctx.fillStyle = "WHITE";
    ctx.fillText("Score: "+score, 2, 395);
}

// Draw circle function to draw ball

function drawCircle(x,y,r,color) {
    ctx.fillStyle = color;
    ctx.beginPath();
    ctx.arc(x,y,r,0,Math.PI*2,true);
    ctx.closePath();
    ctx.fill();
}

// Draw rect to fill canvas 

function drawRect(x,y,w,h,color) {
    ctx.fillStyle = color;
    ctx.fillRect(x,y,w,h);
}

// Draw text function

function drawText(text,x,y,color) {
    ctx.fillStyle = color;
    ctx.font = "75px fantasy";
    ctx.fillText(text,x,y);
}

// control the user paddles
function movePaddle(evt) {
    let rect = cvs.getBoundingClientRect();

    user.x = evt.clientX - rect.top - user.width/2;
}
cvs.addEventListener("mousemove", movePaddle);

// Draw the bricks (C: Col R: Row )
function drawBricks() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            if(bricks[c][r].status == 1) {
                var brickX = (c*(brickWidth+brickPadding))+brickOffsetLeft;
                var brickY = (r*(brickHeight+brickPadding))+brickOffsetTop;
                bricks[c][r].x = brickX;
                bricks[c][r].y = brickY;
                ctx.beginPath();
                ctx.rect(brickX, brickY, brickWidth, brickHeight);
                ctx.fillStyle = "WHITE";
                ctx.fill();
                ctx.closePath();
            }
        }
    }
}

// colission with paddle detection
function collision(ball, user) {
                
    ball.top = ball.y - ball.radius;
    ball.bottom = ball.y + ball.radius;
    ball.right = ball.x + ball.radius;
    ball.left = ball.x - ball.radius;

    user.top = user.y;
    user.bottom = user.y + user.height;
    user.left = user.x;
    user.right = user.x + user.width;
            

    return ball.right > user.left && ball.bottom > user.top && ball.left < user.right;
} 

// colission with brick detection
function collisionDetection() {
    for(c=0; c<brickColumnCount; c++) {
        for(r=0; r<brickRowCount; r++) {
            var b = bricks[c][r];
            if(b.status == 1){
                if(ball.x > b.x && ball.x < b.x+brickWidth && ball.y > b.y && ball.y < b.y+brickHeight) {
                    ball.velocityY = -ball.velocityY;
                    b.status = 0;
                    score++;
                    if(score == brickRowCount*brickColumnCount) {
                        // draw Win when all the bricks are down
                        ball.x = -10;
                        ball.y = -10;
                        ball.speed = 0;
                        alert("You Win, Congrats!");
                        // Start Button click
                        const reload = document.getElementById('reload');
                        reload.addEventListener('click', _ => { 
                        location.reload();
                        });
                    }        
                }
            }
        }
    }
}

// Render the game function

function render() {
    // render the canvas
    drawRect(0, 0, cvs.width, cvs.height, "BLACK");
    // draw the bricks
    drawBricks();
    // render the ball
    drawCircle(ball.x, ball.y, ball.radius, ball.color);
    // draw user's paddle
    drawRect(user.x, user.y, user.width, user.height, user.color);
    // draw score 
    drawScore();
    // collision with bricks
    collisionDetection();
}

// update: position, move, ...
function update() {

    // the ball velocity
    ball.x += ball.velocityX;
    ball.y += ball.velocityY;

    // collision with canvas walls

    if(ball.y - ball.radius < 0){ // downside of canvas doesn't have collision wall
        ball.velocityY = -ball.velocityY;
    } else if(ball.y + ball.radius > cvs.height){
        // draw Game Over when the ball hit dowside
        drawText("Game Over",cvs.width/5,cvs.height/2, "WHITE");
        ball.speed = 0;
        // Start Button click
        const reload = document.getElementById('reload');
        reload.addEventListener('click', _ => { 
        location.reload();
});
    }
    if(ball.x + ball.radius > cvs.width || ball.x - ball.radius < 0){
        ball.velocityX = -ball.velocityX;
    }


    if(collision(ball, user)){
        // where the ball hit the player
        let collidePoint = ball.x - (user.x + user.width/2);
        // normalization 
        collidePoint = collidePoint/(user.width/2);
        // calculate angle in Radians 
        let angleRad = collidePoint * (Math.PI/4);
        // Y direction of the ball its hit 
        let direction = (ball.y + ball.radius < cvs.height/2) ? 1 : -1;

        //change velocity X and Y 
        ball.velocityX = direction * ball.speed * Math.sin(angleRad);
        ball.velocityY = direction * ball.speed * Math.cos(angleRad);
        // every time the ball hit the paddle increase its speed
        ball.speed += 0.1;
    }

}
// Game init function
function game() {
    render();
    update();
}

// Number of frames per second
let framePerSecond = 50;

// call the funcyion 50 times every 1 sec
let loop = setInterval(game, 1000/framePerSecond);
var floor, floorImage;
var mouse, mouseImage;
var cheese, cheese1Image, cheese2Image, cheeseGroup;
var obstacle, trapImage, catImage, obstacleGroup;
var score = 150;
var gamestate = 1;

function preload(){
    floorImage = loadImage("floor.jpeg");
    mouseImage = loadImage("mouse.png")
    cheese1Image = loadImage("cheese1.png");
    cheese2Image = loadImage("cheese2.png");
    trapImage = loadImage("trap.png");
    catImage = loadImage("cat.png");
}

function setup(){
    createCanvas(600,500);
    
    floor = createSprite(200,180,400,20);
    floor.addImage("floor",floorImage);
    floor.scale = 3

    mouse = createSprite(50,150,20,50);
    mouse.addImage("mouse",mouseImage);
    mouse.scale = 0.4

    cheeseGroup = new Group();
    obstacleGroup = new Group();
}

function draw(){
    background("black");
    textColor = ("white")
    textSize(25)
    text("Score: " + score,15,475)

    if(gamestate === 1){
        spawnCheese();
        spawnObstacles();
        floor.velocityX = -(4 + 3*score/100);

        if(keyDown("UP_ARROW")){
            mouse.y = mouse.y - 5;
        }
        if(keyDown("DOWN_ARROW")){
            mouse.y = mouse.y + 5
        }

        if(floor.x < 150){
            floor.x = floor.width/2
        }
        if(mouse.y >= 400){
            mouse.y = 365
        }
    
        if(mouse.y <= 0){
            mouse.y = 35
        }

        mouse.isTouching(obstacleGroup,destroyObstacle);
        mouse.isTouching(cheeseGroup,destroyCheese);

        if(score <= 0){
            over();
            gamestate = 2;
        }
    }

    if(gamestate === 2){
        text("Game Over, Press Space to Restart",125,475);
        if(keyDown("space")){
            gamestate = 1;
            score = 150;
        }
    }

    drawSprites();
}

function spawnCheese(){
    if (frameCount % 200 === 0){
        cheese = createSprite(600,(Math.round(random(50,350))),10,40);
        cheese.velocityX = -6;

        var rand = Math.round(random(1,2))
        switch(rand){
            case 1: cheese.addImage("cheese1",cheese1Image);
            break;
            case 2: cheese.addImage("cheese2",cheese2Image);
            break;
            default: break;
        }
        cheese.lifetime = 1000;
        cheeseGroup.add(cheese);
    }
}

function spawnObstacles(){
    if(frameCount % 200 === 100){
        obstacle = createSprite(600,(Math.round(random(50,350))),10,40);
        obstacle.velocityX = -6;

        var rand = Math.round(random(1,2));
        switch(rand){
            case 1: obstacle.addImage("trap",trapImage);
            break;
            case 2: obstacle.addImage("cat",catImage);
            break;
            default: break;
        }
        obstacle.lifetime = 1000;
        obstacleGroup.add(obstacle);
    }
}

function destroyCheese(){
    cheese.destroy();
    score = score + 50;
}

function destroyObstacle(){
    obstacle.destroy();
    score = score - 50;
}

function over(){
    floor.velocityX = 0;
    cheeseGroup.destroyEach();
    obstacleGroup.destroyEach();
}
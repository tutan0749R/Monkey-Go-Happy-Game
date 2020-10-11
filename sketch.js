var PLAY = 1;
var END = 0;
var gameState = 1;
var monkey , monkey_running
var banana ,bananaImage, obstacle, obstacleImage
var FoodGroup, obstacleGroup
var score;
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,470);
  
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving", monkey_running);
  monkey.scale = 0.1;
  
  ground = createSprite(400,350,900,10);
  ground.velocityX = -4;
  ground.x = ground.width/2;
  console.log(ground.x);
  
  
  
   invisibleGround = createSprite(600,350,400,10);
  invisibleGround.visible = false;
  
  foodGroup = createGroup();
  obstacleGroup = createGroup();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  monkey.debug = true
  
  score = 0;
}


function draw() {
background("white");
  text("Score: "+ score, 500,50);
  
  if (gameState === PLAY){
    
     ground.velocityX = -(4 + 3* score/4);
    
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
    if(keyDown("space") && monkey.y >= 300){ 
      monkey.velocityY = -12;
    }
    
    monkey.velocityY = monkey.velocityY + 0.5;
    
    if (foodGroup.isTouching(monkey)){
      foodGroup.destroyEach();
      score = score+2;
    }
    banana();
    obstacle();
    if (obstacleGroup.isTouching(monkey)){
      gameState = END;
    }
 }
  else if (gameState === END){
    ground.velocityX = 0;
    monkey.velocityX = 0;
    foodGroup.setVelocityX = 0;
    foodGroup.setvVisibility = false;
    obstacleGroup.setVisibility = false;
    obstacleGroup.setVelocityX = 0;
    monkey.visible = false;
    text("GAME OVER! ", 200,200,);
    text("Press R to restart",200,225);
    score = 0;
    score.visible = false;
  }
  if (keyDown("R")){
  gameState = PLAY;
  monkey.visible = true;
  }
  
  monkey.collide(ground);
  drawSprites();
}
function banana(){
    if (frameCount % 80 === 0) {
  var banana = createSprite(600,200,20,20);
  banana.addImage(bananaImage);
  banana.scale = 0.06;
  banana.y = Math.round(random(180,250));
  banana.velocityX = -(4 + 3* score/4);
  banana.lifetime = 148;
  foodGroup.add(banana);
    } 
}
function obstacle(){
  if (frameCount % 80 === 0){
   var obstacle = createSprite(600,315,20,20);
   obstacle.velocityX = -(8 + score/2);
   obstacle.addImage(obstacleImage);
   obstacle.scale = 0.2;
   obstacle.setLifetime = 148;
   obstacleGroup.add(obstacle);
  }
}




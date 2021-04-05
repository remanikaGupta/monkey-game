
var monkey , monkey_running,monkeyAnimation;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var score=0,ground;

var PLAY = 1;
var END = 0;
var gameState = PLAY;


function preload(){
  
  
  monkey_running =    loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkeyAnimation = loadAnimation("sprite_3.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(500,400)
 monkey=createSprite(100,350,20,20)
  monkey.addAnimation("running",monkey_running);
  monkey.scale=0.11
  
  // banana=createSprite(220,200,30,30)
 //banana.addImage("banana_image",bananaImage);
 //banana.scale=0.1
  
 //  obstacle=createSprite(220,360,30,30)
//obstacle.addImage("obstacle_image",obstacleImage);
//obstacle.scale=0.13
  
 ground=createSprite(250,390,1100,16)
 ground.velocityX=-8;
  
  obstacleGroup = createGroup();
  foodGroup = createGroup();
}


function draw() {
background("lightblue")
  text("Score: "+ score, 300,50);
  
 if(gameState===PLAY){
   
  if(foodGroup.isTouching(monkey)){
    score=score+2; 
  }
   
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  
  if(keyDown("space")&& monkey.y >= 300) {
        monkey.velocityY = -14 ;
}
  
monkey.velocityY = monkey.velocityY + 0.8
 
  
  spawnObstacle();
  spawnFood();
  
  if(obstacleGroup.isTouching(monkey)){
        gameState = END;
    }
 }

  
  if(gameState===END){
   
    ground.velocityX = 0;
     
    foodGroup.destroyEach();
   obstacleGroup.destroyEach();
    
    monkey.changeAnimation("monkeyanimation",monkeyAnimation)
    
  }
   monkey.collide(ground)
   drawSprites();
}

function spawnObstacle() {
  
  if (frameCount % 60 === 0) {
       obstacle = createSprite(500,360,30,30);
       obstacle.addImage(obstacleImage)
      obstacle.scale=0.13
      obstacle.velocityX=-7
      obstacle.lifetime = 300;
        obstacleGroup.add(obstacle);
    }
  
}

function spawnFood() {
 
  if (frameCount % 90 === 0) {
    banana = createSprite(600,120,40,10);
    banana.y = Math.round(random(300,200));
    banana.addImage( bananaImage);
    banana.scale = 0.1
    banana.velocityX = -4; 
    banana.lifetime = 300;
     foodGroup.add(banana);
}
  }
  

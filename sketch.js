//Declaring variable
var PLAY=1;
var END=0;
var monkey, monkeyRunning;
var banana, bananaImage, obstacle, obstacleImage;
var bananaGroup, rockGroup;
var ground;
var GameState;
var survivalTime=0;

var bananaScore

function preload() {
  //Loading animation and images
  monkeyRunning = loadAnimation("sprite_0.png", "sprite_1.png", "sprite_2.png", "sprite_3.png", "sprite_4.png", "sprite_5.png", "sprite_6.png", "sprite_7.png", "sprite_8.png");

  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 monkeyCollide = loadAnimation("sprite_1.png");
}

function setup() {
  createCanvas(500, 500);

  PLAY = 1;
  END = 0;
  GameState = PLAY;
  //Creating groups
  bananaGroup = new Group();
  rockGroup = new Group();
  //Creating sprites
  monkey = createSprite(70, 370, 50, 50);
  monkey.addAnimation("Monkey", monkeyRunning);
  monkey.scale = 0.1;
 monkey.addAnimation("collide", monkeyCollide);
  ground = createSprite(250, 405, 1000, 10);
  ground.x = ground.width / 2;
  
 survivalTime=0;
}
function draw(){
  background("white")
  
  if(ground.x<0){
ground.x=ground.width/2;
  }
  if(GameState===PLAY){
    obstacle();
    banana();
   
  survivalTime=Math.ceil(frameCount/frameRate());
 
     if(keyDown("space")){
    monkey.velocityY=-12;
  
    
  }
    if(monkey.isTouching(bananaGroup)){
      bananaGroup.destroyEach();
        
    }
    monkey.velocityY=monkey.velocityY+0.8
    if(monkey.isTouching(rockGroup)){
      GameState=END;
      
      
    }
  }
 if(GameState===END){
     ground.velocityX = 0;
    
    monkey.velocityX=0;
    monkey.scale = 0.1;
    monkey.changeAnimation("collide", monkeyCollide);
    
    rockGroup.setVelocityXEach(0);
    bananaGroup.setVelocityXEach(0);
    rockGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
    
 }
     stroke("white")
  textSize(20);
  fill("white")
  
  stroke("Black")
  textSize(20)
  fill("black")
   text("survival time:"+survivalTime,100,50)
  monkey.collide(ground)

  drawSprites();
   
  
}
function banana(){
  if(frameCount%120===0){
  var banana=createSprite(400);
    banana.y=Math.round(random(150,152))
    banana.scale=0.1
  banana.addImage(bananaImage);
    banana.velocityX=-5
    banana.lifetime=80
  bananaGroup.add(banana)
    
  }
}
function obstacle(){
  if(frameCount%150===0){
  var obstacle=createSprite(500,363)
  
 
  obstacle.velocityX=-5;
  obstacle.addImage(obstacleImage)
   obstacle.scale=0.2;
  obstacle.lifetime=90;
    rockGroup.add(obstacle)
  }
}
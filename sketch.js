PLAY=1;
END=0;
gameState=PLAY;
var monkey , monkey_running;
var  banana ,bananaImage,bananasGroup, obstacle, obstacleImage,backgroundImage;
var FoodGroup, obstacleGroup
var bananacollected=0

function preload(){
sound=loadSound("funny_game.mp3");
  backgroundImage=loadImage("Marcus_village.png");
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
monkey_collided=loadAnimation("sprite_0.png");  
  bananaImage = loadImage("banana.png");
  obstaceImage = loadImage("obstacle.png");
  
 
}



function setup() {
  createCanvas(600,600);
sound.play();
 background1=createSprite(300,300,60,60);
background1.scale=2.2
background1.addImage("back",backgroundImage);
  //monkey
  monkey=createSprite(180,560);
 monkey.addAnimation("Running",monkey_running);
  monkey.addAnimation("collided",monkey_collided);   
 monkey. scale=0.2
  monkey.debug=false
monkey.setCollider("circle",0,0,250);
  //ground
  ground=createSprite(300,570,600,10);
  ground.visible=false
      bananasGroup=new Group();
   obstaclesGroup=new Group();
}


function draw() {
//background


  


    if(keyDown("space")&& monkey.y >= 370) {
        monkey.velocityY = -12;
    
    }
  //monkey gravity
  monkey.velocityY = monkey.velocityY + 0.8
  if( obstaclesGroup.isTouching(monkey)){

    //game over display
     stroke(180,mouseX+30,mouseY);
  textSize(20);
  fill(mouseX+30,180,mouseY);
    strokeWeight(5);
    text("GAME OVER",200,300);
    //banana and rock life time after touching rock
       obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
  //  banana and rock velocity after touching rock
    obstaclesGroup.setVelocityXEach(0);
     bananasGroup.setVelocityXEach(0); 
    //monkey's animation after touching rock
  monkey.changeAnimation("collided",monkey_collided);   
    monkey.velocityY = 0;

    
     }
  
if(bananasGroup.isTouching(monkey)){
   bananacollected =bananacollected + 1;
   bananasGroup.destroyEach();
   }
    monkey.collide(ground); 

  
 drawSprites(); 
   
       stroke("red");
  textSize(20);
  fill("yellow");
      text("BANANAS COLLECTED: "+bananacollected, 330,50);
  
    if( obstaclesGroup.isTouching(monkey)){
    //game over display
     stroke(80,mouseX,mouseY,300);
  textSize(50);
  fill(mouseX,mouseY,80,300);

    text("GAME OVER",155,300);
    //banana and rock life time after touching rock
       obstaclesGroup.setLifetimeEach(-1);
    bananasGroup.setLifetimeEach(-1);
  //  banana and rock velocity after touching rock
    obstaclesGroup.setVelocityXEach(0);
     bananasGroup.setVelocityXEach(0); 
    //monkey's animation after touching rock
  monkey.changeAnimation("collided",monkey_collided);

     }
  spawnFood();
spawnObstacles();

  //monkey jump

  
}
function spawnFood() {
  //write code here to spawn the food
  if (frameCount % 120 === 0) {
    var banana = createSprite(700,250,40,10);
    banana.y = random(370,400);    
    banana.addImage(bananaImage);
    banana.scale = 0.15;
       banana.velocityX = -(10 + bananacollected/1);
     //assign lifetime to the variable
    banana.lifetime = 300;
    monkey.depth = banana.depth + 1;
    
    //add each banana to the group
    bananasGroup.add(banana);
  }
}

function spawnObstacles() {
  if(frameCount % 200 === 0) {
    var obstacle = createSprite(700,540,10,40);
     obstacle.velocityX = -(10 + bananacollected/1);
    obstacle.addImage(obstaceImage );
   
    //assign scale and lifetime to the obstacle     
    obstacle.scale = 0.19;
    obstacle.lifetime = 300;
    
    
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);
  
  }
}

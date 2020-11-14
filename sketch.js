var player, bone,obstacles,playerimg,obstaclesimg,boneimg,backgroundimg
var score=0
var gamestates=1;
 var Play=1,End=0;
var restart,bg;
var restartimg;
var showtext=false
showtext2=false


function preload(){
playerimg=loadImage("images/player.png")
boneimg=loadImage("images/bone.png")
backgroundimg=loadImage("images/background.jpg")
obstaclesimg=loadImage("images/obstacle.png")	
restartimg=loadImage("images/restartimg.png")
}

function setup() {
	createCanvas(600, 200);
	restart=createSprite(300,100,20,20);
	restart.scale=0.5
	restart.visible=false;
	restart.addImage("img1",restartimg);
	
	player = createSprite(50,180,20,50);
	player.addAnimation("img2", playerimg);
	player.scale = 0.5;
	
	ground = createSprite(200,180,400,20);
	ground.x = ground.width /2;
	ground.visible = false;
	
	foodGroup = new Group();
	obstaclesGroup = new Group();
	
	

	
  
}


function draw() {
	if(backgroundimg)
        background(backgroundimg);
  if (gamestates===Play) {
	 
	 if(keyDown("space")) {
	 player.velocityY = -10;
   }
	 player.velocityY = player.velocityY + 0.8
	 
	  
   if (ground.x < 0){
	 ground.x = ground.width/2;
   }
	 ground.velocityX = -4;
   spawnBone();
   spawnObstacles();
   if (player.isTouching(foodGroup)) {
score=score+10
foodGroup.destroyEach()
   }
	 
	 if(player.isTouching(obstaclesGroup)) {
	 gamestates=End ; 
showtext2=true
	 
   }
   if(showtext2===true){
	text("YOU LOSE",300,50)
   }

   if(score===100){
gamestates=End
showtext=true

   }
   if(showtext===true){
	text("YOU WIN",300,50)
   }
   }else if(gamestates===End) {
	 
	 restart.visible = true;
	 
	 
	 ground.velocityX = 0;
	 player.velocityY = 0;
	 obstaclesGroup.setVelocityXEach(0);
	 foodGroup.setVelocityXEach(0);

	 obstaclesGroup.setLifetimeEach(-1);
	 foodGroup.setLifetimeEach(-1);
	 
   }
   if(mousePressedOver(restart)) {
	 reset();
   }
   
   text("Score: "+ score, 500,50);
   
   
   
   
  
   player.collide(ground);
   
   drawSprites();
}
function spawnObstacles() {
	if(frameCount % 60 === 0) {
	  var obstacle = createSprite(600,165,10,40);
	  obstacle.velocityX = -4;
	  obstacle.addImage("img4",obstaclesimg)      
	  obstacle.scale = 0.5;
	  obstacle.lifetime = 300;
	  //add each obstacle to the group
	  obstaclesGroup.add(obstacle);
	}
  }
  function spawnBone(){
	var bone= createSprite(400,randomNumber(170,250))
	bone.velocityX = -4;
	bone.addImage("img5",boneimg)      
	bone.scale = 0.5;
	bone.lifetime = 300;
	//add each obstacle to the group
	foodGroup.add(bone);
  }
  function reset(){
	gamestates = Play;
	restart.visible = false;
	
	obstaclesGroup.destroyEach();
	foodGroup.destroyEach();
	score = 0;
	
  }

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=06 && hour<=19){
        bg = "images/background.jpg";
    }
    else{
        bg = "images/background2.jpg";
    }

    backgroundimg = loadImage(bg);
   
}
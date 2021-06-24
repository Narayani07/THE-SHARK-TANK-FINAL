

var bg,bgIMG;
var diver,diverIMG;
var pearl,pearlIMG;
var shark,sharkIMG;
var coral,coralIMG;
var score=0;
var sharkGroup;
var PearlGroup;
var coralGroup;
var gameState="play";

function preload(){
bgIMG=loadImage("ocean1.jpg");
diverIMG=loadImage("man.png");
pearlIMG=loadImage("pearl1.png")
sharkIMG=loadImage("shark.png")
coralIMG=loadImage("coral.png")
}

function setup(){
  createCanvas(1200,800);
bg=createSprite(0,0);
bg.addImage(bgIMG);
bg.scale=5;

diver=createSprite(1000,700);
diver.addImage(diverIMG);
diver.scale=0.7;

createEdgeSprites();

PearlGroup=new Group();
sharkGroup=new Group();
coralGroup=new Group();


diver.debug=true;

}



function draw(){
  background("blue");


 
if(gameState==="play"){
  bg.velocityX=3;
  
  if(bg.x>1000){
    bg.x=300;
  }
  
  
  textSize(30);
  text("score="+score,1000,100);
  stroke("white");
 
  spawnPearl();
  spawnShark();
  spawnCoral();


if(keyIsDown(LEFT_ARROW)){
  diver.x=diver.x-20;
}
if(keyIsDown(UP_ARROW)){
  diver.y=diver.y-20;
}

if(keyIsDown(DOWN_ARROW)){
  diver.y=diver.y+20;
}
diver.bounceOff;

if(PearlGroup.isTouching(diver)){
  score=score+10;
  
  pearl.destroy();

}

console.log(diver.x);

if(sharkGroup.isTouching(diver)|| coralGroup.isTouching(diver)){

  gameState="end";
  diver.destroy();
  
}

if(diver.x<=180){
  diver.x=200;
}

}
  

else if(gameState==="end"){
  PearlGroup.setVelocityXEach(0);
  sharkGroup.setVelocityXEach(0);
  sharkGroup.setVelocityYEach(0);
  coralGroup.setVelocityXEach(0); 

bg.velocityX=0;

PearlGroup.setLifetimeEach(-1);
sharkGroup.setLifetimeEach(-1);
coralGroup.setLifetimeEach(-1);

text("GAME OVER");
}

drawSprites();

}


function spawnPearl(){
  if(frameCount%200===0){
    pearl=createSprite(10,700,10,20);
    pearl.addImage(pearlIMG);
pearl.scale=0.1;

pearl.velocityX=3;
pearl.y=Math.round(random(500,800));
pearl.lifetime=500;
//pearl.depth=diver.depth;
//diver.depth=diver.depth+1;
PearlGroup.add(pearl);
pearl.debug=true;
  }
}

function spawnShark(){
if(frameCount%700===0){
  shark=createSprite(70,50,50,70);
  shark.addImage(sharkIMG);
  shark.scale=2;

  shark.velocityX=Math.round(random(2,4));
shark.velocityY=Math.round(random(2,4));
shark.lifetime=300;
shark.depth=diver.depth;
diver.depth=diver.depth+1;
sharkGroup.add(shark);
shark.debug=true;
}
}

function spawnCoral(){
  if(frameCount%400===0){
    coral=createSprite(10,750,50,70);
coral.addImage(coralIMG);
coral.scale=1.5;

coral.velocityX=4;
coral.lifetime=400;

coral.depth=diver.depth;
diver.depth=diver.depth+1;

coralGroup.add(coral);
coral.debug=true;

  }
}

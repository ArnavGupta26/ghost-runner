var backgr,backgrimg;
var door,doorimg,doorsGroup;
var climber,climberimg,climbersGroup;
var ghost,ghostimg;
var block,blocksGroup;
var gameState='play';
var score=0;

function preload(){
  
  backgrimg = loadImage("tower.png");
  doorimg = loadImage("door.png");
  climberimg = loadImage("climber.png")
  ghostimg = loadImage("ghost-standing.png");
  
  
}

function setup(){
  createCanvas(600,600);
  
  backgr = createSprite(300,300,10,10);
  backgr.addImage(backgrimg);
  backgr.velocityY=1;
  
  doorsGroup = new Group();
  climbersGroup = new Group();
  
  ghost = createSprite(300,300,10,10);
  ghost.addImage(ghostimg);
  ghost.scale=0.4;
  
  blocksGroup = new Group();
  
}

function draw(){
 
  
  
  if (gameState==='play'){
    
    
    
  if (backgr.y>600){
    backgr.y=300;
  }
    
    score=score+Math.round(frameRate()/60);
    
      if(keyDown('space')){
    ghost.velocityY=-5;
  }
  ghost.velocityY=ghost.velocityY+0.8;
  
  if (keyDown('left')){
    ghost.x=ghost.x-5;
  }
  
  if (keyDown('right')){
    ghost.x=ghost.x+5;
  }
  
 if (ghost.isTouching(climbersGroup)){
   ghost.velocityY=0;
 }
     if (ghost.isTouching(blocksGroup)||ghost.y>600||ghost.y<0){
    ghost.destroy();
    gameState='end';
  }
    
    
    
  }
  
  
  
  spawnDoors();
  drawSprites();
  
   fill('white');
  textSize(20);
  text('score: '+score,10,50);
  
   if (gameState==='end'){
     background('black');
    stroke('yellow');
    fill('yellow');
    textSize(30);
    text('GAME OVER !',200,250);
    backgr.velocityY=0;
    doorsGroup.destroyEach();
    climbersGroup.destroyEach();
    blocksGroup.destroyEach();
    
    
  }
}
function spawnDoors(){
  
  if (World.frameCount%240===0){
    door = createSprite(200,0,10,10);
    door.addImage(doorimg);
    door.x=Math.round(random(120,400));
    door.velocityY=1;
    door.lifetime=600;
    doorsGroup.add(door);
    
    ghost.depth=door.depth;
    ghost.depth+=1;
    
    climber = createSprite(200,50,10,10);
    climber.addImage(climberimg);
    climber.x=door.x;
    climber.velocityY=1;
    climber.lifetime=600;
    climbersGroup.add(climber);
  
    ghost.depth=climber.depth;
    ghost.depth+=1;
    
    block=createSprite(200,50,10,2);
    block.width=climber.width;
    block.x=door.x;
    block.velocityY=1;
    blocksGroup.add(block);
    block.debug=true;
  }
}


var towerImg, tower;
var doorImg, door, doorsGroup;
var climberImg, climber, climbersGroup, invisibleC, invisibleGroup;
var ghost, ghostImg;

var PLAY = 1;
var END = 0;
var gameState = PLAY;

function preload(){
  towerImg = loadImage('tower.png');
  doorImg = loadImage('door.png');
  climberImg = loadImage('climber.png');
  ghostImg = loadImage('ghost-standing.png');
  
}

function setup(){
  createCanvas(600,600);
  tower = createSprite(300,300, 600, 600);
  tower.addImage('tower', towerImg);
  tower.velocityY = 4;
  
  ghost = createSprite(300, 300, 10, 10);
  ghost.addImage('ghost', ghostImg);
  ghost.scale = 0.3;
  climbersGroup = createGroup();
  doorsGroup = createGroup();
  invisibleGroup = createGroup();
}

function draw(){
  
  background('black');
  
  if(gameState == PLAY){
    
    if(tower.y > 600){
    tower.y = 300;
    }
  
    if(ghost.isTouching(climbersGroup)){
      ghost.velocityY = 0;
    }
  
    if(keyDown('space')){
      ghost.velocityY = -12;
    }
    
    if(keyDown(RIGHT_ARROW)){
      ghost.x = ghost.x + 2; 
    }
  
     if(keyDown(LEFT_ARROW)){
      ghost.x = ghost.x - 2; 
    }
  
    ghost.velocityY = ghost.velocityY + 0.8;
  
    spawnDoors();
    drawSprites();
    
    if(ghost.isTouching(invisibleGroup) || ghost.y > 500){
      gameState = END;
    }
  }

  else if(gameState == END){
    fill('red');
    textSize(26);
    text('GAME OVER!', 400, 300);
    ghost.destroy();
    climbersGroup.destroyEach(); 
    doorsGroup.destroyEach();
    invisibleGroup.destroyEach();
    
  }
  
}

function spawnDoors(){
  if(frameCount % 90 === 0){
    door = createSprite(300, 10, 20, 20);
    door.x = Math.round(random(180, 460));
    door.addImage('door', doorImg);
    door.velocityY = 3;
    door.lifetime = 300;
    doorsGroup.add(door);
    
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    
    climber = createSprite(300, 80, 20 ,20);
    climber.addImage('climber', climberImg);
    climber.x = door.x;
    climber.velocityY = 3;
    climber.lifetime = 300;
    climbersGroup.add(climber);
    
    climber.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;
    
    var invisibleC = createSprite(climber.x, climber.y + 4, 90, 10);
    invisibleC.velocityY = climber.velocityY;
    invisibleC.visible = true;
    invisibleGroup.add(invisibleC);
    
  }
}
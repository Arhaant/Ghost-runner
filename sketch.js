var backgroundImage
var ghost, ghostImage
var doorImage

var PLAY = 1
var END = 0
var gameState = 1

function preload(){
  backgroundImage = loadImage("tower.png")
  ghostStanding = loadImage("ghost-standing.png")
  ghostJumping = loadImage("ghost-jumping.png")
  doorImage = loadImage("door.png")
  climberImage = loadImage("climber.png")
  spookyMusic = loadSound("spooky.wav")
}

function setup(){
  createCanvas(600,600)
  
  backgrnd = createSprite(300,300,600,600)
  backgrnd.addImage(backgroundImage)
  
  ghost = createSprite(300,300,20,20)
  ghost.addImage(ghostStanding)
  ghost.scale = 0.5
  
  doorGroup = createGroup()
  climberGroup = createGroup()
  blockGroup = createGroup()
  
  spookyMusic.loop();
  
}

function draw(){
  background("black")
  
  if(gameState === 1){
    ghost.velocityY = ghost.velocityY + 0.5
  
  backgrnd.velocityY = 1
  if(backgrnd.y >= 400){
    backgrnd.y = 300
  }
  
  if(keyDown("space")){
    ghost.velocityY = -5
    ghost.addImage(ghostJumping)
  }
  
  if(keyWentUp("space")){
    ghost.addImage(ghostStanding)
  }
  
  if(keyDown("left")){
    ghost.x = ghost.x - 3
  }
  
  if(keyDown("right")){
    ghost.x = ghost.x + 3
  }
    
    ghost.debug = true
    ghost.setCollider("rectangle", -20,20, 110,250)
    
    
  
  door();
    
    if(ghost.isTouching(climberGroup)){
      ghost.collide(climberGroup)
    }
  
  if(ghost.isTouching(blockGroup)|| ghost.y >= 600|| ghost.y <= 0|| ghost.x <=0|| ghost.x >= 600){
    ghost.destroy()
    gameState = 0
   }
    
    drawSprites();
  }
  
  if(gameState === 0){
    stroke("red")
    strokeWeight(10)
    textSize(30)
    fill("green")
    text("Game Over", 200,300)
  }
  
  
  
  
  
  
  
}

function door(){
  if(frameCount%300 === 0){
     var door = createSprite(Math.round(random(100,500)),0)
     var climber = createSprite(door.x,door.y + 50)
     climber.addImage(climberImage)
     climber.velocityY = 1 
     ghost.depth = climber.depth
     ghost.depth += 1
     climber.debug = true
     
     var block = createSprite(door.x,climber.y + 10, 100,5)
     block.velocityY = 1
     block.debug = true
      //block.visible = false
    
     door.addImage(doorImage)
     door.velocityY = 1 
     ghost.depth = door.depth
     ghost.depth += 1
    
    
    doorGroup.add(door)
    climberGroup.add(climber)
    blockGroup.add(block)
  }
}
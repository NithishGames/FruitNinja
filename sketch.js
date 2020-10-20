
var PLAY = 1;
var END = 0;

var gameState=1;

var sword , fruit , monster , fruitGroup , enemyGroup , score , r , randomFruit;

var swordImage , fruit1  , fruit2 ,fruit3 ,fruit4 , monsterImage, gameoverImage , background0Image;


function preload(){
  
  background0Image = loadImage ("background0.jpg");
  

  scoreImage = loadImage ("fruitninja.jpg")
  
  swordImage = loadImage("sword.png");
  logoImage = loadImage("logo.jpg");
  logo1Image = loadImage("ninja(3).jpg");
  fruit1 = loadImage("fruit1.png");
  fruit2 = loadImage("fruit2.png");
  fruit3 = loadImage("fruit3.png");
  fruit4 = loadImage("fruit4.png");
  monsterImage = loadAnimation("alien1.png","alien2.png");
  gameoverImage = loadImage("ninjas .out.jpg");
  
  Fruit_NinjaSound=loadSound("Fruit-Ninja-Theme-Song.mp3");
}



function setup() {
  createCanvas(600, 600);
  
  background = createSprite(300,250,10,10);
  background.addImage(background0Image);
  background.scale =2.9;
  
  score = createSprite (40,40,20,20)
  score.addImage(scoreImage)
  score.scale = 1.5
  
 
   sword=createSprite(20,20,20,20);
   sword.addImage(swordImage);
   sword.scale=0.7
  
   logo=createSprite(300,55,20,20);
   logo.addImage(logoImage);
   logo.scale=0.6;
  
  logo=createSprite(550,50,20,20);
   logo.addImage(logo1Image);
   logo.scale=0.4;
  
  
   //Fruit_NinjaSound.play(false);
  Fruit_NinjaSound.play(false);
  
  sword.setCollider("rectangle",0,0,40,40);


  score = 0;
  fruitGroup=createGroup();
  enemyGroup=createGroup();
  
  

  
}

function draw() {
  
 
  
  if(gameState===PLAY){
    

    
    fruits();
    Enemy();
    
    
    
    sword.y=mouseY;
    sword.x=mouseX;
  
    
    if(fruitGroup.isTouching(sword)){
      fruitGroup.destroyEach();
      score=score+2;
    }
    else
    {
      
      if(enemyGroup.isTouching(sword)){
        gameState=END;
        
        //Fruit_NinjaSound.play(true);
        
        fruitGroup.destroyEach();
        enemyGroup.destroyEach();
        fruitGroup.setVelocityXEach(0);
        enemyGroup.setVelocityXEach(0);
        
  
        sword.addImage(gameoverImage);
        sword.scale = 1.0
        sword.x=300;
        sword.y=250;
        
       
      }
    }
  }
  
  drawSprites();
  
  text("X"+mouseX+","+"Y"+mouseY,mouseX,mouseY);
  
  fill("yellow")
  textSize(35)
  textFont("Algerian");
  text(": "+ score,80,50);
  
     if (gameState === END){
  fill("yellow")
  textSize(35)
  textFont("Algerian");
  text("! Good Try !",190,320) ;
       
  fill("yellow")
  textSize(25)
  textFont("Algerian");
  text("Better Luck Next Time",140,350) ;
     }
  

}


function Enemy(){
  if(frameCount%200===0){
    monster=createSprite(400,200,20,20);
    monster.addAnimation("moving", monsterImage);
    monster.y=Math.round(random(100,300));
    monster.velocityX=-8;
    monster.setLifetime=50;
    
    enemyGroup.add(monster);
  }
}

function fruits(){
  if(frameCount%80===0){
    fruit=createSprite(400,200,20,20);
    fruit.scale=0.2;
     //fruit.debug=true;
     r=Math.round(random(1,4));
    if (r == 1) {
      fruit.addImage(fruit1);
    } else if (r == 2) {
      fruit.addImage(fruit2);
    } else if (r == 3) {
      fruit.addImage(fruit3);
    } else {
      fruit.addImage(fruit4);
    }
    
    fruit.y=Math.round(random(50,340));
   
    fruit.velocityX=-7;
    fruit.setLifetime=100;
    
    fruitGroup.add(fruit);
  }
}

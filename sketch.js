var dog,sadDog,happyDog, database;
var foodS,foodStock;
var addFood;
var foodObj;


//create feed and lastFed variable here
var feed,lastFed;

function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

    button=createButton("feed the dog");
    button.position(400,400);
    button.mousePressed(feedDog);

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read feedtime value from the database 
  var getFeedTime=database.ref("FeedTime");
  getFeedTime.on("value",function(data){
    FeedTime=data.val()
  })
  
 
  //write code to display text lastFed time here
  if(lastFed>=12){
    fill("white");
    textSize(20);
    text("last fed:1:00 PM",350,30);
  }
  else if(lastFed==0){
    fill("white");
    textSize(20);
    text("last fed:12 AM",350,30);
  }
  else if(lastFed<=12) {
    fill("white");
    textSize(20);
    text("last fed:8:00 AM",350,30);
  }else{
    fill("white");
    textSize(20);
    text("last fed:11:00 AM",350,30);
  }
 
  drawSprites();
}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
  
}


function feedDog(){
  dog.addImage(happyDog);
  foodStock--;
  //write code here to update food stock and last fed time
  var food_stock_val=foodObj.getFoodStock();
  if(food_stock_val<=0){
    foodObj.updateFoodStock(food_stock_val*0);
  }
  else{
    foodObj.updateFoodStock(food_stock_val-1);
  }
}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

//Create variables here
var dog, happyDog, sadDog;
var database;
var foodS, foodStock, fedTime, lastFed, feed, addFood, foodObjects;

function preload(){
  //load images here\
  dog = loadImage("images/Dog.png");
  happyDog = loadImage("images/happydog.png");
}

function setup() {
	createCanvas(500, 500);
  database = firebase.database();
  foodObjects = new Food();
  
  var dog1 = createSprite(250,250);
  dog1.addImage(dog);
  foodStock = database.ref('food');
    foodStock.on("value", readStock, showErr);
    feed = createButton("feedTheDog");
    feed.position(700,95);
    feed.mousePressed(feedDog);
    addFood = createButton("addFood");
    feed.position(800,95);
    feed.mousePressed(addFood);
}

function readStock(data){
  position = data.val();
}

function showErr(){
  console.log("Error in reading it from the database");
}

function draw() {  
background(46,139, 87)
foodObjects.display();
fedTime=database.ref('fedTime');
fedTime.on("value", function(data){
lastFed = data.value();
})
fill(255, 255, 254);
textSize(15);
if(lastFed>= 12){
  text("Last feed:"+ lastFed%12 +"PM", 350, 30);
}else if (lastFed === 0){
  text("Last feed: 12 AM", 350, 30);
}else {
  text("Last feed:"+ lastFed +"AM", 350, 30);
}
drawSprites();
}
function readStock(data){
  foodS= data.val();
  foodObjects.updateFoodStocks(foodS);

}

function feedDog(){
  dog1.addImage(happyDog);
  foodObjects.updateFoodStocks(foodObjects.getFoodStocks()-1);
  database.ref('/').update({
    food: foodObjects.getFoodStocks(),
    fedTime: hour()
  })
}
function addFood(){
   foodS++
  
    database.ref('/').update({ food: foodS })
} 
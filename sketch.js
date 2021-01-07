//Create variables here
var dog, happydog;
var database;
var foodS;
var foodStock;
var lastFed;

function preload()
{
  DogImg1 = loadImage("images/dogImg.png");
  DogImg2 = loadImage("images/dogImg1.png");
  MilkImg = loadImage("images/DogFood.png");
}

function setup() {
  createCanvas(800, 550);

  database = firebase.database();

  foodObj = new Food();

  foodStock = database.ref("Food");
  foodStock.on("value",readStock);
  
  Dog = createSprite(475,250,50,50);
  Dog.addImage(DogImg1);
  Dog.scale = 0.2;

  feed = createButton("Feed");
  feed.position(650,200);
  feed.mousePressed(feedDog);
  if(feed.mousePressed){
  }

  addFood = createButton("Add Food");
  addFood.position(650, 250);
  addFood.mousePressed(addFoods);

  var input = createInput().attribute('placeholder', 'NAME YOUR DOG');
  input.position(600,280)
  var button = createButton("PLAY");
  
  button.position(660, 310);
  button.mousePressed(function(){
    input.hide();
    button.hide();

    var name = input.value();
    var greeting = createElement('h3');
    greeting.html("WOOF WOOF MY NAME IS "  + name);
    greeting.position(500,430);
})

    for(var i=10;i<=800;i=i+15)
    {
      var dots=createSprite(i,10,5,5);
      dots.shapeColor="white";
    }
    for(var i=24;i<=784.50;i=i+15)
    {
      var dots1=createSprite(i,540,5,5);
      dots1.shapeColor="white";
    }

    for(var i=10;i<=549;i=i+14)
    {
      var dots2=createSprite(10,i,5,5);
      dots2.shapeColor=0;
    }

    for(var i=10;i<=549;i=i+14)
    {
      var dots3=createSprite(790,i,5,5);
      dots3.shapeColor=0;
    }


}



function draw() {
  background(31, 196, 118);
  foodObj.display();
  console.clear()

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val();
  });
  

 
  drawSprites();

  //fill(238, 241, 18);
  //noStroke();
  //textSize(30);
  //text("Food Remaining: " + foodS,50,265);
  //add styles here

  //Creating Rectangles Around The Buttons
  // fill(236, 130, 23);
  // stroke(236, 130, 23);
  // rect(608,160,100,33);
  // rect(608,210,88,33);
  // rect(609,260,107,33);


  fill(206, 0, 9);
  noStroke();
  textSize(30);
  if(lastFed>=12){
    text("Last Fed : "+ lastFed%12 + " PM", 380,140);
   }else if(lastFed==0){
     text("Last Fed : 12 AM",380,140);
   }else{
     text("Last Fed : "+ lastFed + " AM", 380,140);
   }

}
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


//function to update food stock and last fed time
function feedDog(){
  Dog.addImage(DogImg2);
  foodObj.updateFoodStock(foodObj.getFoodStock()-1);
  database.ref('/').update({
    Food:foodObj.getFoodStock(),
    FeedTime:hour()
  })
}

//function to add food in stock
function addFoods(){
  Dog.addImage(DogImg1);
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
}

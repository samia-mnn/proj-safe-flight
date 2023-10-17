let mybird;
let myBirds;
let season;
let halfhour;
let day;
let collisioncount;
let skyline;
let bird;
let centercolorval;
let yellowWarbler;
let warblerCall;
let s;
let birdlist;
let currentMonth;
const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]

function setup() {
  createCanvas(screen.width, screen.height);
  myBirds = [];
  halfhour = 0;
  collisioncount = 0;
  skyline = loadImage("skyline.png");
  bird = loadImage("bird.png");
  yellowWarbler = loadImage("birdimages/yellow-warbler.png");
  warblerCall = loadSound("birdcalls/yellow-warbler.mp3")
  centercolorval = 158;
  s = new Audio('./birdcalls/yellow-warbler.mp3');
  birdlist = loadJSON("bird-profiles.json");
  currentMonth = "January";
  textFont('Georgia');
}

function addBirds(numBirds)
{
  for (i = 0; i < numBirds; i++){
    myBirds.push(new Bird(random(40,100), random(-70, 5), random(10,50), random(200,650), getSeasonalBird(currentMonth)));
  }

}

function isInSeason(begin, leave, month)
{
  currentIndex = months.indexOf(month);
  return (months.indexOf(begin) <= currentIndex && currentIndex <= months.indexOf(leave));
}
function getSeasonalBird(month)
{
  let seasonalBirds = [];
  for (i = 0; i < (birdlist["birds"]).length; i++)
  {
    if (isInSeason(birdlist["birds"][i]["begin"], birdlist["birds"][i]["leave"], month))
    {
      seasonalBirds.push(birdlist["birds"][i]);
    }
  }
 // console.log(birdlist["birds"][0]);
  //birdlist.forEach(bird => isInSeason(bird.begin, bird.leave, month)? seasonalBirds.push(bird): {} )
 // console.log(seasonalBirds)
   return seasonalBirds[int(random(0, seasonalBirds.length))]
}

function makeInfo() {
   fill(30, 36, 79, 200);
   rect(0.7*screen.width, 0.2*screen.height, 0.2*screen.width, 0.6*screen.height);
}

function checkCollisions(){

  myBirds.forEach(mybird => {
    check = random(0,100);
    if(screen.width/2 - 1 < mybird.posx && mybird.posx < screen.width/2 + 1)
    {
    check <= 12 ? mybird.collide() : {};
    }
  });

}

function mouseClicked(){
  myBirds.forEach(bird => sqrt(sq(mouseX-bird.posx)+sq(mouseY-bird.posy)) < 15 ? bird.clicked = !bird.clicked : {})

}

function getCurrentFill() {

  if (day < 46 || (313 <= day && day < 365))
{
  fill(162+day*(4/46), 199-day*(124/46), 227-day*(98/46));
}
if (46 <= day && day < 164)
{
  fill(166-(day-46)*89/(118), 75+(day-46)*32/(118), 129+(day-46)*16/118);
}
if (164 <= day && day < 194)
{
  fill(77+(day-164)*137/30, 107-(day-164)*23/30, 145-(day-164)*117/30)
}
if (194 <= day && day < 313)
{
  fill(214-(day-194)*52/119, 84+(day-194)*115/119, 28+(day-194)*199/119)
}
}

function draw() {
  halfhour = halfhour + 1;
  day = halfhour / 24;
  let backgroundFill;
//console.log(getSeasonalBird("January"));
  if (halfhour % 24 == 0)
  {


fill(162, 199, 227);


if (day < 46 || (313 <= day && day < 365))
{

  if (day % 15 == 0)
  {
    addBirds(1)
  }
  fill(162+day*(4/46), 199-day*(124/46), 227-day*(98/46));
}
if (46 <= day && day < 164)
{
  fill(166-(day-46)*89/(118), 75+(day-46)*32/(118), 129+(day-46)*16/118);
  addBirds(2);
}
if (164 <= day && day < 194)
{
  fill(77+(day-164)*137/30, 107-(day-164)*23/30, 145-(day-164)*117/30)
  addBirds(19);
}
if (194 <= day && day < 313)
{
  fill(214-(day-194)*52/119, 84+(day-194)*115/119, 28+(day-194)*199/119)
  addBirds(3);
}
  }

  if (day < 46 || (313 <= day && day < 365))
{
  background(65+day*176/46, 70+day*94/46, 122+day*54/46);

}
if (46 <= day && day < 164)
{
  background(237-(day-46)*73/118, 164+(day-46)*42/118, 176+(day-46)*48/118);

}
if (164 <= day && day < 194)
{
  background(164+(day-164)*83/30, 206-(day-164)*40/30, 224-(day-164)*135/30);

}
if (194 <= day && day < 313)
{
  background(247-(day-194)*182/119, 166-(day-194)*96/119, 89+(day-194)*33/119);

}


 //= color(237-day*(237-65)/28, 164-day*(164-70)/28, 176-day*(176-122)/28); //have to go back to map to set the proper background
  //this is a good spring color
  //let backgroundColor = backgroundFill;
  //background(backgroundColor);
  noStroke();
 // circle(30,30,30);
  myBirds.forEach(mybird => {
    mybird.draw()
  });
  fill(111, 78, 130, 100);
rect(screen.width*0.65, screen.height*0.3, screen.width*(0.3), screen.height*(0.6))

  checkCollisions();

  //makeInfo();
 // fill(237-day*(237-65)/28, 164-day*(164-70)/28, 176-day*(176-122)/28, 150);

  fill(255,255,255);
  stroke(255);
  strokeWeight(2);
  for (i=0; i<screen.height; i+=screen.height/40)
  {
    line(screen.width/2, i, screen.width/2, i+screen.height/60)
  }
  noStroke();
  textSize(18);
  firstText = "Every year, over 9 million birds fly through \n New York City.\n \n However, not all of them complete their\n journey.\n \n Artificial lights and reflective glass pose  \n grave collision risks to many many birds. \n In this simulation, each bird represents\n around 3,500. \n\n As they come in over the year, click on any bird \n to meet the species seasonally navigating our city."
  text(firstText, screen.width*0.67, screen.height*0.34)
  text("Click on a bird to hear their call, see them,\n and learn their name.", screen.width/20, screen.height*0.9+25)

  textSize(30);
  //text("project s.a.f.e flight day " + int(day), screen.width/10, screen.height/4)

  let date = new Date(2023, 0);
  date.setDate(day);
  text("project s.a.f.e flight ", screen.width/10, screen.height/4)

  text(months[date.getMonth()] + " " + date.getUTCDate(), screen.width*0.75, screen.height*0.75)
  fill(161, centercolorval, 3);
  noStroke();
  text(3500*collisioncount + " birds lost", screen.width*0.85-textWidth(3500*collisioncount + " birds lost")/2, screen.height*0.85);

  //green:161 158 3
  //red" 161 8 /3

  getCurrentFill();

  currentMonth = months[date.getMonth()]
  image(skyline, screen.width/3, 3*screen.height/6);

}



class Bird {
  xvelocity;
  posx;
  posy;
  alive;
  amp;
  period;
  startingpos;
  posyog;
  r;
  species;
  image;

  constructor(period, posx, amp, posy, species) {
    this.period = period;//when you want it to reach peak
    this.xvelocity = 1;
    this.posx =posx;
    this.posy=posy;
    this.posyog= posy;
    this.amp = amp;
    this.alive = true;
    this.r = 30;
    this.clicked = false;
    this.species = species;
    this.image = loadImage("./birdimages/" + species["key"]+".png");
    this.name = species["name"];


  }
  draw() {
    if (!this.alive)
    {
    this.r = this.r > 15? this.r -1 : this.r;
    fill(168, 53, 47);

    triangle(this.posx, this.posy, this.posx+ this.r, this.posy, this.posx+this.r/2, this.posy+this.r);
    getCurrentFill();

    }

    if (this.alive)
    {
      if (this.clicked)
      {
        fill(255);
        image(this.image, windowWidth*0.05, windowHeight*0.8, windowHeight*0.2,windowHeight*0.2);
        textSize(windowHeight/30);
        text(this.name,  windowWidth*0.05 + windowHeight*0.25, windowHeight*0.9)
        s.mozPreservesPitch = false;
        s.preservesPitch = false;
        s.volume = 0.2;    // Reduced volume to avoid clipping
       // s.playbackRate = this.pitch
        s.play();
      }
    //image(bird, this.posx, this.posy, this.r, this.r)
    circle(this.posx, this.posy, 10);
    triangle(this.posx, this.posy, this.posx-20, this.posy, this.posx-5, this.posy+30) 

    triangle(this.posx-5, this.posy+30, this.posx-10, this.posy+35, this.posx-10, this.posy+15) 
    triangle(this.posx-5, this.posy-30, this.posx-10, this.posy-35, this.posx-10, this.posy-15) 


    triangle(this.posx, this.posy, this.posx-20, this.posy, this.posx-5, this.posy-30)  

    triangle(this.posx, this.posy, this.posx-30, this.posy+10, this.posx-30, this.posy-10)  
   
    this.clicked? getCurrentFill() : {};
    }
    this.update();
  }

  update() {
    if (this.alive)
    {
      this.posy = this.posyog + this.amp*sin(Math.PI/(2*this.period)*this.posx);
      this.posx = this.posx+this.xvelocity;
      this.posx > screen.width ? this.clicked = false: {};
    }

  }

  collide() {
    if (this.alive)
    {
      collisioncount = collisioncount + 1;
      centercolorval = centercolorval -7;
    }
    this.alive = false;
  }
}


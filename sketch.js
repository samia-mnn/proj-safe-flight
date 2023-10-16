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
}

function addBirds(numBirds)
{
  for (i = 0; i < numBirds; i++){
    myBirds.push(new Bird(random(40,100), random(-200, 5), random(10,50), random(200,650)));
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
  console.log(seasonalBirds)
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
    check <= 4 ? mybird.collide() : {};
    }
  });

}

function mouseClicked(){
  myBirds.forEach(bird => sqrt(sq(mouseX-bird.posx)+sq(mouseY-bird.posy)) < 15 ? bird.clicked = !bird.clicked : {})

}

function getCurrentFill() {
  if (day < 28 ) //start of new day 
  {

    fill(166-day*(4/28), 75+day*(124/28), 129+day*(98/28));
    //tint(255, 128);
   // tint(166-day*(4/28), 75+day*(124/28), 129+day*(98/28), 200);

  }
  if (28 <= day && day <= 63)
  {
    fill(162, 199, 227);

    //background(92, 112, 153);

  }
  if (63 < day && day < 182 )
  {
    fill(162, 199, 227);

  }
  if ( 182 <= day && day < 365 )
  {
    fill(162, 199, 227);

  }
}

function draw() {
  halfhour = halfhour + 1;
  day = halfhour / 48;

console.log(getSeasonalBird("January"));
  if (halfhour % 48 == 0)
  {

    //jan 1 - feb 15
    //non breeding
    //rate 0/day
    //dark blue color scheme

//15 feb - 14 june
//pre breeding
// 3/day
//pink color scheme


//14 june - 13 july
//breeding
// 19/day
//light blue dark blue color scheme

//13 july - nov 9
//post breeding
// 2 day
//orange color scheme


//nov 9 - dec 31st
//non breeding
//0 day
//dark blue color scheme






    if (day < 28  ) //start of new day //jan - 
    {

      fill(166-day*(4/28), 75+day*(124/28), 129+day*(98/28));
//19
      addBirds(10);
    }
    if (28 <= day && day <= 63)
    {
      fill(162, 199, 227);

      //background(92, 112, 153);

    }
    if (63 < day && day < 182 )
    {
      fill(162, 199, 227);
//to 2
      
      addBirds(1);
      
    }
    if ( 182 <= day && day < 365 )
    {
      fill(162, 199, 227);
//to 3
      
      addBirds(1);
      
    }
  }
  background(237-day*(237-65)/28, 164-day*(164-70)/28, 176-day*(176-122)/28); //have to go back to map to set the proper background
  //this is a good spring color

  noStroke();
 // circle(30,30,30);
  myBirds.forEach(mybird => {
    mybird.draw()
  });
  
  checkCollisions();

  //makeInfo();

  fill(255,255,255);
  stroke(255);
  strokeWeight(2);
  for (i=0; i<screen.height; i+=screen.height/40)
  {
    line(screen.width/2, i, screen.width/2, i+screen.height/60)
  }
  textSize(20);
  firstText = "Every year, over 9 million birds fly above New York City."
  text(firstText, screen.width/20, screen.height*0.9)
  text("Hover over them to meet them.", screen.width/20, screen.height*0.9+25)

  textSize(30);
  text("project s.a.f.e flight", screen.width/10, screen.height/4)

  fill(161, centercolorval, 3);
  noStroke();
  text(3500*collisioncount + " birds lost", screen.width/2-textWidth(3500*collisioncount + " birds lost")/2, screen.height*0.85);

  //green:161 158 3
  //red" 161 8 /3

  getCurrentFill();


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

  constructor(period, posx, amp, posy) {
    this.period = period;//when you want it to reach peak
    this.xvelocity = 1;
    this.posx =posx;
    this.posy=posy;
    this.posyog= posy;
    this.amp = amp;
    this.alive = true;
    this.r = 30;
    this.clicked = false;
    this.name = 'yellow-warbler';

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
        image(yellowWarbler, windowWidth*0.05, windowHeight*0.8, windowHeight*0.2,windowHeight*0.2);
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


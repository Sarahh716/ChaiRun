//Move the catcher with the left and right arrow keys to catch the falling objects. 

/* VARIABLES */
let catcher, fallingObject, secondFallingObject;
let score = 0;
let backgroundImg, catcherImg, fallingObjectImg, secondFallingObjectImg;
let playButton, directionsButton, backButton;
let screen = 0;

/* PRELOAD LOADS FILES */
function preload() {
  backgroundImg = loadImage("assets/bg1.jpg");
  catcherImg = loadImage("assets/chaipng.png");
  fallingObjectImg = loadImage("assets/cookiepink.png");
  secondFallingObjectImg = loadImage("assets/fly.png");
  mySound = loadSound('assets/bite2.mp3');
  winSound = loadSound('assets/win.mp3');
}

/* SETUP RUNS ONCE */
function setup() {
  createCanvas(400,400);

  backgroundImg.resize(400,0);
fallingObjectImg.resize(40,0);
  catcherImg.resize(70,0);
  secondFallingObjectImg.resize(25,0);

  
//BUttons
  playButton = new Sprite(width/2 - 20, height/2 + 100);
  directionsButton = new Sprite(width/2 + 20, height/2 + 100);
  backButton = new Sprite(-100, -100);
  homeScreen();
}

/* DRAW LOOP REPEATS */
function draw() {
  
  //Home screen buttons
  playButton.w = 100;
  playButton.h = 50;
  playButton.collider = 'k';
  playButton.color = 'plum';
  playButton.text = 'Play';

  directionsButton.w = 100;
  directionsButton.h = 50;
  directionsButton.collider = 'k';
  directionsButton.color = 'plum';
  directionsButton.text = 'Directions';
  

  //Check screen
  if (screen == 0) {
    if (directionsButton.mouse.presses()) {
      
      directionsScreen();
      screen = 1;
    } else if (playButton.mouse.presses()) {
      
      playScreenAssets();
      screen = 2;
    }
  }

  if (screen == 1) {
    if (backButton.mouse.presses()) {
      screen = 0;
      backButton.x = -200;
      backButton.y = -200;
      homeScreen();
    }
  }

  if (screen == 2) {
    background(224,224,224);

    //Draw bg image
    image(backgroundImg, 0, 0);

    //If falling object reaches bottm, move back to random position at top
      if (fallingObject.y >= 400) {
        fallingObject.y = 0;
        fallingObject.x = random(15,385);
        fallingObject.vel.y = random(1,5);
        score = score - 1
      }
      /*if (secondFallingObject.y >= 400) {
        fallingObject.y = 0;
        fallingObject.x = random(15,385);
        fallingObject.vel.y = random(1,3);
      }*/

    //Move catcher
      if (kb.pressing('left')) {
        catcher.vel.x = -3;
    } else if (kb.pressing('right')) {
        catcher.vel.x = 3;
      } else {
        catcher.vel.x = 0;
      }
    //Stop catcher at edges of screen
      if (catcher.x <50) {
        catcher.x = 50;
      } else if (catcher.x > 350) {
        catcher.x = 350;
      }

      //If fallingObject collides with catcher, move back to random position at top.
      if (fallingObject.collides(catcher)) {
        mySound.play();
        fallingObject.y = 0;
        fallingObject.x = random(15, 385);
        fallingObject.vel.y = random(1,5);
        fallingObject.direction = 'down';
        score = score + 1;
      }
      /*if (secondFallingObject.collides(catcher)) {
        fallingObject.y = 0;
        fallingObject.x = random(15, 385);
        fallingObject.vel.y = random(1,5);
        fallingObject.direction = 'down';
        score = score - 1;
      }*/
      fill('purple');
      textSize(20);
      text('Score = ' + score, 10, 30);

      /*if (secondFallingObject.collides(fallingObject)) {
        fallingObject.direction = 'down';
        secondFallingObject.direction = 'down';
      }*/
    
      if (score < 0) {
        fallingObject.x = -40;
        fallingObject.y = -40;
        fill('red');
        textSize(40);
        text('You Lose!',height/2-100, width/2);
        fill('red');
        textSize(20);
        text(' Click to restart.', width/2, height/2+100);
        restart();
      }

      if (score == 5) {
        youWin();
        restart();
      }
      //allSprites.debug = mouse.pressing();
    }
  }

  
//Functions
function youWin() {
  //winSound.play();
  catcher.x = -20;
  catcher.y = -20;
  fallingObject.x = -40;
  fallingObject.y = -40;
  fill(189, 70, 157);
  textSize(40);
  text('You WIN <3\n Click to restart.',height/2-100, width/2);
}

function restart() {
  if (mouseIsPressed) {
    score = 0;
    catcher.x = 200;
    catcher.y = 380;
    fallingObject.y = 0;
    fallingObject.x = random(15, 385);
    fallingObject.vel.y = random(1,5);
    fallingObject.direction = 'down';
  }
}
function homeScreen() {
  background('palegreen');
  fill('red');
  textSize(25);
  text("Welcome to Chai Run!\n Please select one of \nthe following.", width/2 - 100, height/2 - 100 );
  playButton.x = width/2 - 60;
  playButton.y = height/2 + 100;
  //playButton.pos =  {x: width/2 - 60, y = height/2 + 100};
  
  playButton.w = 100;
  playButton.h = 50;
  playButton.collider = 'k';
  playButton.color = 'plum';
  playButton.text = 'Play';
  
  directionsButton.x = width/2 + 60;
  directionsButton.y = height/2 + 100;
  //pos =  {x: width/2 + 20, y = height/2 + 100};
  directionsButton.w = 100;
  directionsButton.h = 50;
  directionsButton.collider = 'k';
  directionsButton.color = 'plum';
  directionsButton.text = 'Directions'
}

function directionsScreen() {
  background('#c364d9');
  // Draw directions to screen
  fill(0);
  textSize(17);
  text("Move the glass of tea with the left\n and right arrow keys to catch the\n falling biscuits.\n You lose a point if you \n drop the cookie.", width/2 - 120, height/2 - 100);
  //remove play and directions off screen
  playButton.pos = {x: -400, y: -400};
  directionsButton.pos = { x: -150, y: -150};
  
  //move back button on screen
  backButton.pos = {x: width/2, y: height/2 + 100};
  
  backButton.w = 100;
  backButton.h = 50;
  backButton.collider = 'k';
  backButton.color = 'yellow';
  backButton.text = 'Back';
}

function playScreenAssets() {
  playButton.x = -215;
  playButton.y = -215;
  //pos = {x:-215, y:-215};
  directionsButton.x = -230;
  directionsButton.y = -230;
  //pos = {x:-230, y:-230};

  //Create catcher 
  catcher = new Sprite(catcherImg, 200, 380, 'k');
  catcher.color = color(95,158,160);

  //Create falling object
  fallingObject = new Sprite(fallingObjectImg, 100,0);
  fallingObject.color = color(0,128,128);
  fallingObject.vel.y = 2;
  fallingObject.rotationLock = true;

  /*secondFallingObject = new Sprite(secondFallingObjectImg, 180, 0);
  //secondFallingObject.color = color(0,128,128);
  //secondFallingObject.vel.y = 3;
  secondFallingObject.rotationLock = true; 
  */
}
// Name any p5.js functions we use in the global so Glitch can recognize them.
// Add to this list as you consult the p5.js documentation for other functions.
/* global ml5, VDIDEO reateCapture, createP, createImage, createCanvas, colorMode, HSB, width, height, random, background, fill, color, random,
          rect, ellipse, stroke, image, loadImage, collideCircleCircle, text, mouseX, mouseY, 
          noFill, strokeWeight, line, mouseIsPressed, windowWidth, windowHeight, noStroke, createCapture, VIDEO, scale, textSize, round, loadSound */

let brightness, saturation, personsCirclesDiameter, targetDiameter;
let video,
  posenet,
  pose,
  pose1,
  pose2,
  pose3,
  pose4,
  pose5,
  pose6,
  pose7,
  pose8,
  pose9,
  pose10,
  pose11,
  pose12,
  pose13,
  pose14,
  noLoop,
  soundFormats, 
  songTime,
  gameFinished;
let headColor, leftColor, rightColor;
let myPoseDetector;
let song, confettiImage, amplitude; //add macarena

function preload() {
  song = loadSound(
    "https://cdn.glitch.com/d14afeca-9a45-4625-b8a2-6252656254ca%2FLos%20Del%20Rio%20-%20Macarena%20(Bayside%20Boys%20Remix).mp3?v=1595973684253"
  );
  if (song.isLoaded) {
    console.log("ready");
  }
}

function modelReady() {
  console.log("model ready");
}

function setup() {
  gameFinished = false;
  songTime = 38.5;
  //song.jump(songTime, 0);
  if (song.isPlaying()) {
    console.log("playing");
  }
  song.pause();
  song.setVolume(1.0)
  createCanvas(windowWidth, windowHeight);
  creatPoses();
  colorSetUp();
  poseNetSetUp();
  circleDiameterSetUp();
  confettiImage = loadImage(
    "https://media.giphy.com/media/kcgPV0SbJGiq62Ssf2/giphy.gif"
  );
  myPoseDetector = new poseDetector();
 
}

function draw() {
  if(gameFinished)
    {
      image(confettiImage, 0, 0, width, height);
    }
  if(!gameFinished)
    {
  drawVideo();
  drawUserPose();
    }
  if (!song.isPlaying() && pose) {
    if (myPoseDetector.checkCollisionsForCurrentStage()) {
      myPoseDetector.nextStage();
      console.log(myPoseDetector.stage);
    }
  }

  if (pose) {
    myPoseDetector.showTargets();
  }
}
//end of draw

class poseDetector {
  constructor() {
    this.everyPose = [
      pose1,
      pose2,
      pose3,
      pose4,
      pose5,
      pose6,
      pose7,
      pose8,
      pose9,
      pose10,
      pose11,
      pose12,
      pose13,
      pose14
    ];
    this.stage = 0;
    this.checkHeadTarget = false;
    this.checkLeftTarget = false;
    this.checkRightTarget = false;
  }

  showTargets() {

    fill(headColor, saturation, brightness, 50);
    ellipse(
      this.everyPose[this.stage].head.x,
      this.everyPose[this.stage].head.y,
      targetDiameter
    );
    fill(rightColor, saturation, brightness, 50);
    ellipse(
      this.everyPose[this.stage].rightWrist.x,
      this.everyPose[this.stage].rightWrist.y,
      targetDiameter
    );
    fill(leftColor, saturation, brightness, 50);
    ellipse(
      this.everyPose[this.stage].leftWrist.x,
      this.everyPose[this.stage].leftWrist.y,
      targetDiameter
    );
    //console.log(this.stage);
  }

  checkCollisionsForCurrentStage() {
    this.checkHeadTarget = collideCircleCircle(
      this.everyPose[this.stage].head.x,
      this.everyPose[this.stage].head.y,
      targetDiameter,
      pose.nose.x,
      pose.nose.y,
      personsCirclesDiameter
    );
    this.checkRightTarget = collideCircleCircle(
      this.everyPose[this.stage].rightWrist.x,
      this.everyPose[this.stage].rightWrist.y,
      targetDiameter,
      pose.rightWrist.x,
      pose.rightWrist.y,
      personsCirclesDiameter
    );
    this.checkLeftTarget = collideCircleCircle(
      this.everyPose[this.stage].leftWrist.x,
      this.everyPose[this.stage].leftWrist.y,
      targetDiameter,
      pose.leftWrist.x,
      pose.leftWrist.y,
      personsCirclesDiameter
    );
    console.log("head:" + this.checkHeadTarget);
    console.log("right:" + this.checkRightTarget);
    // console.log("right x:" + this.everyPose[this.stage].rightWrist.x )
    // console.log("right y:" + this.everyPose[this.stage].rightWrist.y)
    console.log("left:" + this.checkLeftTarget);
    if (this.checkHeadTarget && this.checkLeftTarget && this.checkRightTarget) {
      return true;
    }
  }
  nextStage() {
    this.stage++;
    if(this.stage<this.everyPose.length)
      {
    song.jump(songTime, this.everyPose[this.stage].time);
    songTime+= this.everyPose[this.stage].time
      }
    if (this.stage == this.everyPose.length) {
      setup();
      draw();
    }
  }
}

function creatPoses() {
  pose1 = {
    head: {
      x: width / 2,
      y: (height * 120) / 754
    },
    rightWrist: {
      x: (965 * width) / 1536,
      y: (510 * height) / 754
    },
    leftWrist: {
      x: (600 * width) / 1536,
      y: (510 * height) / 754
    },
    time: 0
  };

  pose2 = {
    head: {
      x: width / 2,
      y: (height * 120) / 754
    },
    rightWrist: {
      x: (965 * width) / 1536,
      y: (190 * height) / 754
    },
    leftWrist: {
      x: (600 * width) / 1536,
      y: (510 * height) / 754
    },
    time: 3.7
  };

  pose3 = {
    head: {
      x: width / 2,
      y: (height * 120) / 754
    },
    rightWrist: {
      x: (965 * width) / 1536,
      y: (190 * height) / 754
    },
    leftWrist: {
      x: (600 * width) / 1536,
      y: (190 * height) / 754
    },
    time: .5
  };
  pose4 = {
    head: {
      x: width / 2,
      y: (height * 120) / 754
    },
    rightWrist: {
      x: (965 * width) / 1536,
      y: (290 * height) / 754
    },
    leftWrist: {
      x: (600 * width) / 1536,
      y: (190 * height) / 754
    },
    time: .6
  };

  pose5 = {
    head: {
      x: width / 2,
      y: (height * 120) / 754
    },
    rightWrist: {
      x: (965 * width) / 1536,
      y: (290 * height) / 754
    },
    leftWrist: {
      x: (600 * width) / 1536,
      y: (290 * height) / 754
    },
    time: .5
  };
  pose6 = {
    head: {
      x: width / 2,
      y: (height * 120) / 754
    },
    rightWrist: {
      x: (660 * width) / 1536,
      y: (260 * height) / 754
    },
    leftWrist: {
      x: (600 * width) / 1536,
      y: (290 * height) / 754
    },
    time: .5
  };
  pose7 = {
    head: {
      x: width / 2,
      y: (height * 120) / 754
    },
    rightWrist: {
      x: (660 * width) / 1536,
      y: (260 * height) / 754
    },
    leftWrist: {
      x: (750 * width) / 1536,
      y: (280 * height) / 754
    },
    time: .5
  };

  pose8 = {
    head: {
      x: width / 2,
      y: (height * 120) / 754
    },
    rightWrist: {
      x: (850 * width) / 1536,
      y: (120 * height) / 754
    },
    leftWrist: {
      x: (750 * width) / 1536,
      y: (280 * height) / 754
    },
    time: .5
  };
  pose9 = {
    head: {
      x: width / 2,
      y: (height * 120) / 754
    },
    rightWrist: {
      x: (850 * width) / 1536,
      y: (120 * height) / 754
    },
    leftWrist: {
      x: (650 * width) / 1536,
      y: (120 * height) / 754
    },
    time: .5
  };
  pose10 = {
    head: {
      x: width / 2,
      y: (height * 120) / 754
    },
    rightWrist: {
      x: (720 * width) / 1536,
      y: (370 * height) / 754
    },
    leftWrist: {
      x: (650 * width) / 1536,
      y: (120 * height) / 754
    },
    time: .5
  };
  pose11 = {
    head: {
      x: width / 2,
      y: (height * 120) / 754
    },
    rightWrist: {
      x: (720 * width) / 1536,
      y: (370 * height) / 754
    },
    leftWrist: {
      x: (800 * width) / 1536,
      y: (350 * height) / 754
    },
    time: .5
  };
  pose12 = {
    head: {
      x: width / 2,
      y: (height * 120) / 754
    },
    rightWrist: {
      x: (920 * width) / 1536,
      y: (390 * height) / 754
    },
    leftWrist: {
      x: (800 * width) / 1536,
      y: (350 * height) / 754
    },
    time: .5
  };
  pose13 = {
    head: {
      x: width / 2,
      y: (height * 120) / 754
    },
    rightWrist: {
      x: (920 * width) / 1536,
      y: (390 * height) / 754
    },
    leftWrist: {
      x: (640 * width) / 1536,
      y: (420 * height) / 754
    },
    time: 1
  };
  pose14 = {
    head: {
      x: width / 2,
      y: (height * 20) / 754
    },
    rightWrist: {
      x: (920 * width) / 1536,
      y: (290 * height) / 754
    },
    leftWrist: {
      x: (640 * width) / 1536,
      y: (320 * height) / 754
    },
    time: 2
  };
}

function colorSetUp() {
  colorMode(HSB, 360, 100, 100, 100);
  headColor = 300;
  leftColor = 180;
  rightColor = 90;
  saturation = 40;
  brightness = 100;
}

function poseNetSetUp() {
  video = createCapture(VIDEO);
  video.hide();
  video.size(width, height);

  posenet = ml5.poseNet(video, { flipHorizontal: true }, modelReady);
  posenet.on("pose", poseResults => {
    pose = poseResults[0].pose;
  });
}

function circleDiameterSetUp() {
  targetDiameter = 90;
  personsCirclesDiameter = 50;
}

function drawVideo() {
  scale(-1.0, 1.0);
  image(video, -width, 0, width, height);
  scale(-1.0, 1.0);
}

function drawUserPose() {
  if (pose) {
    noStroke();
    fill(headColor, saturation, brightness, 100);
    ellipse(pose.nose.x, pose.nose.y, personsCirclesDiameter);
    fill(rightColor, saturation, brightness, 100);
    ellipse(pose.rightWrist.x, pose.rightWrist.y, personsCirclesDiameter);
    fill(leftColor, saturation, brightness, 100);
    ellipse(pose.leftWrist.x, pose.leftWrist.y, personsCirclesDiameter);
  }
}

// function writeLocation() {
//   if (pose) {
//     fill(0);
//     textSize(20);
//     text(`Head x: ${round(pose.nose.x)}`, 0, 80);
//     text(`Head y: ${round(pose.nose.y)}`, 0, 200);
//     text(`Right x: ${round(pose.rightWrist.x)}`, width / 3, 80);
//     text(`Right y: ${round(pose.rightWrist.y)}`, width / 3, 200);
//     text(`Left x: ${round(pose.leftWrist.x)}`, (width * 2) / 3, 80);
//     text(`Left y: ${round(pose.leftWrist.y)}`, (width * 2) / 3, 200);
//   }
// }

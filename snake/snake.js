/* eslint-env browser */
'use strict';

var canId = document.getElementById('myCanvas');
var ctx = canId.getContext('2d');

//contstructor for snake
function snkHead(w, h, x, y, xv, yv) {
	this.width = w;
	this.height = h;
	this.xPos = x;
	this.yPos = y;
	this.lastX = this.xPos;
	this.lastY = this.yPos;
	this.xVel = xv;
	this.yVel = yv;
}

//apple coordinates
var ax = Math.floor(Math.random() * 600);
var ay = Math.floor(Math.random() * 400);

//create snake body using array
var mySnake = [], i = 0;
for (i = 0; i < 10; i++) {
	mySnake[i] = new snkHead(20, 20, 300, 200, 0, 0);
}

//draws body parts
function drwCube(xBod, yBod) {
	ctx.beginPath();
	ctx.fillStyle = 'green';
	ctx.fillRect(xBod, yBod, 20, 20);
	ctx.stroke();
	ctx.closePath();
}

//create apple
function makeApl() {
	ctx.beginPath();
	ctx.fillStyle = 'red';
	ctx.fillRect(ax, ay, 20, 20);
	ctx.stroke();
	ctx.closePath();
}

//choose direction of movement
function animate(evt) {
	
	switch (evt.keyCode) {
	case 37:
		mySnake[0].xVel = -1;
		mySnake[0].yVel = 0;
		break;
	case 38:
		mySnake[0].yVel = -1;
		mySnake[0].xVel = 0;
		break;
	case 39:
		mySnake[0].xVel = 1;
		mySnake[0].yVel = 0;
		break;
	case 40:
		mySnake[0].yVel = 1;
		mySnake[0].xVel = 0;
		break;
	}
	
	switch (this.id) {
	case 'btnLft':
		mySnake[0].xVel = -1;
		mySnake[0].yVel = 0;
		break;
	case 'btnUp':
		mySnake[0].yVel = -1;
		mySnake[0].xVel = 0;
		break;
	case 'btnRight':
		mySnake[0].xVel = 1;
		mySnake[0].yVel = 0;
		break;
	case 'btnDwn':
		mySnake[0].yVel = 1;
		mySnake[0].xVel = 0;
		break;
	}
}

//redrawing screen
function move() {
	ctx.clearRect(0, 0, canId.width, canId.height);
	var c = 0;
	
	for (c = 1; c < mySnake.length; c++) {
		mySnake[c].lastX = mySnake[c].xPos;
		mySnake[c].lastY = mySnake[c].yPos;
		mySnake[c].xPos = mySnake[c - 1].lastX;
		mySnake[c].yPos = mySnake[c - 1].lastY;
		
		drwCube(mySnake[c].xPos, mySnake[c].yPos);
	}
	
	mySnake[0].lastX = mySnake[0].xPos;
	mySnake[0].lastY = mySnake[0].yPos;
	mySnake[0].xPos += mySnake[0].xVel;
	mySnake[0].yPos += mySnake[0].yVel;
	
	drwCube(mySnake[0].xPos, mySnake[0].yPos);
	makeApl();
	
	//game bounds
	if (mySnake[0].xPos < -10) {
		mySnake[0].xPos = 600;
	}
	if (mySnake[0].xPos > 600) {
		mySnake[0].xPos = 0;
	}
	if (mySnake[0].yPos < -10) {
		mySnake[0].yPos = 400;
	}
	if (mySnake[0].yPos > 400) {
		mySnake[0].yPos = 0;
	}
	
	//eat apple
	if (mySnake[0].xPos > ax - 12 && mySnake[0].xPos < ax + 12) {
		if (mySnake[0].yPos > ay - 12 && mySnake[0].yPos < ay + 12) {
			ax = Math.floor(Math.random() * 600);
			ay = Math.floor(Math.random() * 400);
			
			makeApl();
			
			//increases snake body length
			for (c = 0; c < 10; c++) {
				var t = new snkHead(20, 20, mySnake[mySnake.length - 1].lastX, mySnake[mySnake.length - 1].lastY, 0, 0);
				t.xPos = mySnake[mySnake.length - 1].lastX;
				t.yPos = mySnake[mySnake.length - 1].lastY;
				mySnake.push(t);
			}
		}
	}
	//body collision
	if (mySnake.length > 10) {
		for (c = 1; c < mySnake.length; c++) {
			if ((mySnake[0].xPos == mySnake[c].xPos) && (mySnake[0].yPos == mySnake[c].yPos)) {
				var q = mySnake.length - 5;
				for (var i = 0; i < q; i++) {
					mySnake.pop();
				}
			}
		}
	}
}

document.addEventListener('keydown', animate);
document.getElementById('btnLft').addEventListener('click', animate);
document.getElementById('btnUp').addEventListener('click', animate);
document.getElementById('btnDwn').addEventListener('click', animate);
document.getElementById('btnRight').addEventListener('click', animate);

window.onload = setInterval(move, 1000 / 60);

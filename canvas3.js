//interactive canvas 


var canvas = document.querySelector('canvas');
console.log(canvas);
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;



var c = canvas.getContext('2d');
c.beginPath();
//making the canvas responsive
window.addEventListener('resize',function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
})

//interacing according to mouse movement use event listner

//making a mouse object that takes the values from event listner and comparing these values so that our circles grow

var mouse = {
    x: undefined,
    y: undefined

}
var maxradius = 60;
var minradius = 2;
//adding colors
var colorArray = [
    '#2C3E50',
    '#E74C3C',
    '#ECF0F1',
    '#3498DB',
    '#2980B9',
    '#ffffff',
    '#00ffff',
    '#ff00ff',
    '#614BC3',
    '#33BBC5'
];


window.addEventListener('mousemove',
    function (event) {
        //event listner always takes the position of mouse and returns the value to "event variable"
        mouse.x = event.x;
        mouse.y = event.y;
        // console.log(mouse);
    });

function Circle(x, y, radius, dx, dy) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.minRadius = radius;
    this.dx = dx;
    this.dy = dy;
    
    var circleColor = colorArray[Math.floor(Math.random() * colorArray.length)];
    this.draw = function () {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, 360, false);

        c.fillStyle = circleColor;
        c.fill();
    }
    this.update = function () {
        this.draw();

        if (this.x + this.radius >= window.innerWidth || this.x - this.radius <= 0) {
            this.dx = -this.dx;
        }
        if (this.y + this.radius >= window.innerHeight || this.y - this.radius <= 0) {
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        //interacting with canvas that when coordinates of mouse and coordinates of circle become same than grow the circle

        if (mouse.x - this.x < 50 && mouse.x - this.x > -50 && mouse.y - this.y < 50 && mouse.y - this.y > -50) {
            if (this.radius < maxradius) {
                this.radius += 3;

            }
        }
        else if (this.radius > this.minRadius) {
            this.radius -= 1;
        }


    }

}
var circleArray = [];
for (var i = 0; i < 1000; i++) {
    var x = Math.random() * window.innerWidth;
    var y = Math.random() * window.innerHeight;
    var radius = Math.random() * 20 + 1;
    var dx = (Math.random() - 0.5) * 1;
    var dy = (Math.random() - 0.5) * 1;

    circleArray.push(new Circle(x, y, radius, dx, dy));

}

function animate() {
    requestAnimationFrame(animate);
    c.clearRect(0, 0, window.innerWidth, window.innerHeight);


    for (var i = 0; i < circleArray.length; i++) {

        circleArray[i].update();

    }



}
animate();

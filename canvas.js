var canvas = document.querySelector('canvas');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var c = canvas.getContext('2d');

var mouse = {
    x: undefined,
    y: undefined
}

var maxRadius = 40;
var minRadius = 3;
var numCircles = 5000;

window.addEventListener('mousemove', 
    function(event) {
        mouse.x = event.x;
        mouse.y = event.y;
    }
)

window.addEventListener('resize', function()
    {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    }
);

var colorArray = [
    '#FF4433', //red
    '#26FFE6', //turqoise blue
    '#F7EC59', //yellow
    '#FF66D8', //pink
    '#00A6ED'  //blue
];

function Circle(x, y, dx, dy, radius, color){
    this.x = x;
    this.y = y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = colorArray[Math.floor(Math.random() * colorArray.length)];

    this.draw = function() {
        c.beginPath();
        c.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
        c.fillStyle = this.color;
        c.fill();
    }

    this.update = function() {
        if (this.x + this.radius > innerWidth || this.x - this.radius < 0){
            this.dx = -this.dx;
        }
        if (this.y + this.radius > innerHeight || this.y - this.radius < 0){
            this.dy = -this.dy;
        }
        this.x += this.dx;
        this.y += this.dy;

        //interactivity 
        if (mouse.x - this.x < 50 && mouse.x - this.x > -50
            && mouse.y - this.y < 50 && mouse.y - this.y > -50
            ){
            if (this.radius < maxRadius){
                this.radius += 3;
            }    
        }
        else if (this.radius > minRadius) {
            this.radius -= 1;
        }

        this.draw();
    }
}

var circleArray = [];
for (var i = 0; i < numCircles; i++) {
    var x = Math.random() * (innerWidth - radius * 2) + radius;
    var y = Math.random() * (innerHeight - radius * 2) + radius;
    var dx = (Math.random() - 0.5);
    var dy = (Math.random() - 0.5);
    var radius = minRadius;
    
    circleArray.push(new Circle(x, y, dx, dy, radius));
}


function animate(){
    requestAnimationFrame(animate);

    c.clearRect(0,0,innerWidth, innerHeight);

    for (var i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
    }
    
}

animate();
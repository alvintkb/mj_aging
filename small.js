//var myCanvas = document.getElementById('myCanvas');

//var graphics = myCanvas.getContext('2d');

var mouse = {};

window.addEventListener("mousemove", function(event){
 //   mouse.x = event.clientX+c.width;
    mouse.y = event.clientY;
});
window.addEventListener("mousedown", function(){
    mouse.down = true;
    mouse.up = false;
});
window.addEventListener("mouseup", function(){
    mouse.down = false;
    mouse.up = true;
});

// graphics.clear = function(){
//     this.clearRect(0,0,myCanvas.width,myCanvas.height);


// }

function GET(m){
    return prompt(m);
}

function PUT(m){
    console.log(m);
}

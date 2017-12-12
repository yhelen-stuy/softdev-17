var box = document.getElementById("box");
var boxHeight = box.offsetHeight;
var boxWidth = box.offsetWidth;

//hardcode target as center
//randomize later
var targetX = boxWidth / 2;
var targetY = boxHeight / 2;


console.log( "box height: " + boxHeight );
console.log( "box width: " + boxWidth );

//calculate distance between current mouse pos and target
var distance = function (x0, y0, x1, y1) {
    // console.log(x1 - x0);
    // console.log(y1 - y0);
    return Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
};


var findIt = function(e) {
    console.log(distance(e.x, e.y, targetX, targetY));
};

/*
your OTHER FXNS

*/

box.addEventListener("mousemove", findIt);


/*
 * Team gomelon
 * Jasper Cheung, Helen Ye
 * Softdev1 Pd7
 * K17 -- Moo?
 * 207-12-13
 */

var box = document.getElementById("box");
var boxHeight = box.offsetHeight;
var boxWidth = box.offsetWidth;
// Distance mouse can click to considered to have "found" the item
var threshold = 80;
var winnar = 0;
var note = document.createElement('h1');
var body = document.getElementById('box');
body.appendChild(note);

// constants for colors
// Highest valid RGB value
var MAXRGB = 255;
// Highest valid saturation value for HSL
var MAXSAT = 100;
// Hue to be used
var HUE = 0;
// Minimum lightness desired
var MINLIGHTNESS = 50;
// Highest valid lightness value
var MAXLIGHTNESS = 100;

//hardcode target as center
//randomize later
var targetX = boxWidth / 2;
var targetY = boxHeight / 2;

console.log( "box height: " + boxHeight );
console.log( "box width: " + boxWidth );

// Randomly set the target in the box
var setTarget = function() {
    winnar = 0;
    targetX = Math.floor(Math.random() * boxWidth);
    targetY = Math.floor(Math.random() * boxHeight);
    // console.log( "target height: " + targetX);
    // console.log( "target width: " + targetY);
}

// calculates which corner is farthest
var farthestDistance = function() {
    var topL = distance(0, 0, targetX, targetY);
    var topR = distance(0, boxWidth, targetX, targetY);
    var botL = distance(boxHeight, 0, targetX, targetY);
    var botR = distance(boxHeight, boxWidth, targetX, targetY);
    return Math.max(topL, topR, botL, botR);
}

//calculate distance between current mouse pos and target
var distance = function (x0, y0, x1, y1) {
    // console.log(x1 - x0);
    // console.log(y1 - y0);

    return Math.sqrt(Math.pow(x1 - x0, 2) + Math.pow(y1 - y0, 2));
};

// If the mouse si clicked within the threshold, the object is considered 'found'
// If found print to console to indicate and reset the target
// Otherwise, tell them they haven't found it
var found = function(e) {
    if ( winnar == 1 ){
        setTarget();
        note.innerHTML = "";
        console.log(winnar);
    }
    else if (distance(e.x, e.y, targetX, targetY) < threshold) {
        winnar = 1;
        console.log(winnar);
        console.log("CONGRATS!");
        note.innerHTML = "Click anywhere to play again";
    } else {
        console.log("try again");
    }
}

// Sets the color values using the proprtion of the color values, the distance
// to the target, and the farthest distance possible.
var findIt = function(e) {
    if ( winnar == 1) {
        box.style.backgroundImage = "url('https://jamonkey.com/wp-content/uploads/2015/06/DSC00112.jpg')";
    } else{
        var farthest = farthestDistance();
        var dist = distance(e.x, e.y, targetX, targetY);

        // var rgbColor = MAXRGB - Math.round(MAXRGB * dist / farthest);
        // var rgb = "rgb(" + rgbColor + "," + rgbColor + "," + rgbColor + ")";
        var sat = Math.round(MAXSAT * dist / farthest);
        var lightness = MAXLIGHTNESS - Math.round(MINLIGHTNESS * dist / farthest);
        var hsl = "hsl(" + HUE + "," + sat + "%," + lightness + "%)";
        box.setAttribute("style","background-color: " + hsl);
    }
};

setTarget();
box.addEventListener("mousemove", findIt);
box.addEventListener("click", found);


const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');


//set canvas width and height consistent w style.css for canvas1
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

//name your code to call image
const playerImage = new Image();
playerImage.src = 'sprite/dandelion2.png';
const spriteWidth = 300;
const spriteHeight = 300;
//setting the square parameter as frame

let gameFrame = 0; //make the animation moves slower
let staggerFrames = 10; //slowing the animation by x times

const spriteAnimations = [];
const animationStates = [
    {
        name: 'stand',
        frames: 9,
    }
];


animationStates.forEach((state, index)=> {
    let frames = {
        loc:[],
    }
    for (let j =0; j <state.frames; j++){
        let positionX = j * spriteWidth;
        let positionY = index * spriteHeight;
        frames.loc.push({x:positionX, y:positionY});
    }
    spriteAnimations[state.name] = frames;
});
console.log(animationStates);


//create a function on what you want to do
function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations['stand'].loc.length;
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations['stand'].loc[position].y;
    ctx.drawImage(playerImage, frameX, frameY, 
        spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    gameFrame++
    requestAnimationFrame(animate);
};
animate();
// this way is good for character sheet that is evenly spaced
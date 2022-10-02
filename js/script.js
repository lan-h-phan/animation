let playerState = 'roll';
const dropdown = document.getElementById('animations');
dropdown.addEventListener('change', function(e){
    playerState = e.target.value;
})

const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

//set canvas width and height consistent w style.css for canvas1
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

//name your code to call image
const playerImage = new Image();
playerImage.src = 'sprite/shadow_dog.png';
const spriteWidth = 575;
const spriteHeight = 523;
//setting the square parameter as frame

let gameFrame = 0; //make the animation moves slower
let staggerFrames = 4; //slowing the animation by x times
const spriteAnimations = [];
const animationStates = [
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames: 7,
    },
    {
        name: 'fall',
        frames: 9,
    }, 
    {
        name: 'run',
        frames: 9,
    },
    {
        name: 'dizzy',
        frames: 11,
    },
    {
        name: 'sit',
        frames: 5,
    },
    {
        name: 'roll',
        frames: 7,
    },
    {
        name: 'bite',
        frames: 7,
    },
    {
        name: 'ko',
        frames: 12,
    },
    {
        name: 'gethit',
        frames: 4,
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
    let position = Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length; 
    //Math.floor forces results to be integers 
    //after the % indicates the frame number on the horizontal axis
    let frameX = spriteWidth * position;
    let frameY = spriteAnimations[playerState].loc[position].y;
    ctx.drawImage(playerImage, frameX, frameY, 
        spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
        //ctx.drawImage(image, sx, sy, sw, sh, dx, dy, dw, dh);
        //sx, sy, sw, sh is where we want to cut;
        //the dx dy dw dh is where we want to place the image

    gameFrame++;
    requestAnimationFrame(animate);
};
animate();
// this way is good for character sheet that is evenly spaced
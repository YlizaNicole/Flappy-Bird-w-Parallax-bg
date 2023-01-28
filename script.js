document.addEventListener('DOMContentLoaded' , () => {
    const bird = document.querySelector('.bird')

    let birdLeft = 220
    let birdBottom = 100
    let gravity = 3
  
    function startGame() {
        birdBottom -= gravity
        bird.style.bottom = birdBottom + 'px'
        bird.style.left = birdLeft + 'px'
    }
    setInterval(startGame, 20)

    function control(e) {
        if (e.keyCode === 32) {
            jump()
        }
    }

    function jump() {
        if (birdBottom < 500) birdBottom += 50
        bird.style.bottom = birdBottom + 'px'
        console.log(birdBottom)
    }
    document.addEventListener('keyup', control)

})




const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;
let gameSpeed = 10
const slider = document.getElementById("game-speed-slider");
slider.addEventListener("input", function() {
    gameSpeed = this.value;
    animation.frameSpeed = gameSpeed;
});

const backgroundLayer1 = new Image();
backgroundLayer1.src = '1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = '2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = '3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = '4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'ground.png';
const backgroundLayer6 = new Image();
backgroundLayer6.src = '8.png';





class Layer {
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.width = 800;
        this.height = 700;
        this.x2 = this.width;
        this.image = image;
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;
    }
    update(){
        this.speed = gameSpeed * this.speedModifier;
        if(this.x <= -this.width){
            this.x = this.width + this.x2 - this.speed;
        }
        if(this.x2 <= -this.width){
            this.x2 = this.width + this.x - this.speed;
        }
        this.x = Math.floor(this.x - this.speed);
        this.x2 = Math.floor(this.x2 - this.speed);
    }
    draw()
    {
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x2, this.y, this.width, this.height);
    }
}

const layer1 = new Layer(backgroundLayer1, 0);
const layer2 = new Layer(backgroundLayer2, 0.1);
const layer3 = new Layer(backgroundLayer3, 0.2);
const layer4 = new Layer(backgroundLayer4, 0.4);
const layer5 = new Layer(backgroundLayer5, 0.5);
const layer6 = new Layer(backgroundLayer6, 0.6);



const gameObjects = [layer1, layer2, layer3, layer4, layer5, layer6, ];

function animate(){
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gameObjects.forEach(object => {
        object.update();
        object.draw();
    });
    requestAnimationFrame(animate);
};
animate();


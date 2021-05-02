let c = document.getElementById("myCanvas");
let ctx = c.getContext("2d");

// canvas.width = 500;
// canvas.height = 500;

// let drawbg = function(){
//     let background = document.createElement("background");
//     background.src = '/images/background.jpg';
//     background.onload = function(){
//     ctx.drawImage(background,0,0,500,500); 
//     }
// }

// drawbg();


let loadImage = (src, callback) => {
    let img = document.createElement("img");
    img.onload = () => callback(img);
    img.src = src;
};

let imagePath = (frameNumber, animation) => {
    return "/images/" + animation + "/" + frameNumber + ".png";
};

let frames = {
    block : [1, 2, 3, 4, 5, 6, 7, 8, 9],
    idle : [1, 2, 3, 4, 5, 6, 7, 8],
    kick : [1, 2, 3, 4, 5, 6, 7],
    punch : [1, 2, 3, 4, 5, 6, 7],
    forward : [1, 2, 3, 4, 5, 6],
    backward : [1, 2, 3, 4, 5, 6]
};

let loadImages = (callback) => {
    let images = {idle:[], kick:[], punch:[], forward:[], backward:[], block:[]};
    let imagesToLoad = 0;

    ["idle", "kick", "punch", "block", "forward", "backward"].forEach((animation) => {
        let animationFrames = frames[animation];
        imagesToLoad = imagesToLoad+animationFrames.length;

        animationFrames.forEach((frameNumber) => {
            let path = imagePath(frameNumber, animation);

            loadImage(path, (image) => {
                images[animation][frameNumber - 1] = image;
                imagesToLoad = imagesToLoad - 1;
    
                if (imagesToLoad === 0) {
                    callback(images);
                }
            });
        });
       
    });
};

let animate = (ctx, images, animation, callback) => {
    images[animation].forEach((image, index) => {
        setTimeout(() => {
            ctx.clearRect(0, 0, 500, 500);
            ctx.drawImage(image, 0, 0, 500, 500);
        }, index * 100);
    });

    setTimeout(callback, images[animation].length * 100);
};

loadImages((images) => {
    let queuedAnimation = [];

    let aux = () => {
        let selectedAnimation;

        if (queuedAnimation.length === 0){
            selectedAnimation="idle";
        }
        else{
            selectedAnimation=queuedAnimation.shift();
        }

        animate(ctx, images, selectedAnimation, aux)
    };

    aux();

    document.getElementById('kick').onclick = () =>{
        queuedAnimation.push("kick")
    };

    document.getElementById('punch').onclick = () =>{
        queuedAnimation.push("punch")
    };

    document.getElementById('forward').onclick = () =>{
        queuedAnimation.push("forward")
    };

    document.getElementById('backward').onclick = () =>{
        queuedAnimation.push("backward")
    };

    document.getElementById('block').onclick = () =>{
        queuedAnimation.push("block")
    };


    document.addEventListener("keyup", (event) => {
        const key = event.key;
        
        if (key === "ArrowDown" || key === "s" || key === "S" ) {
            queuedAnimation.push("kick");

        } else if (key === "ArrowUp" || key === "w" || key === "W" ) {
            queuedAnimation.push("punch");

        } else if (key === "ArrowRight" || key === "d" || key === "D" ) {
            queuedAnimation.push("forward");
            
        } else if (key === "ArrowLeft" || key === "a" || key === "A" ) {
            queuedAnimation.push("backward");
        
        } else if ( key === " " ) {
            queuedAnimation.push("block");
        }

    });
});
// game constants and variables
let inputDir = { x: 0, y: 0 }
const FoodAudio = new Audio("food.mp3");
const GameOverAudio = new Audio("gameover.mp3")
const MoveAudio = new Audio("move.mp3")
const MusicAudio = new Audio("music.mp3")
let score = 0
let ori_speed = 2
let speed = ori_speed
let lastpaintTime = 0
let snakeArr = [
    { x: 13, y: 15 }
]
food = { x: 6, y: 7 }




//Game function
// we use request animation frames instead of time interval or set timeout because produces higher quality animation completely eliminating flicker and shear that can happen when using setTimeout or setInterval, and reduce or completely remove frame skips.
// ctime = current time that is rendering the frames
// lastpaintTime = last time the frames were rendered
function main(ctime) {
    window.requestAnimationFrame(main);
    //  console.log(ctime)
    if ((ctime - lastpaintTime)/1000 < 1/speed) {
        return;
    }
    lastpaintTime = ctime
    gameEngine()

}



function iscollide(snake) {
    //If you bump into yourself
    for(i = 1; i< snakeArr.length;i++){
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y ){
            return true
        }
    }
  //If you bump into the wall
  if(snake[0].x>=18 || snake[0].x <= 0 || snake[0].y>=18 || snake[0].y <= 0  ){
    return true
  }
}


function gameEngine() {
    //part 1 : updating the snake array and food
    if (iscollide(snakeArr)) {
        GameOverAudio.play()
        MusicAudio.pause()
        inputDir = { x: 0, y: 0 }
        alert("you lost you were trash press any key to begin")
        snakeArr = [{x: 13, y: 15}]
        // MusicAudio.play()
        score = 0;
        speed = ori_speed;

    }

    // if you have eaten the food then increment the score and regenerate the food
    if(snakeArr[0].y === food.y && snakeArr[0].x === food.x){
        FoodAudio.play()
        score += 1

        if(score % 1 == 0){
            speed += 2
        }


        if(score>hiscoreval){
            hiscoreval = score;
            localStorage.setItem("hiscore", JSON.stringify(hiscoreval))
            hiscoreBox.innerHTML = "Hiscore: " + hiscoreval;


        }
        scoreBox.innerHTML = "Score:  " + score
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x, y: snakeArr[0].y + inputDir.y})
        let a = 2
        let b = 16
        food = { x: Math.round(Math.random() * (b-a) + a),  y: Math.round(Math.random() * (b-a) + a)}
    }


    // Moving the snake
    for( let i = snakeArr.length-2; i>=0;i--){ 
        snakeArr[i+1] = {...snakeArr[i]}
    }

    snakeArr[0].x += inputDir.x
    snakeArr[0].y += inputDir.y



    //part 2 : displaying the array and food
    // for snake array
    board.innerHTML = ""
    snakeArr.forEach((e, index) => {
        snakeElement = document.createElement("div")
        snakeElement.style.gridRowStart = e.y
        snakeElement.style.gridColumnStart = e.x
        if (index === 0) {
            snakeElement.classList.add("head")

        }
        else {
            snakeElement.classList.add("snake")

        }
        board.appendChild(snakeElement)
    })

    // for food
    foodElement = document.createElement("div")
    foodElement.style.gridRowStart = food.y
    foodElement.style.gridColumnStart = food.x
    foodElement.classList.add("food")
    board.appendChild(foodElement)


}






//Game's main logic
// MusicAudio.play()
let hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    hiscoreval = 0;
    localStorage.setItem("hiscore", JSON.stringify(hiscoreval))

}
else{
    hiscoreval = JSON.parse(hiscore);
    hiscoreBox.innerHTML = "Hiscore: " + hiscore;

}

window.requestAnimationFrame(main)
window.addEventListener("keydown", (e) => {
    inputDir = { x: 0, y: 1 }
    MoveAudio.play()
    switch (e.key) {
        case "ArrowUp":
            inputDir.x = 0
            inputDir.y = -1
            console.log("ArrowUp")
            break;

        case "ArrowDown":
            inputDir.x = 0
            inputDir.y = 1
            console.log("ArrowDown")
            break;

        case "ArrowLeft":
            inputDir.x = -1
            inputDir.y = 0
            console.log("ArrowLeft")
            break;

        case "ArrowRight":
            inputDir.x = 1
            inputDir.y = 0
            console.log("ArrowRight")
            break;

        default:
            break;
    }
})
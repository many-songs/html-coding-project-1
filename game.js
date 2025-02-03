let canvas = document.getElementById("canvas")
const ctx = canvas.getContext("2d");
let  canvasHeight = canvas.getAttribute("height")
let canvasWidth = canvas.getAttribute("width")

let topOffset = 20
let leftOffset = 30
let bottomOffset = 70
let rightOffset = 30

let blocksWide = 10
let blocksTall = 10
let blocksWidth = (canvasWidth - leftOffset - rightOffset)/blocksWide
let blocksHeight = (canvasHeight - topOffset - bottomOffset)/blocksTall

let blocks = new Array(blocksWide).fill().map(x => new Array(blocksTall).fill(1))

let ballPosition = [canvasHeight/1.3,canvasWidth/2]
let ballVelocity = [1,1]
let ballRadius = 5

const paddleWidth = canvasWidth/4
const paddleHeight = 10
let paddlePos = (canvasWidth/2)-(paddleWidth/2)

let moveRight = false
let moveLeft = false

document.addEventListener("keydown",(e) =>keyIsPressed(e))
document.addEventListener("keyup",(e)=>keyIsReleased(e))
function keyIsPressed(e) {
    let key = e.key
    console.log(key)
    if (key=="ArrowLeft"||key=="a") {
        moveLeft=true
    }
    if (key=="ArrowRight"||key=="d") {
        moveRight=true
    }
}
function keyIsReleased(e) {
    let key = e.key
    if (key=="ArrowLeft"||key=="a") {
        moveLeft=false
    }
    if (key=="ArrowRight"||key=="d") {
        moveRight=false
    }
}
function drawBlocks() {
    let doin = false
    let colide = false
    for (let x = 0; x < blocksWide; x++) {
        const row = blocks[x];
        for (let y = 0; y < blocksTall; y++) {
            const block = row[y];
            const blockPosition = [blocksWidth*x+leftOffset, blocksHeight*y+topOffset]
            if (blocks[x][y]==1){
                ctx.fillStyle="red"
                ctx.strokeStyle="black"
                ctx.lineWidth=1
                ctx.fillRect(blockPosition[0],blockPosition[1],blocksWidth,blocksHeight)
                ctx.strokeRect(blockPosition[0],blockPosition[1],blocksWidth,blocksHeight)
                let result = testColision(blockPosition)
                if (result[0]==true) {
                    //console.log("does this really happen 10 times?")
                    colide=true
                    blocks[x][y]=0
                    if (result[1]) {
                        doin=true
                    }
                }
            }
            
        }
    }
    if (colide&!doin){
        ballVelocity[0]*=-1
        ballVelocity[1]*=-1
    }
}
function testColision(pos) {
    let left = false
    let right = false
    let up = false
    let down = false
    let testX = ballPosition[0]
    let testY = ballPosition[1]
    if (ballPosition[0]<pos[0]) {
        left = true
        testX = pos[0]
    }
    if (ballPosition[0]>pos[0]+blocksWidth) {
        right = true
        testX = pos[0]+blocksWidth
    }
    if (ballPosition[1]<pos[1]) {
        up = true
        testY = pos[1]
    }
    if (ballPosition[1]>pos[1]+blocksHeight) {
        down = true
        testY = pos[1]+blocksHeight
    }
    let distX = ballPosition[0]-(testX)
    let distY = ballPosition[1]-(testY)
    let distance = Math.sqrt((distX*distX)+(distY*distY))
    let donee = false
    if (distance <= ballRadius) {
        if (!(left||right)){
            ballVelocity[1]*=-1
            donee = true
        }
        if (!(up||down)) {
            ballVelocity[0]*=-1
            donee=true
        }
        return [true,donee]
        
    }
    return [false,false]
}
function updateBall() {
    ballPosition[0]+=ballVelocity[0]
    ballPosition[1]+=ballVelocity[1]
    
    if (ballPosition[0]-ballRadius<0) {
        ballVelocity[0]*=-1

    }
    if (ballPosition[0]+ballRadius>canvasWidth) {
        ballVelocity[0]*=-1

    }
    if (ballPosition[1]-ballRadius<0) {
        ballVelocity[1]*=-1

    }
    if (ballPosition[1]+ballRadius>canvasHeight-paddleHeight&&(ballPosition<paddlePos+paddleWidth&&ballPosition>paddlePos)) {
        ballVelocity[1]*=-1
    }
}
function drawBall() {
    ctx.fillStyle="purple"
    ctx.beginPath()
    ctx.arc(ballPosition[0],ballPosition[1],ballRadius,0,Math.PI*2)
    ctx.fill()
}
function drawPaddle() {
    ctx.fillStyle="green"
    ctx.fillRect(paddlePos,canvasHeight-paddleHeight,paddleWidth,paddleHeight)
}
function updatePaddle() {
    if (moveLeft&&(paddlePos>0)) {
        paddlePos-=3
    }
    if (moveRight&&(paddlePos+paddleWidth<canvasWidth)) {
        paddlePos+=3
    }
}
function main() {
    ctx.clearRect(0,0,canvasWidth,canvasHeight)
    drawBlocks()
    updateBall()
    drawBall()
    drawPaddle()
    updatePaddle()

    requestAnimationFrame(main)
}
main()

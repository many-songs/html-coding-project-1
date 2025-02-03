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
let blocks = new Array(blocksWide).fill(new Array(blocksTall).fill(1))
let ballPosition = [canvasHeight/1.3,canvasWidth/2]
let ballVelocity = [-Math.SQRT2/2,Math.SQRT2/2]
let ballRadius = 2
ctx.fillRect(0,0,canvasWidth,canvasHeight)

function drawBlocks() {
    for (let x = 0; x < blocksWide; x++) {
        const row = blocks[x];
        for (let y = 0; y < blocksTall; y++) {
            const block = row[y];
            const blockPosition = [blocksWidth*x+leftOffset, blocksHeight*y+topOffset]
            if (block==1){
                ctx.fillStyle="red"
                ctx.strokeStyle="black"
                ctx.lineWidth=1
                ctx.fillRect(blockPosition[0],blockPosition[1],blocksWidth,blocksHeight)
                ctx.strokeRect(blockPosition[0],blockPosition[1],blocksWidth,blocksHeight)
                if (testColision(blockPosition)==true) {
                    blocks[x][y]=0
                }
            }
            
        }
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
    if (distance <= ballRadius) {
        /*if (!(left||right)){
            ballVelocity[1]*=-1
        } else if (!(up||down)) {
            ballVelocity[0]*=-1
        } else {
            ballVelocity[0]*=-1
            ballVelocity[1]*=-1
        }
        return true
        
    }
    return false
}
function updateBall() {
    ballPosition[0]+=ballVelocity[0]
    ballPosition[1]+=ballVelocity[1]
    console.log(ballPosition)
    if (ballPosition[0]-ballRadius<0) {
        ballVelocity[0]*=-1
        console.log("I wall")
    }
    if (ballPosition[0]+ballRadius>canvasWidth) {
        ballVelocity[0]*=-1
        console.log("I wall")
    }
    if (ballPosition[1]-ballRadius<0) {
        ballVelocity[1]*=-1
        console.log("I wall")
    }
    if (ballPosition[1]+ballRadius>canvasHeight) {
        ballVelocity[1]*=-1
        console.log("I wall")
    }
}
function drawBall() {
    ctx.fillStyle="purple"
    ctx.beginPath()
    ctx.arc(ballPosition[0],ballPosition[1],ballRadius,0,Math.PI*2)
    ctx.fill()
}
function main() {
    ctx.clearRect(0,0,canvasWidth,canvasHeight)
    drawBlocks()
    updateBall()
    drawBall()

    requestAnimationFrame(main)
}
main()

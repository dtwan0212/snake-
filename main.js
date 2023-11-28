const playBoard = document.querySelector(".play-board")
const scoreElement = document.querySelector(".score")

let gameOver = false
let foodX, foodY
let snakeX = 10, snakeY = 10 
let snakeBody = []
let velocityX = 0, velocityY = 0
let setIntervalID
let score = 0

//random 0-30 value as food position
const changeFoodPosition = function()
{
    foodX = Math.floor(Math.random() * 30) + 1
    foodY = Math.floor(Math.random() * 30) + 1
}

const handleGameOver = () =>
{
    clearInterval(setIntervalID)
    alert ('game over')
    location.reload()
}

//change velocity using arrow keys
const changeDirection = (e) =>
{
    if (e.key === "ArrowUp" && velocityY !== 1)
    {
        velocityX = 0
        velocityY = -1
    }
    else if(e.key === "ArrowDown" && velocityY !== -1)
    {
        velocityX = 0
        velocityY = 1
    }
    else if(e.key === "ArrowRight" && velocityX !== -1)
    {
        velocityX = 1
        velocityY = 0
    }
    else if(e.key === "ArrowLeft" && velocityX !== 1)
    {
        velocityX = -1
        velocityY = 0
    }
    // initGame()
}

const initGame = function()
{
    if (gameOver) return handleGameOver()
    let htmlMarkup = `<div class="food" style="grid-area: ${foodY} / ${foodX}"></div>`

    // if the snake eat the food
    if (snakeX === foodX && snakeY === foodY)
    {
        changeFoodPosition()
        snakeBody.push(foodX, foodY)
        console.log(snakeBody)
        score ++
        scoreElement.innerHTML = `score: ${score}`
        
    }

    //shifting forwatrd the value of the element in the snake body 1 by 1 
    for (let i = snakeBody.length - 1; i > 0; i--)
    {
        snakeBody[i] = snakeBody[i - 1]
    } 

    //settinf 1st element of snake's body to current snake position
    snakeBody[0] = [snakeX, snakeY]

    //upadate location base on current snake head's velocity
    snakeX = snakeX + velocityX
    snakeY = snakeY + velocityY

    //check if snake's head is out of the play board
    if (snakeX <= 0 || snakeY >= 30 || snakeY <= 0|| snakeX >= 30 )
    {
        gameOver = true
    }
    
    //adding a div for each part of the snake's body
    for (let i = 0; i < snakeBody.length; i++)
    {
        htmlMarkup = htmlMarkup + `<div class="snake" style="grid-area: ${snakeBody[i][1]} / ${snakeBody[i][0]}"></div>`
        
        //check if the snake's head touch body
        if (i !== 0 && snakeBody[0][1] === snakeBody[i][1] && snakeBody[0][0] === snakeBody[i][0])
        {
            gameOver = true
        }
    }
    playBoard.innerHTML = htmlMarkup
}
changeFoodPosition()
setIntervalID = setInterval(initGame, 100)
// changeDirection()

document.addEventListener('keydown', changeDirection)

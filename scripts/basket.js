import { setBalanceField, randInt, changeBalance, animateOnce } from "./functions.js"

setBalanceField()

let warning = document.querySelector('.warning')

let active = true
let ballsLeft = 5
let score = 0
let bonus = false

let ball = document.createElement('img')
ball.classList.add('ball')
ball.src = '../png/ball_' + (localStorage.getItem('chosen_basket') ?? 'orange') + '.png'
document.querySelector('.basket_cont').appendChild(ball)

document.querySelector('.hit_amount').innerHTML = localStorage.getItem('hit_basket') ?? 0

document.querySelector('.basket_cont').style.height = document.querySelector('.basket_cont').offsetWidth * (520 / 265) + 'px'
document.querySelector('.wrapper').classList.remove('hidden')

document.querySelector('.ball').onclick = async () => {
    if (!active) { return }
    active = false

    ballsLeft -= 1
    document.querySelector('.shoots_left').innerHTML = ballsLeft

    let r = bonus ? 1 : randInt(1, 4)

    let win = !(r == 4)
    let pathX = win ? 110 : 270
    let extraRotate = win ? 0 : 1

    await moveBall(50, 600, 1)
    ball.style.zIndex = 3
    await moveBall(pathX, 450, 2)
    await moveBall(pathX, 0, 2 + extraRotate)
    await moveBall(0, 0)
    ball.style.zIndex = 4

    if (win) {
        score++
    }

    if (!ballsLeft) {
        gameOver(score * 100)
    } else {
        bonus = false
        active = true
    }
}

document.querySelector('.basket_footer').onclick = () => {
    let hitStorage = Number(localStorage.getItem('hit_basket'))
    if (!hitStorage || bonus || !active) { return }

    bonus = true
    localStorage.setItem('hit_basket', hitStorage - 1)
    document.querySelector('.hit_amount').innerHTML = hitStorage - 1
}

document.querySelector('.again').onclick = () => {
    ballsLeft = 5
    document.querySelector('.shoots_left').innerHTML = ballsLeft

    active = true
    score = 0

    document.querySelector('.warning').style.left = '-50%'
}

function gameOver(reward) {
    warning.querySelector('.outcome').src = '../png/outcome_' + (reward ? 'win' : 'lose') + '.png'
    warning.querySelector('.reward').innerHTML = reward

    if (reward) {
        changeBalance(reward)
        animateOnce('.balance', 'green')
    }

    warning.style.left = '50%'
}

function moveBall(x, y, order = 0) {
    let angle = order * 360

    ball.style.transform = 'translate(' + x + '%, -' + y + '%) rotate(' + angle + 'deg)'
    return new Promise(resolve => {
        setTimeout(() => {
            resolve('ok')
        }, 1000);
    })
}

import { animateOnce, changeBalance, randInt } from "./functions.js"

let balance = document.querySelector('.balance')
let betAmount = document.querySelector('.bet_amount')
let warning = document.querySelector('.warning')

let cfData = [0, 0, 0, 2, 5, 20]

let colAmount = 6
let rowAmount = 3
let slotAmount = 5
let slotLength = 24

let active = true
let visibleSlots = []

balance.innerHTML = localStorage.getItem('balance_basket')

setVisibleSlots()

for (let i = 2; i <= 5; i++) {
    let cfBlock = document.createElement('div')
    cfBlock.classList.add('cf_block')

    for (let j = 1; j <= 5; j++) {
        let indicator = document.createElement('div')
        indicator.classList.add('indicator')

        if (j > i) {
            indicator.classList.add('empty')
        }

        cfBlock.appendChild(indicator)
    }

    let cf = document.createElement('div')
    cf.innerHTML = cfData[i] + 'x'
    cf.classList.add('cf')
    cfBlock.appendChild(cf)

    document.querySelector('.cf_cont').appendChild(cfBlock)
}

for (let i = 0; i < colAmount; i++) {
    let slotCol = document.createElement('div')
    slotCol.classList.add('slot_col')
    document.querySelector('.field').appendChild(slotCol)
}

initInnerCols()
drawVisibleSlots()

document.querySelector('.minus').onclick = () => {
    if (Number(betAmount.innerHTML) - 50 < 0 || !active) { return }
    betAmount.innerHTML = Math.floor(Number(betAmount.innerHTML) - 50)
}

document.querySelector('.plus').onclick = () => {
    if (Number(betAmount.innerHTML) + 50 > Number(balance.innerHTML) || !active) { return }
    betAmount.innerHTML = Number(betAmount.innerHTML) + 50
}

document.querySelector('.min').onclick = () => {
    if (!active || Number(balance.innerHTML) < 50) { return }
    betAmount.innerHTML = 50
}

document.querySelector('.max').onclick = () => {
    if (!active) { return }
    betAmount.innerHTML = balance.innerHTML
}

document.querySelector('.bet_button').onclick = () => {
    if (!active || Number(betAmount.innerHTML) > Number(balance.innerHTML) || !Number(betAmount.innerHTML)) { return }

    active = false
    changeBalance(-Number(betAmount.innerHTML))

    setVisibleSlots()

    drawRandomSlots()
    drawVisibleSlots()

    for (let innerSlotCol of document.querySelectorAll('.inner_slot_col')) {
        innerSlotCol.style.top = - (slotLength + rowAmount) * 33.333 + '%'
    }

    setTimeout(() => {
        gameOver(Number(betAmount.innerHTML) * cfData[getMaxCombo()])
    }, 5000);
}

document.querySelector('.again').onclick = () => {
    resetSlots()
    warning.style.left = '-50%'
    active = true
}

function setVisibleSlots() {
    for (let i = 0; i < colAmount; i++) {
        visibleSlots[i] = []

        for (let j = 0; j < rowAmount; j++) {
            visibleSlots[i][j] = randInt(1, slotAmount)
        }
    }
}

function drawRandomSlots() {
    for (let i = 0; i < colAmount; i++) {
        for (let j = 0; j < slotLength; j++) {
            let slot = document.createElement('div')
            slot.classList.add('slot', 'block')

            let slotPic = document.createElement('img')
            slotPic.src = '../png/ball_' + randInt(1, 5) + '.png'

            slot.appendChild(slotPic)
            document.querySelectorAll('.inner_slot_col')[i].appendChild(slot)
        }
    }
}

function drawVisibleSlots() {
    for (let i = 0; i < colAmount; i++) {
        for (let j = 0; j < rowAmount; j++) {
            let slot = document.createElement('div')
            slot.classList.add('slot', 'block')

            let slotPic = document.createElement('img')
            slotPic.src = '../png/ball_' + visibleSlots[i][j] + '.png'

            slot.appendChild(slotPic)
            document.querySelectorAll('.inner_slot_col')[i].appendChild(slot)
        }
    }
}

function getMaxCombo() {
    let maxCombo = 1

    for (let i = 0; i < rowAmount; i++) {
        let combo = 1

        for (let j = 1; j < colAmount; j++) {
            if (visibleSlots[j][i] == visibleSlots[j - 1][i]) {
                combo++

                if (combo > maxCombo) {
                    maxCombo = combo
                }
            } else {
                combo = 1
            }
        }
    }

    return maxCombo
}

function gameOver(reward) {
    warning.querySelector('.outcome').src = '../png/outcome_' + (reward ? 'win' : 'lose') + '.png'
    warning.querySelector('.reward').innerHTML = reward

    if (reward) {
        changeBalance(reward)
        animateOnce('.balance')
    }

    warning.style.left = '50%'
}

function initInnerCols() {
    for (let i = 0; i < colAmount; i++) {
        let innerSlotCol = document.createElement('div')
        innerSlotCol.classList.add('inner_slot_col')

        document.querySelectorAll('.slot_col')[i].appendChild(innerSlotCol)
    }
}

function resetSlots() {
    for (let innerSlotCol of document.querySelectorAll('.inner_slot_col')) {
        innerSlotCol.remove()
    }

    initInnerCols()
    drawVisibleSlots()
}

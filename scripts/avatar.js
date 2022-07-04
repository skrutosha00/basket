import { setBalanceField } from "./functions.js";

localStorage.setItem('chosen_pers', 1)

setBalanceField()

let powerData = { 'speed': [50, 40, 30], 'accuracy': [25, 40, 80], 'coolness': [60, 20, 80], 'stamina': [40, 60, 80], 'luck': [20, 30, 40] }

for (let i = 0; i < 3; i++) {
    let persPic = document.createElement('img')
    persPic.classList.add('pers_pic')
    persPic.src = '../png/pers_' + (i + 1) + '.png'
    persPic.style.left = 2 + 33.33 * i + '%'

    document.querySelector('.pers_cont').appendChild(persPic)
}

for (let power of Object.keys(powerData)) {
    let powerBlock = document.createElement('div')
    powerBlock.classList.add('power_block')

    let icon = document.createElement('img')
    icon.classList.add('icon')
    icon.src = '../png/icon_' + power + '.png'

    let title = document.createElement('div')
    title.classList.add('title')
    title.innerHTML = power

    let bar = document.createElement('div')
    bar.classList.add('bar')

    let innerBar = document.createElement('div')
    innerBar.classList.add('inner_bar')

    bar.appendChild(innerBar)
    powerBlock.append(icon, title, bar)
    document.querySelector('.power_cont').appendChild(powerBlock)
}

for (let i = 0; i < 3; i++) {
    let choice = document.createElement('div')
    choice.classList.add('choice', 'block')
    choice.innerHTML = i + 1

    if (!i) {
        choice.classList.add('active')
    }

    choice.onclick = () => {
        for (let c of document.querySelectorAll('.choice')) {
            c.classList.remove('active')
        }
        choice.classList.add('active')

        let shift = window.innerWidth >= 460 ? 100 : 110
        document.querySelector('.pers_cont').style.left = -i * shift + '%'

        updateBars(i)
        localStorage.setItem('chosen_pers', i + 1)
    }

    document.querySelector('.control').appendChild(choice)
}

updateBars(0)

function updateBars(ind) {
    for (let i = 0; i < 5; i++) {
        document.querySelectorAll('.inner_bar')[i].style.width = powerData[Object.keys(powerData)[i]][ind] + '%'
    }
}
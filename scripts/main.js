import { setBalanceField } from "./functions.js"

let wrapper = document.querySelector('.wrapper')
let basketCard = document.querySelector('.basket')
let spinCard = document.querySelector('.spin')
let button = document.querySelector('.button')

if (!localStorage.getItem('balance_basket')) {
    localStorage.setItem('balance_basket', 5000)
}

if (!localStorage.getItem('orange_basket')) {
    localStorage.setItem('orange_basket', 1)
}

if (!localStorage.getItem('chosen_basket')) {
    localStorage.setItem('chosen_basket', 'orange')
}

let active = 1

setBalanceField()

wrapper.ontouchstart = (ev) => {
    if (ev.touches[0].clientY < wrapper.offsetHeight / 2 && ev.touches[0].clientX > wrapper.offsetWidth / 2 && active == 1) {
        active = 2

        basketCard.style.left = '-50%'
        spinCard.style.left = '50%'

        document.querySelector('.first').classList.remove('active')
        document.querySelector('.second').classList.add('active')

        button.href = './spin.html'
    }

    if (ev.touches[0].clientY < wrapper.offsetHeight / 2 && ev.touches[0].clientX < wrapper.offsetWidth / 2 && active == 2) {
        active = 1

        basketCard.style.left = '50%'
        spinCard.style.left = '150%'

        document.querySelector('.first').classList.add('active')
        document.querySelector('.second').classList.remove('active')

        button.href = './avatar.html'
    }
}
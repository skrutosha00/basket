import { setBalanceField, changeBalance, animateOnce } from "./functions.js";

setBalanceField()

let items = [
    { name: "gold", title: "Ball Skin", img: "ball_gold", price: 6500, bonus: false },
    { name: "pink", title: "Ball Skin", img: "ball_pink", price: 5000, bonus: false },
    { name: "orange", title: "Ball Skin", img: "ball_orange", price: 1500, bonus: false },
    { name: "hit", img: "hit", title: "Direct hit in the ring", price: 500, bonus: true }
]

let balance = document.querySelector('.balance')
let cardCont = document.querySelector('.shop')

for (let item of items) {
    let card = document.createElement('div')
    card.classList.add('card')

    let picCont = document.createElement('div')
    picCont.classList.add('pic_cont', item.name, 'block')
    card.appendChild(picCont)

    let pic = document.createElement('img')
    pic.src = '../png/' + item.img + '.png'
    picCont.appendChild(pic)

    let price = document.createElement('div')
    price.classList.add('price', 'block')
    price.innerHTML = item.price
    card.appendChild(price)

    let button = document.createElement('div')
    button.classList.add('shop_button', 'block')
    button.innerHTML = 'BUY'
    button.dataset.item = item.name

    if (localStorage.getItem(item.name + '_basket') == 1 && !item.bonus) {
        button.innerHTML = 'SELECT'
    }

    card.appendChild(button)

    button.onclick = () => {
        let price = Number(button.parentElement.querySelector('.price').innerHTML)

        if (localStorage.getItem(button.dataset.item + '_basket') == 1 && !item.bonus) {
            localStorage.setItem('chosen_basket', button.dataset.item)
        }

        if (!(button.innerHTML == 'SELECT')) {
            if (Number(balance.innerHTML) <= price) {
                animateOnce('.balance', 'red')
                return
            }

            changeBalance(-price)

            if (!item.bonus) {
                button.innerHTML = 'SELECT'
                localStorage.setItem('chosen_basket', button.dataset.item)
            }

            localStorage.setItem(button.dataset.item + '_basket', Number(localStorage.getItem(button.dataset.item + '_basket')) + 1)
        }
    }

    cardCont.appendChild(card)
    card.style.height = card.offsetWidth * 1.6 + 'px'
}
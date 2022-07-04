import { setBalanceField } from "./functions.js";

setBalanceField()

let pers = document.createElement('img')
pers.src = '../png/pers_' + (localStorage.getItem('chosen_pers') ?? 1) + '.png'
pers.classList.add('pers')

document.querySelector('.wrapper').appendChild(pers)
const toggleBody = document.querySelector('.toggle-body')
const toggleBtn = document.querySelector('#toggle-btn')
const approot = document.querySelector('#app-root')

$(function($) {
    const hours = new Date().getHours()
    const isDayTime = hours > 6 && hours < 20
    $(approot).addClass(isDayTime ? "theme-light" : "theme-dark")
})

$(toggleBody).click(() => {
    toggleBody.classList.toggle('toggle-body--on')
    toggleBtn.classList.toggle('toggle-btn--on')
    toggleBtn.classList.toggle('toggle-btn--scale')

    $(approot).toggleClass("theme-dark")
    $(approot).toggleClass("theme-light")
})

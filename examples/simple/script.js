const subheadlineText = 'A HMR system for legacy code!'
const delay = 50
const resetDelay = 1000

document.querySelector('.delay').textContent = `Progress: ${delay}ms`


// Subheadline
const subheadline = document.querySelector('.text-container .subheadline')
const cursor = document.querySelector('.text-container .cursor')

let textProgress = 0
let hasFinished = false
const typewriter = () => {
    if(hasFinished) {
        cursor.classList.add('blinking')
        return setTimeout(() => {
            textProgress = 0
            hasFinished = false
            cursor.classList.remove('blinking')
            typewriter()
        }, resetDelay)
    }
    subheadline.textContent = subheadlineText.slice(0, textProgress+1)
    textProgress++

    if(textProgress === subheadlineText.length) {
        hasFinished = true
    }

    setTimeout(() => {
        typewriter()
    }, delay)
}

typewriter()


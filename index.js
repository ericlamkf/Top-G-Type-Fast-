const quote = document.querySelector(".quote")
const startBtn = document.getElementById("start-btn")
const input = document.getElementById("input")
const time = document.getElementById("time")
const toggleBtn = document.querySelector(".toggle-theme")
const body = document.querySelector("body")
const status = document.getElementById("status")
const container = document.querySelector(".container")
let isPlaying = false
let currentTime = new Date()

toggleBtn.addEventListener("click", () => {
    body.classList.toggle("dark-theme")
    startBtn.classList.toggle("dark-theme")

    toggleBtn.innerHTML = body.classList.contains("dark-theme") ? `<i class="fa-solid fa-sun"></i>` : `<i class="fa-solid fa-moon"></i>`
    localStorage.setItem("website-theme", body.classList.contains("dark-theme") ? `dark` : `light`)
})

quoteExample = [
    "Life is like riding a bicycle. To keep your balance, you must keep moving.",
    "Be the change that you wish to see in the world.",
    "It always seems impossible until it’s done.",
    "Your work is going to fill a large part of your life, and the only way to be truly satisfied is to do what you believe is great work.",
    "Optimism is the faith that leads to achievement. Nothing can be done without hope and confidence.",
    "The unexamined life is not worth living.",
    "It does not matter how slowly you go as long as you do not stop.",
    "You have power over your mind - not outside events. Realize this, and you will find strength.",
    "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.",
    "Everything you can imagine is real.",
    "Be yourself; everyone else is already taken.",
    "You're off to great places, today is your day. Your mountain is waiting, so get on your way.",
    "The secret of getting ahead is getting started.",
    "Success is not final, failure is not fatal: It is the courage to continue that counts.",
    "It ain't over till it's over."
]

function getQuote() {
    const randomNum = Math.floor(Math.random() * quoteExample.length)
    return quoteExample[randomNum]
}

let words = []
let currentIndex = 0

startBtn.addEventListener("click", () => {
    if (isPlaying) {
        container.classList.add("error")
        setTimeout(() => {
            container.classList.remove("error")
        }, 500)
    }
    else {
        input.style.display = "block"
        status.innerText = "WAITING"
        status.style.color = "red"
        time.innerText = ""
        const sentence = getQuote()
        words = sentence.split(" ")
        quote.innerHTML = words.map((word, index) => `<span id="word-${index}">${word}</span>`)
            .join(" ");
        isPlaying = true
        currentIndex = 0

        document.getElementById(`word-${currentIndex}`).classList.add("highlight")
    }
})

input.addEventListener("input", () => {
    if (!isPlaying) return

    status.innerText = "START"
    status.style.color = "rgb(255, 161, 30)"

    if (currentIndex === 0) {
        currentTime = new Date()
    }

    // currentIndex = 0 at first, increment after that...
    const currentWord = words[currentIndex]
    if (input.value.trim() === currentWord) {
        //Remove highlight 
        document.getElementById(`word-${currentIndex}`).classList.remove("highlight")
        currentIndex++
        input.value = ""
    }

    //Hightlight next word
    if (currentIndex < words.length) {
        document.getElementById(`word-${currentIndex}`).classList.add("highlight")
    }
    //Completed
    else {
        input.style.display = "none"
        status.innerText = "FINISHED"
        status.style.color = "rgb(60, 157, 60)"
        const finishedTime = new Date()
        const elapsedTime = (finishedTime.getTime() - currentTime.getTime()) / 1000
        time.innerText = `Completed Successfully in ${elapsedTime}s`
        document.getElementById(`word-${currentIndex - 1}`).classList.remove("highlight")
        isPlaying = false

    }


})

if (localStorage.getItem("website-theme") === "dark") {
    body.classList.add("dark-theme")
    startBtn.classList.add("dark-theme")

    toggleBtn.innerHTML = body.classList.contains("dark-theme") ? `<i class="fa-solid fa-sun"></i>` : `<i class="fa-solid fa-moon"></i>`
}





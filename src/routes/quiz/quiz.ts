import { Word } from "$/Word"
//@ts-ignore
import Binpic from "$/icons/bin.svg?raw"
//@ts-ignore
import Editpic from "$/icons/edit.svg?raw"
import { createNoiseElement } from "$lib/util"
import { Language } from "$/Word"
import { db } from "$/database"


let fromSelected = document.getElementById("from-language")! as HTMLSelectElement
let toSelected = document.getElementById("to-language")! as HTMLSelectElement
let toTranslate = document.getElementById("word")! as HTMLParagraphElement


let words = await db.getWords()

if(words.length===0){
    toTranslate.textContent = "Insert words"
}

let wordsFilter: Word[] = words;

function playPressed() {
    from = fromSelected.value.toLowerCase() as Language
    to = toSelected.value.toLowerCase() as Language
    answerButton.disabled = false
    if (from === "kanji" || to === "kanji") {
        wordsFilter = words.filter(w => w.getWord("kanji") !== "")
    }
    console.log(wordsFilter)
    // playButton.disabled=true TODO when stop button added
    play()
}

let wordObject: Word  // question and answer correct word 
let from: Language
let to: Language
let usedWords: Word[] = []
let numberOfWords: number = 0

function play() {

    if (numberOfWords === wordsFilter.length) {
        toTranslate.textContent = "No more words"
        answerButton.disabled = true
        wordsFilter = words
        usedWords = []
        numberOfWords = 0
    }
    else {
        //make a 0.5 sec delay
        setTimeout(() => {
            answerBox.classList.remove("correct")
            toTranslate.classList.remove("correctWord")
        }, 500)
        let otherWord: boolean = true
        while (otherWord) {
            let randomWord: Word = wordsFilter[Math.floor(Math.random() * wordsFilter.length)]
            if (!usedWords.find(w => w === randomWord)) {
                otherWord = false
                usedWords.push(randomWord)
                numberOfWords++
                wordObject = randomWord
            }
        }

        let wordToTranslate = wordObject.getWord(from)
        toTranslate.textContent = wordToTranslate
    }
}


function checkAnswer() {
    answerBox.classList.remove("wrong")
    answerBox.classList.remove("correct")
    toTranslate.classList.remove("wrongWord")

    let answer: string = answerBox.value.toLowerCase()
    let trueAnswer: string = wordObject.getWord(to).toLowerCase()
    console.log(wordObject)

    console.log("Answer: " + answerBox.value + "\n" + "True:" + trueAnswer)
    if (trueAnswer === answer) {
        console.log("Correct answer")
        answerBox.value = ""
        answerBox.classList.add("correct")
        toTranslate.classList.add("correctWord")
        play()
    }
    else {
        answerBox.classList.add("wrong")
        toTranslate.classList.add("wrongWord")
    }
}




function fromLanguageChange() {
    let select = fromSelected.value
    disableValue(toSelected, select)
}

function toLanguageChange() {
    let select = toSelected.value
    disableValue(fromSelected, select)
    validate()
}

function disableValue(select: HTMLSelectElement, optionValue: string) {
    select.querySelectorAll("option").forEach(op => {
        if (op.value !== "") op.disabled = false
    })

    let option = select.querySelector(`[value="${optionValue}"]`) as HTMLOptionElement | null
    if (option) option.disabled = true
    validate()
}

function validate() {
    let from = fromSelected.value
    let to = toSelected.value
    playButton.disabled = (from === "" || to === "")
}


let playButton = document.getElementById("start-quiz")! as HTMLButtonElement
playButton.addEventListener("click", playPressed)

let answerBox = document.getElementById("answer")! as HTMLInputElement
let answerButton = document.getElementById("check-answer")! as HTMLButtonElement

answerButton.addEventListener("click", checkAnswer)


fromSelected.addEventListener("change", fromLanguageChange)
toSelected.addEventListener("change", toLanguageChange)


document.body.append(createNoiseElement())

export { }
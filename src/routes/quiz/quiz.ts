import {Word} from "../../../public/Word"
//@ts-ignore
import Binpic from "../../../src/icons/bin.svg?raw"
//@ts-ignore
import Editpic from "../../../src/icons/edit.svg?raw"
import { createNoiseElement} from "../../../lib/util"
import { Language } from "../../../public/Word"


let fromSelected = document.getElementById("from-language")! as HTMLSelectElement
let toSelected = document.getElementById("to-language")! as HTMLSelectElement
let toTranslate = document.getElementById("word")! as HTMLParagraphElement


let words: Word[] = []; // words from db

if(localStorage.length!==0){
    for(const i in localStorage){   //load words from local storage
        if(localStorage.getItem(i.toString()) == null) break
        let word = JSON.parse(localStorage.getItem(i.toString())!) as Word
        word = Word.fromJson(word) 
        words.push(word)
    }   
    /*
    localStorage.setItem("words",JSON.stringify(words))
    const words = JSON.parse(localStorage.getItem("words")!) as Word[]*/ //TODO
}else{
    toTranslate.textContent="Insert words"
}

let wordsFilter: Word[] = words;


function playPressed(){
    from = fromSelected.value.toLowerCase() as Language
    to = toSelected.value.toLowerCase() as Language
    answerButton.disabled=false
    if(from==="kanji"||to==="kanji"){
        wordsFilter = words.filter(w=>w.getWord("kanji")!=="")
    }
    console.log(wordsFilter)
   // playButton.disabled=true TODO when stop button added
    play()
}

let wordObject:Word  // question and answer correct word 
let from:Language
let to: Language
let usedWords:Word[] = []
let numberOfWords:number = 0

function play(){

    if(numberOfWords===wordsFilter.length) {
        toTranslate.textContent="No more words"
        answerButton.disabled=true
        wordsFilter = words
        usedWords = []
        numberOfWords = 0
    }
    else{
        let otherWord:boolean = true
        while(otherWord){
            let randomWord:Word = wordsFilter[Math.floor(Math.random()*wordsFilter.length)]
            if(!usedWords.find(w=>w===randomWord)){
                otherWord=false
                usedWords.push(randomWord)
                numberOfWords++
                wordObject = randomWord
            }
        }
        //make a 0.5 sec delay
        setTimeout(()=>{answerBox.classList.remove("correct")},500)
        let wordToTranslate = wordObject.getWord(from)
        toTranslate.textContent = wordToTranslate
    }
}


function checkAnswer(){
    answerBox.classList.remove("wrong")
    answerBox.classList.remove("correct")

    let answer:string = answerBox.value.toLowerCase()   
    let trueAnswer:string = wordObject.getWord(to).toLowerCase()
    console.log(wordObject)

    console.log("Answer: "+answerBox.value+"\n"+"True:"+trueAnswer)
    if(trueAnswer===answer){
        console.log("Correct answer")
        answerBox.value=""
        answerBox.classList.add("correct")
        play()
    }
    else{
        answerBox.classList.add("wrong")
    }
}




function fromLanguageChange(){
    let select = fromSelected.value   
    disableValue(toSelected,select)
}

function toLanguageChange(){
    let select = toSelected.value
    disableValue(fromSelected,select)
    validate()
}

function disableValue(select:HTMLSelectElement,optionValue:string){
    select.querySelectorAll("option").forEach(op=>{
        if(op.value!=="")op.disabled = false
    })

    let option = select.querySelector(`[value="${optionValue}"]`) as HTMLOptionElement|null
    if(option) option.disabled=true
    validate()
}

function validate(){
    let from = fromSelected.value
    let to = toSelected.value
    playButton.disabled=(from===""||to==="")
}


let playButton = document.getElementById("start-quiz")! as HTMLButtonElement
playButton.addEventListener("click",playPressed)

let answerBox = document.getElementById("answer")! as HTMLInputElement
let answerButton = document.getElementById("check-answer")! as HTMLButtonElement

answerButton.addEventListener("click",checkAnswer)


fromSelected.addEventListener("change",fromLanguageChange)
toSelected.addEventListener("change",toLanguageChange)


document.body.append(createNoiseElement())

export {}
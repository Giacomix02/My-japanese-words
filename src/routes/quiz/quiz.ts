import {Word} from "../../../public/Word"
//@ts-ignore
import Binpic from "../../../src/icons/bin.svg?raw"
//@ts-ignore
import Editpic from "../../../src/icons/edit.svg?raw"
import { createNoiseElement} from "../../../lib/util"


let fromSelected = document.getElementById("from-language")! as HTMLSelectElement
let toSelected = document.getElementById("to-language")! as HTMLSelectElement

function playPressed(){
    let from = fromSelected.value
    let to = toSelected.value
    play(from,to)
}

//@ts-ignore
function play(from:string,to:string){
    let toTranslate = document.getElementById("word")! as HTMLParagraphElement
    
    let words: Word[] = [];
    
    if(localStorage.length!==0){
        for(const i in localStorage){   //load words from local storage
            if(localStorage.getItem(i.toString()) == null) break
            words.push(JSON.parse(localStorage.getItem(i.toString())!) as Word) 
        }
        JSON.stringify(words)
    }else{
        toTranslate.textContent="Insert words"
    }

    console.log(words)
    /*
    const word = words[Math.floor(Math.random() * words.length)]
    const fromText = word[from.toLowerCase()]
    console.log(fromText)*/
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

function checkAnswer(){
    console.log(answerBox.value)
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
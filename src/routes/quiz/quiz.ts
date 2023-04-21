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

function play(from:string,to:string){
    let toTranslate = document.getElementById("word")! as HTMLParagraphElement
    let word = JSON.parse(localStorage.getItem("0")!) as Word
    console.log(word.english)
    toTranslate.textContent=word.english
    if(from==="Hiragana"){

    }
    if(to==="english"){

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


fromSelected.addEventListener("change",fromLanguageChange)
toSelected.addEventListener("change",toLanguageChange)


document.body.append(createNoiseElement())

export {}
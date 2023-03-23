let homeClick=false
//@ts-ignore
import Binpic from "./icons/bin.svg?raw"
import { createNoiseElement } from "../lib/util"

console.log(Binpic)
function changeLanguageHome(){
    let text = document.getElementById("hello")!
    if(!homeClick){
        text.textContent="こんにちは！"
        homeClick=true
    }else{
        text.textContent="HELLO!"
        homeClick=false
    }
}

let counter = document.getElementById("kanjiCounter")! // with the "!" i'm sure that the element ins't null
counter.textContent=localStorage.length.toString()


let listener = document.getElementById("hello")!
listener.addEventListener("click",changeLanguageHome)

document.body.append(createNoiseElement())

export{}
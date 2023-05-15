let idCount = 0
let modifyId : string = ""
//@ts-ignore
import Binpic from "../../../src/icons/bin.svg?raw"
//@ts-ignore
import Editpic from "../../../src/icons/edit.svg?raw"
import { createNoiseElement, parseSvg } from "$lib/util"
import {Word} from "$/Word"
//@ts-ignore
import { Language } from "$/Word"
import { DB } from "$/Word"



function deleteAll(){
    idCount = 0
    localStorage.clear()
    let container = document.getElementById("container")!
    container.innerHTML = ""
}

//console.log("idDiv                    ----- oggetto in json ----      idLocalstorage")

if(localStorage.length!==0){
    for(const i in localStorage){   //load words from local storage

        if(localStorage.getItem(i.toString()) == null) break

        let word = JSON.parse(localStorage.getItem(i.toString())!) as Word
        word = Word.fromJson(word)
    
        let container = document.getElementById("container")!
    
        let div = document.createElement("div")
        div.classList.add("words-show")
        div.id = i;
    
        let english = document.createElement("a")
        
        let text = document.createTextNode(word.getWord("english"))
        english.appendChild(text)               
        english.classList.add("english")
    
        let kanji = document.createElement("a")
        
        let textKanji = document.createTextNode(word.getWord("kanji"))
        kanji.appendChild(textKanji)
        kanji.classList.add("kanji")
    
        let hiragana = document.createElement("a")
        
        let textHiragana = document.createTextNode(word.getWord("hiragana"))
        hiragana.appendChild(textHiragana)
        hiragana.classList.add("hiragana")
    
        let editButton = document.createElement("button")   /*EDIT BUTTON*/
        editButton.classList.add("button-row")
        editButton.classList.add("edit-button")
        editButton.addEventListener("click",()=>{
            modifyId = div.id
            showModifyWord()
        })

        editButton.id = "edit"
        let editImage = parseSvg(Editpic)
        editButton.appendChild(editImage)
        editImage.classList.add("second-icon")

        
    
        let deleteButton = document.createElement("button") /*DELETE BUTTON*/
        deleteButton.classList.add("button-row")
        deleteButton.classList.add("delete-button")
        deleteButton.addEventListener("click",()=>{
            let id = deleteButton.parentElement!.id
            let div = document.getElementById(id)
            div!.remove()
            localStorage.removeItem(id)    // remove the wrong id
        })
    
        deleteButton.id = "delete"
        let deleteImage = parseSvg(Binpic)
        deleteButton.appendChild(deleteImage)
        deleteImage.classList.add("icon")




        div.appendChild(english)
        div.appendChild(kanji)
        div.appendChild(hiragana)
        div.appendChild(editButton)
        div.appendChild(deleteButton)
    
        container.appendChild(div)
    
        idCount++
    
    }
}


function showAddWord(){
    let add = document.getElementById("add")!
    add.style.display = "block"
}

function hideAddWord(){
    let add = document.getElementById("add")!
    add.style.display = "none"
}

function showModifyWord(){
    let add = document.getElementById("modify")!
    add.style.display = "block"

    let englishText = (<HTMLInputElement>document.getElementById("englishModify"))
    let kanjiText = (<HTMLInputElement>document.getElementById("kanjiModify"))
    let hiraganaText = (<HTMLInputElement>document.getElementById("hiraganaModify"))

    let div = document.getElementById(modifyId)!
    let english = div.getElementsByClassName("english")[0] as HTMLAnchorElement
    let kanji = div.getElementsByClassName("kanji")[0] as HTMLAnchorElement
    let hiragana = div.getElementsByClassName("hiragana")[0] as HTMLAnchorElement
    englishText.value = english.textContent!
    kanjiText.value = kanji.textContent!
    hiraganaText.value = hiragana.textContent!
}

function hideModifyWord(){
    let add = document.getElementById("modify")!
    add.style.display = "none"
}

function modifyWord(){
    let englishText = (<HTMLInputElement>document.getElementById("englishModify")).value
    let kanjiText = (<HTMLInputElement>document.getElementById("kanjiModify")).value
    let hiraganaText = (<HTMLInputElement>document.getElementById("hiraganaModify")).value

    let word = new Word(kanjiText,englishText,hiraganaText)
    localStorage.setItem(modifyId,JSON.stringify(new DB(word)))

    let div = document.getElementById(modifyId)!
    let english = div.getElementsByClassName("english")[0] as HTMLAnchorElement
    let kanji = div.getElementsByClassName("kanji")[0] as HTMLAnchorElement
    let hiragana = div.getElementsByClassName("hiragana")[0] as HTMLAnchorElement

    english.textContent = englishText
    kanji.textContent = kanjiText
    hiragana.textContent = hiraganaText

    hideModifyWord()


}



function addWord(){

    let englishText = (<HTMLInputElement>document.getElementById("english")).value
    let kanjiText = (<HTMLInputElement>document.getElementById("kanji")).value
    let hiraganaText = (<HTMLInputElement>document.getElementById("hiragana")).value

    let word = new Word(kanjiText,englishText,hiraganaText)             //save word in local storage and create object
    localStorage.setItem(idCount.toString(),JSON.stringify(new DB(word)))
    localStorage.key(idCount)
    //console.log(idCount +"-----"+ localStorage.getItem(idCount.toString()) +"-----"+ localStorage.key(idCount))

    let container = document.getElementById("container")!

    let div = document.createElement("div")
    div.classList.add("words-show")
    div.id = idCount.toString()

    let english = document.createElement("a")
    
    let text = document.createTextNode(englishText)
    english.appendChild(text)               
    english.classList.add("english")

    let kanji = document.createElement("a")
    
    let textKanji = document.createTextNode(kanjiText)
    kanji.appendChild(textKanji)
    kanji.classList.add("kanji")

    let hiragana = document.createElement("a")
    
    let textHiragana = document.createTextNode(hiraganaText)
    hiragana.appendChild(textHiragana)
    hiragana.classList.add("hiragana")

    let editButton = document.createElement("button")   /*EDIT BUTTON*/
    editButton.classList.add("button-row")
    editButton.classList.add("edit-button")
    editButton.addEventListener("click",()=>{
        modifyId = div.id
        showModifyWord()
    })
    
    editButton.id = "edit"
    let editImage = document.createElement("div")
    editImage.innerHTML = Editpic
    editButton.appendChild(editImage)
    editButton.classList.add("second-icon")

    let deleteButton = document.createElement("button") /*DELETE BUTTON*/
    deleteButton.classList.add("button-row")
    deleteButton.classList.add("delete-button")
    deleteButton.addEventListener("click",()=>{
        let id = deleteButton.parentElement!.id
        let div = document.getElementById(id)
        div!.remove()
        localStorage.removeItem(id)
    })

    deleteButton.id = "delete"
    let deleteImage = document.createElement("div")
    deleteImage.innerHTML = Binpic
    deleteButton.appendChild(deleteImage)
    deleteButton.classList.add("icon")


    idCount++

    div.appendChild(english)
    div.appendChild(kanji)
    div.appendChild(hiragana)
    div.appendChild(editButton)
    div.appendChild(deleteButton)

    container.appendChild(div)

    hideAddWord()

    let englishInput = (<HTMLInputElement>document.getElementById("english"))
    let kanjiInput = (<HTMLInputElement>document.getElementById("kanji"))
    let hiraganaInput = (<HTMLInputElement>document.getElementById("hiragana"))

    englishInput.value = ""
    kanjiInput.value = ""
    hiraganaInput.value = ""
    
}

function addButtonActivate(){
    add.disabled=!Boolean(english.value && hiragana.value)
}

function modifyButtonActivate(){
    modify.disabled=!Boolean(englishModify.value && hiraganaModify.value)
}


let button = document.getElementById("button")!
button.addEventListener("click",showAddWord)

let add = document.getElementById("insertWord")! as HTMLButtonElement
add.addEventListener("click",addWord)

let cancel = document.getElementById("cancel")!
cancel.addEventListener("click",hideAddWord)

let cancelModify = document.getElementById("cancelModify")!
cancelModify.addEventListener("click",hideModifyWord)

let modify = document.getElementById("modifyWord")! as HTMLButtonElement
modify.addEventListener("click",modifyWord)

let deleteAllW = document.getElementById("deleteAll")!
deleteAllW.addEventListener("click",deleteAll)


document.body.append(createNoiseElement())


let english = document.getElementById("english")! as HTMLInputElement
let englishModify = document.getElementById("englishModify")! as HTMLInputElement
let kanji = document.getElementById("kanji")! as HTMLInputElement
let kanjiModify = document.getElementById("kanjiModify")! as HTMLInputElement
let hiragana = document.getElementById("hiragana")! as HTMLInputElement
let hiraganaModify = document.getElementById("hiraganaModify")! as HTMLInputElement

english.addEventListener( "input", addButtonActivate ) 
englishModify.addEventListener( "input", modifyButtonActivate )
kanji.addEventListener( "input", addButtonActivate ) 
kanjiModify.addEventListener( "input", modifyButtonActivate )
hiragana.addEventListener( "input", addButtonActivate ) 
hiraganaModify.addEventListener( "input", modifyButtonActivate )

export{}

/*
Metti un data attribute per ogni riga dove ci metti un id univoco, oppure usa  l'id vero e proprio
Quando aggiungi un nuovo elemento crea un altro id, in quel modo sai riconoscere quale elemento é cosa


Togli il fade a destra, non lo stai usando
Compatta la pagina
Aggiungi più padding orizzontale
Usa Flex wrap e metti un max width alle righe
*/
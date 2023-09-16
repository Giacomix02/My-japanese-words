//@ts-ignore
import Binpic from "$/icons/bin.svg?raw"
//@ts-ignore
import Editpic from "$/icons/edit.svg?raw"
import { createNoiseElement, parseSvg } from "$lib/util"
import { Word } from "$/Word"
//@ts-ignore
import { Language } from "$/Word"
import { db } from "$/database"

let modifyId: string = ""

async function deleteAll() {
    db.deleteAll()
    deleteAllHTMLRows()
}


async function array(){
    let words = await db.getWords()
    initialize(words)
}


function initialize(words:Word[]){
    for (const w of words!) {   
        createRow(w)
    }
}


function createRow(w:Word){
    let container = document.getElementById("container")!
    
    let div = document.createElement("div")
    div.classList.add("words-show")
    div.id = w.getId()!
    
    let english = document.createElement("a")

    let text = document.createTextNode(w.getWord("english"))
    english.appendChild(text)
    english.classList.add("english")

    let kanji = document.createElement("a")

    let textKanji = document.createTextNode(w.getWord("kanji"))
    kanji.appendChild(textKanji)
    kanji.classList.add("kanji")

    let hiragana = document.createElement("a")

    let textHiragana = document.createTextNode(w.getWord("hiragana"))
    hiragana.appendChild(textHiragana)
    hiragana.classList.add("hiragana")

    let editButton = document.createElement("button")   /*EDIT BUTTON*/
    editButton.classList.add("button-row")
    editButton.classList.add("edit-button")
    editButton.addEventListener("click", () => {
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
    deleteButton.addEventListener("click", async () =>{
        let id = deleteButton.parentElement!.id
        let div = document.getElementById(id)
        div!.remove()
        await db.removeWord(id)
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
}



function showAddWord() {
    let add = document.getElementById("add")!
    add.style.display = "block"
}

function hideAddWord() {
    let add = document.getElementById("add")!
    add.style.display = "none"
}

function showModifyWord() {
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

function hideModifyWord() {
    let add = document.getElementById("modify")!
    add.style.display = "none"
}

async function modifyWord() {
    let englishText = (<HTMLInputElement>document.getElementById("englishModify")).value
    let kanjiText = (<HTMLInputElement>document.getElementById("kanjiModify")).value
    let hiraganaText = (<HTMLInputElement>document.getElementById("hiraganaModify")).value

    let word = new Word(modifyId,kanjiText, englishText, hiraganaText)
    db.modifyWord(word)

    let div = document.getElementById(modifyId)!
    let english = div.getElementsByClassName("english")[0] as HTMLAnchorElement
    let kanji = div.getElementsByClassName("kanji")[0] as HTMLAnchorElement
    let hiragana = div.getElementsByClassName("hiragana")[0] as HTMLAnchorElement

    english.textContent = englishText
    kanji.textContent = kanjiText
    hiragana.textContent = hiraganaText

    hideModifyWord()


}



async function addWord() {

    let englishText = (<HTMLInputElement>document.getElementById("english")).value
    let kanjiText = (<HTMLInputElement>document.getElementById("kanji")).value
    let hiraganaText = (<HTMLInputElement>document.getElementById("hiragana")).value

    let word = new Word("",kanjiText, englishText, hiraganaText)
    let id = await db.addWord(word)
    word.setId(id)
    
    createRow(word)

    hideAddWord()

    let englishInput = (<HTMLInputElement>document.getElementById("english"))
    let kanjiInput = (<HTMLInputElement>document.getElementById("kanji"))
    let hiraganaInput = (<HTMLInputElement>document.getElementById("hiragana"))

    englishInput.value = ""
    kanjiInput.value = ""
    hiraganaInput.value = ""

}

function addButtonActivate() {
    add.disabled = !Boolean(english.value && hiragana.value)
}

function modifyButtonActivate() {
    modify.disabled = !Boolean(englishModify.value && hiraganaModify.value)
}

async function search(){

    deleteAllHTMLRows()
    
    let s:string = searchText.value

    let words:Word[] = await db.search(s)
    
    for(let w of words){
        createRow(w)
    }
}


function deleteAllHTMLRows(){
    let container = document.getElementById("container")!
    container.innerHTML = ""
}


let button = document.getElementById("button")!
button.addEventListener("click", showAddWord)

let add = document.getElementById("insertWord")! as HTMLButtonElement
add.addEventListener("click", addWord)

let cancel = document.getElementById("cancel")!
cancel.addEventListener("click", hideAddWord)

let cancelModify = document.getElementById("cancelModify")!
cancelModify.addEventListener("click", hideModifyWord)

let modify = document.getElementById("modifyWord")! as HTMLButtonElement
modify.addEventListener("click", modifyWord)

let deleteAllW = document.getElementById("deleteAll")!
deleteAllW.addEventListener("click", deleteAll)


document.body.append(createNoiseElement())


let english = document.getElementById("english")! as HTMLInputElement
let englishModify = document.getElementById("englishModify")! as HTMLInputElement
let kanji = document.getElementById("kanji")! as HTMLInputElement
let kanjiModify = document.getElementById("kanjiModify")! as HTMLInputElement
let hiragana = document.getElementById("hiragana")! as HTMLInputElement
let hiraganaModify = document.getElementById("hiraganaModify")! as HTMLInputElement

let searchButton = document.getElementById("search-button")! as HTMLButtonElement
let searchText = document.getElementById("search")! as HTMLInputElement

english.addEventListener("input", addButtonActivate)
englishModify.addEventListener("input", modifyButtonActivate)
kanji.addEventListener("input", addButtonActivate)
kanjiModify.addEventListener("input", modifyButtonActivate)
hiragana.addEventListener("input", addButtonActivate)
hiraganaModify.addEventListener("input", modifyButtonActivate)

searchButton.addEventListener("click",search)
searchText.addEventListener("input",search)

array()

export { }

/*
Metti un data attribute per ogni riga dove ci metti un id univoco, oppure usa  l'id vero e proprio
Quando aggiungi un nuovo elemento crea un altro id, in quel modo sai riconoscere quale elemento é cosa


Togli il fade a destra, non lo stai usando
Compatta la pagina
Aggiungi più padding orizzontale
Usa Flex wrap e metti un max width alle righe
*/
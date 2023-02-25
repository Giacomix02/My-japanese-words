let idCount = 0

function showAddWord(){
    let add = document.getElementById("add")!
    add.style.display = "block"
}

function hideAddWord(){
    let add = document.getElementById("add")!
    add.style.display = "none"
}

function addWord(){

    let englishText = (<HTMLInputElement>document.getElementById("english")).value
    let kanjiText = (<HTMLInputElement>document.getElementById("kanji")).value
    let hiraganaText = (<HTMLInputElement>document.getElementById("hiragana")).value

    if(englishText == "" || kanjiText == "" || hiraganaText == ""){
        alert("You must fill all the fields")
        return
    }

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

    let editButton = document.createElement("button")
    editButton.classList.add("button-row")
    let editImage = document.createElement("img")
    editImage.src = "/edit.svg"
    editImage.classList.add("edit-button")
    editButton.appendChild(editImage);

    let deleteButton = document.createElement("button")
    deleteButton.classList.add("button-row")
    deleteButton.classList.add("delete-button")
    deleteButton.addEventListener("click",()=>{
        let id = deleteButton.parentElement!.id
        let div = document.getElementById(id)
        div!.remove()
    })

    deleteButton.id = "delete"
    let deleteImage = document.createElement("img")
    deleteImage.src = "/bin.svg"
    deleteButton.appendChild(deleteImage)


    idCount++

    div.appendChild(english)
    div.appendChild(kanji)
    div.appendChild(hiragana)
    div.appendChild(editButton)
    div.appendChild(deleteButton)

    container.appendChild(div)

    hideAddWord()
}


let button = document.getElementById("button")!
button.addEventListener("click",showAddWord)

let add = document.getElementById("insertWord")!
add.addEventListener("click",addWord)

let cancel = document.getElementById("cancel")!
cancel.addEventListener("click",hideAddWord)



export{}

/*
Metti un data attribute per ogni riga dove ci metti un id univoco, oppure usa  l'id vero e proprio
Quando aggiungi un nuovo elemento crea un altro id, in quel modo sai riconoscere quale elemento é cosa


Togli il fade a destra, non lo stai usando
Compatta la pagina
Aggiungi più padding orizzontale
Usa Flex wrap e metti un max width alle righe
*/
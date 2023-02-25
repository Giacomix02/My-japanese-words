let idCount = 0

function addWord(){
    let container = document.getElementById("container")!

    let div = document.createElement("div")
    div.classList.add("words-show")
    div.id = idCount.toString()

    let english = document.createElement("a")
    
    /*
    let text = document.createTextNode(idCount.toString())
    english.appendChild(text)                               
    */

    english.classList.add("english")

    let kanji = document.createElement("a")
    kanji.classList.add("kanji")

    let hiragana = document.createElement("a")
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
}


let button = document.getElementById("button")!
button.addEventListener("click",addWord)


export{}

/*
Metti un data attribute per ogni riga dove ci metti un id univoco, oppure usa  l'id vero e proprio
Quando aggiungi un nuovo elemento crea un altro id, in quel modo sai riconoscere quale elemento é cosa


Togli il fade a destra, non lo stai usando
Compatta la pagina
Aggiungi più padding orizzontale
Usa Flex wrap e metti un max width alle righe
*/
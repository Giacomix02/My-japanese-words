function addWord(){
    let container = document.getElementById("container")!

    let div = document.createElement("div")
    div.classList.add("words-show")

    let english = document.createElement("a")
    english.classList.add("english")

    let kanji = document.createElement("a")
    kanji.classList.add("kanji")

    let hiragana = document.createElement("a")
    hiragana.classList.add("hiragana")

    div.appendChild(english)
    div.appendChild(kanji)
    div.appendChild(hiragana)

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
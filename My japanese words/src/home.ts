let homeClick=false

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
counter.textContent='9'


let listener = document.getElementById("hello")!
listener.addEventListener("click",changeLanguageHome)



export{}
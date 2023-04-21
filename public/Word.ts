export class Word{
    kanji : string
    english : string
    hiragana : string

    constructor(kanji : string, english : string, hiragana : string){
        this.kanji = kanji
        this.english = english
        this.hiragana = hiragana
    }

    getKanji(){
        return this.kanji
    }

    getEnglish(){
        return this.english
    }

    getHiragana(){
        return this.hiragana
    }

    setKanji(kanji : string){
        this.kanji = kanji
    }

    setEnglish(english : string){
        this.english = english
    }

    setHiragana(hiragana : string){
        this.hiragana = hiragana
    }
}
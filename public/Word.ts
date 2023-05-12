export type Language = "kanji" | "english" | "hiragana"

export class Word{
    data : Record<Language,string>

    constructor(kanji : string, english : string, hiragana : string){
        this.data = {
            kanji,
            english,
            hiragana
        }
    }

    static fromJson(json : any){
        return new Word(json.kanji,json.english,json.hiragana)
    }

    static toJson(){
        return null
    }
    
    getWord(language:Language){
        return this.data[language]
    }
}

export class DB{
    private hiragana:string
    private english:string
    private kanji:string

    constructor(w:Word){
        this.hiragana = w.getWord("hiragana")
        this.english = w.getWord("english")
        this.kanji = w.getWord("kanji")
    }


}
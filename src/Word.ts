export type Language = "kanji" | "english" | "hiragana"


export class Word{
    data : Record<Language,any>
    id:string | null

    constructor(id:string | null,kanji : string, english : string, hiragana : string){
        this.data = {
            kanji,
            english,
            hiragana
        }
        this.id=id
    }

    static fromJson(json : any){
        return new Word(json.id,json.kanji,json.english,json.hiragana)
    }

    toJson(){
        return this.data
    }
    
    getWord(language:Language){
        return this.data[language]
    }

    getId(){
        return this.id
    }

    setId(id:string){
        this.id=id
    }
}

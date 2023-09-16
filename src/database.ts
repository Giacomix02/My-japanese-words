// TODO use Dexie.js
import Dexie from "dexie";
import { Word } from "./Word";


class DB extends Dexie {
    words!: Dexie.Table<WordTable, string>

    constructor () {
        super("my_japanese_words")
        this.version(1).stores({
            words: '++id, english, hiragana, kanji'
        });
    }

    async getWords(){
        let fromDB = await this.words.toArray()
        return fromDB.map(Word.fromJson)
    }

    async addWord(word:Word){
        let table:WordTable = word.toJson()
        return await this.words.add(table)
    }

    async removeWord(id:string){
        let idParsed = parseInt(id)
        return await this.words.where("id").equals(idParsed).delete()
    }
    
    async modifyWord(word:Word){
        let table:WordTable = word.toJson()
        let id = parseInt(word.getId()!)
        this.words.where("id").equals(id).modify(table)
    }

    async deleteAll(){
        this.words.clear()
    }

    async getNumberOfEntries(){
        return this.words.count()
    }

    async search(search:string){
        let out : Word[] = []
        let words = await this.getWords()
        for(let w of words){
            if(w.getWord("english").includes(search) || w.getWord("hiragana").includes(search) || w.getWord("kanji").includes(search)){
                out.push(w)
            }
        }
        return out
    }

}

export const db = new DB()

type WordTable = {
    id?: number,
    english: string,
    hiragana: string,
    kanji: string
}
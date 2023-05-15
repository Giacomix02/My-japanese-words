// TODO use Dexie.js
import Dexie from "dexie";


class DB extends Dexie {
    words!: Dexie.Table<WordTable, string>

    constructor () {
        super("my_japanese_words")
        this.version(1).stores({
            words: '++id, english, hiragana, kanji'
        });
    }


}

const db = new DB()

type WordTable = {
    test: string
}
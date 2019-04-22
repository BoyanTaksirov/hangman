const $ = require("jquery");
const WORDS_DB_PATH = require("./globals").WORDS_DB_PATH;
const START_SCREEN_TYPE = require("./globals").START_SCREEN_TYPE;
const GAME_SCREEN_TYPE = require("./globals").GAME_SCREEN_TYPE;
const MAX_MISTAKES_ALLOWED = require("./globals").MAX_MISTAKES_ALLOWED;

let instance;

module.exports = class GameModel
{
    constructor()
    {
        if (instance)
        {
            return instance;
        }

        instance = this;

        this.currentScreenID;

        this.globalLevel;
        this.gameErrors;

        this.wordDatabase;
        this.currentWordDatabase;

        this.loadWordDatabase();   //words are loaded once
    }

    loadWordDatabase()
    {
        if (this.wordDatabase)
        {
            return;
        }
        else
        {
            var thisRef = this;
            $.ajax({
                url: WORDS_DB_PATH, 
                success: function(result)
                        {
                            thisRef.parseAndProceed(result);
                        },
                error: function(xhr,status,error)
                {
                    throw("DB ERROR! DATABASE NOT LOADED! ERROR# " + error);
                }
            });
        }
    }

    parseAndProceed(result)
    {        
        result.replace(/\s/g, " ");  //first, substitute all whitespaces with space(" "), because inner spaces in a given name must not be removed;
        var rawWords = result.split(",");
        for(var i = 0; i < rawWords.length; i++)
        {
            rawWords[i] = rawWords[i].trim(); //then trim spaces from both sides of the string, preserving the inner spaces;
        }

        this.wordDatabase = rawWords.slice();

        this.resetSession();
    }

    resetSession()
    {
        this.globalLevel = 0;

        if (this.wordDatabase)
        {
            this.currentWordDatabase = this.wordDatabase.slice();
        }
        else
        {
            throw("---THIS SHOULD NEVER HAPPEN!---");
        }
    }

    drawNewWord()
    {
        this.gameErrors = 0;
        return (this.drawWord());
    }

    drawWord()
    {
        var index = Math.floor(Math.random() * this.currentWordDatabase.length);
        var word = this.currentWordDatabase[index];
        this.currentWordDatabase.splice(index, 1);
        if(this.currentWordDatabase.length <= 0)  // if true, all words have beeen selected, so we start over
        {
            this.currentWordDatabase = this.wordDatabase.slice();
        }
        return (word);
    }

    getLevel()
    {
        return this.globalLevel;
    }

    incrementLevel()
    {     
        this.globalLevel++;
    }

    incrementErrors()
    {
        this.gameErrors++;
        if(this.gameErrors >= MAX_MISTAKES_ALLOWED)
        {
            return true;
        }
        else
        {
            return false;
        }
    }

    getErrors()
    {
        return this.gameErrors;
    }
}
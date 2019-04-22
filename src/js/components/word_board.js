const $ = require("jquery");
const DashAndLetter = require("./dash_and_letter");
const CLASS_NAMES = require("../model/globals").CLASS_NAMES;
const WORD_BOARD_PERCENT_HEIGHT = require("../model/globals").WORD_BOARD_PERCENT_HEIGHT;
const NOT_GUESSED_LETTER_COLOR = require("../model/globals").NOT_GUESSED_LETTER_COLOR;

module.exports = class WordBoard
{
    constructor(lineLink)
    {
        this.container = $("<div/>").css({margin: "auto",
                                          textAlign: "center"});

        this.wordContainer = $("<div/>").css("display", "inline-block");
        this.container.append(this.wordContainer);
        this.letters = [];
        this.word = "";

        this.lineLink = lineLink;
    }

    addToContainer(parentContainer)
    {
        this.parentContainer = parentContainer;
        this.parentContainer.append(this.container);
    }

    setWord(word)
    {
        this.reset();
        this.word = word;
        this.setLetters(this.word);
    }

    setLetters(word)
    {
        for(var i = 0; i < word.length; i++)
        {
            this.letters.push(new DashAndLetter(word.charAt(i), this.lineLink, this.wordContainer));
        }
    }

    revealLetters(indexes)
    {
        for(var i = 0; i < indexes.length; i++)
        {
            this.letters[indexes[i]].toggleLetterVisibility(true);
        }
    }

    showAllLetters()
    {
        for(var i = 0; i < this.letters.length; i++)
        {
            if(!this.letters[i].VISIBLE)
            {
                this.letters[i].changeLetterColor(NOT_GUESSED_LETTER_COLOR);
                this.letters[i].toggleLetterVisibility(true);
            }
        }
    }

    reset()
    {
        for(var i = 0; i < this.letters.length; i++)
        {
            this.letters[i].clear();
        }

        this.letters = [];
        this.word = "";
    }

    resize(windowWidth, windowHeight)
    {
        var marginTopBottom = windowHeight*0.01;
        this.container.css({"margin": (marginTopBottom + "px" +  " auto")});

        var letterWidth = (windowWidth/this.letters.length) - 2;

        if(letterWidth > windowHeight*WORD_BOARD_PERCENT_HEIGHT)
        {
            letterWidth = windowHeight*WORD_BOARD_PERCENT_HEIGHT;
        }

        for(var i = 0; i < this.letters.length; i++)
        {
            this.letters[i].resize(letterWidth);
        }
    }

    clear()
    {
        this.reset();
        this.container.empty();
        this.container.remove();
    }
}
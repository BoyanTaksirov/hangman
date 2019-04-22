const $ = require("jquery");
const BaseScreen = require("./base_screen");
const SwitchButton = require("../components/switch_button");
const ButtonStateData = require("../model/button_state_data");
const GAME_SCREEN_TYPE = require("../model/globals").GAME_SCREEN_TYPE;
const CLASS_NAMES = require("../model/globals").CLASS_NAMES;
const ImagePanel = require("../components/image_panel");
const WordBoard = require("../components/word_board");
const VirtualKeyboard = require("../components/virtual_keyboard");
const PostGameScreen = require("../components/post_game_screen");
const GAME_BKG_PATH = require("../model/globals").GAME_BKG_PATH;
const LINE_PATH = require("../model/globals").LINE_PATH;
const TICK_PATH = require("../model/globals").TICK_PATH;
const STRIKE_OUT_PATH = require("../model/globals").STRIKE_OUT_PATH;
const THUMB_UP_PATH = require("../model/globals").THUMB_UP_PATH;
const THUMB_DOWN_PATH = require("../model/globals").THUMB_DOWN_PATH;

const SOUND_GUESSED_ID = require("../model/globals").SOUND_GUESSED_ID;
const SOUND_LOSE_ID = require("../model/globals").SOUND_LOSE_ID;
const SOUND_LEVEL_UP_ID = require("../model/globals").SOUND_LEVEL_UP_ID;
const SOUND_GAME_LOSE_ID = require("../model/globals").SOUND_GAME_LOSE_ID;

const VIRTUAL_KEYBOARD_KEYS = require("../model/globals").VIRTUAL_KEYBOARD_KEYS;

module.exports = class GameScreen extends BaseScreen
{
    constructor(parentContainer, exitScreenHandler, imageAssets, additionalImageAssets, soundManager, gameModel, scrDimensions)
    {
        super(GAME_SCREEN_TYPE, parentContainer, exitScreenHandler, soundManager);
        this.imageAssets = imageAssets;
        this.additionalImageAssets = additionalImageAssets;
        this.gameModel = gameModel;
        this.screenDimensions = scrDimensions;

        this.onStartPressed = this.onExitPressed.bind(this);
        this.onKeyPressed = this.onKeyPressed.bind(this);
        this.startNewWordHandler = this.startNewWordHandler.bind(this);
        this.startOverHandler = this.startOverHandler.bind(this);

        this.panelAndKeyboardContainer;
        this.exitGameButton;
        this.imagePanel;
        this.virtualKeyboard;
        this.winScreen;
        this.endGameScreen;
        this.wordBoard;
        this.bkg;

        this.currentWord = "";
        this.currentWordLength = 0;
        this.revealedLetters = 0;

        this.create();

        this.startNewGame();
    }

    create()
    {
        super.create();
        this.container.css({
            "text-align": "center"
        });

        //--------identified resources storage--------------------
        var wordBoardLineLink;
        var vKbdRes = [];
        var thumbUpLink;
        var thumbDownLink;

        //------------------resources identification--------------
        for (var a = 0; a < this.additionalImageAssets.length; a++)
        {
            if (this.additionalImageAssets[a].originalLink === GAME_BKG_PATH)
            {
                var link = this.additionalImageAssets[a].blobLink;
                var bkgLink = "url(" + link + ")";
                this.container.css({"background-image": bkgLink});
            }
            else if (this.additionalImageAssets[a].originalLink === LINE_PATH)
            {
                wordBoardLineLink = this.additionalImageAssets[a].blobLink;              
            }
            else if (this.additionalImageAssets[a].originalLink === TICK_PATH)
            {
                vKbdRes[0] = this.additionalImageAssets[a].blobLink;              
            }
            else if (this.additionalImageAssets[a].originalLink === STRIKE_OUT_PATH)
            {
                vKbdRes[1] = this.additionalImageAssets[a].blobLink;              
            }
            else if (this.additionalImageAssets[a].originalLink === THUMB_UP_PATH)
            {
                thumbUpLink = this.additionalImageAssets[a].blobLink;              
            }
            else if (this.additionalImageAssets[a].originalLink === THUMB_DOWN_PATH)
            {
                thumbDownLink = this.additionalImageAssets[a].blobLink;              
            }
        }

        this.scoreLabel = $("<div/>").addClass(CLASS_NAMES.ScoreLabel);
        this.container.append(this.scoreLabel);
      
        this.panelAndKeyboardContainer = $("<div/>").addClass(CLASS_NAMES.PanelAndKeyboardContainer);
        this.container.append(this.panelAndKeyboardContainer);

        var buttonStateData = new ButtonStateData("X", this.onStartPressed, CLASS_NAMES.ExitButton);
        this.exitGameButton = new SwitchButton([buttonStateData], "EXIT_GAME_BUTTON_ID", true, this.soundManager.playClickSound);
        this.exitGameButton.rotateRandom();
        this.exitGameButton.addToContainer(this.container);

        this.imagePanel = new ImagePanel(this.imageAssets, this.screenDimensions);
        this.imagePanel.addToContainer(this.panelAndKeyboardContainer);

        this.wordBoard = new WordBoard(wordBoardLineLink);
        this.wordBoard.addToContainer(this.container);

        this.virtualKeyboard = new VirtualKeyboard(VIRTUAL_KEYBOARD_KEYS, this.onKeyPressed, vKbdRes, this.soundManager.playClickSound);
        this.virtualKeyboard.addToContainer(this.panelAndKeyboardContainer);

        this.winScreen = new PostGameScreen(this.startNewWordHandler, thumbUpLink, "New Word", CLASS_NAMES.WinButton, this.soundManager.playClickSound);
        this.winScreen.hide();
        this.winScreen.addToContainer(this.panelAndKeyboardContainer);

        this.endGameScreen = new PostGameScreen(this.startOverHandler, thumbDownLink, "New Game", CLASS_NAMES.NewGameButton, this.soundManager.playClickSound);
        this.endGameScreen.hide();
        this.endGameScreen.addToContainer(this.panelAndKeyboardContainer);

        this.addToContainer();
    }

    startNewGame()
    {
        this.gameModel.resetSession();
        this.startNewWord();
    }

    startNewWord()
    {
        this.winScreen.hide();
        this.endGameScreen.hide();
        this.imagePanel.resetPanel();
        this.virtualKeyboard.reset();
        this.virtualKeyboard.show();  
        this.revealedLetters = 0;
        this.currentWord = this.gameModel.drawNewWord();
        var wordNoSpaces = this.currentWord.replace(/ /g, '');
        this.currentWordLength = wordNoSpaces.length;
        this.wordBoard.setWord(this.currentWord);

        this.scoreLabel.text("Score: " + this.gameModel.getLevel());

        var windowWidth = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        this.wordBoard.resize(windowWidth, windowHeight);
    }

    showWinScreen()
    {
        this.wordBoard.showAllLetters();
        this.gameModel.incrementLevel();
        this.virtualKeyboard.hide();
        this.winScreen.show();
    }

    endGame()
    {
        this.wordBoard.showAllLetters();
        this.imagePanel.startEndingAnimation();
        this.virtualKeyboard.hide();
        this.endGameScreen.show();
    }

    startNewWordHandler()
    {
        this.startNewWord();
    }

    startOverHandler()
    {
        this.startNewGame();
    }

    onKeyPressed(letter)
    {
        var indexes = this.checkForMatch(letter);
        if (indexes.length > 0)
        {
            this.proceedRightAnswer(indexes);
            return (true);
        }
        else
        {
            this.proceedWrongAnswer();
            return (false);
        }
    }

    checkForMatch(letter)
    {
        var indexes = [];
        for (var i = 0; i < this.currentWord.length; i++)
        {
            var currentChar = this.currentWord.charAt(i);
            if (currentChar.toLowerCase() === letter.toLowerCase())
            {
                indexes.push(i);
            }
        }

        return (indexes);
    }

    proceedRightAnswer(indexes)
    {
      

        this.wordBoard.revealLetters(indexes);
        this.revealedLetters += indexes.length;
        if (this.revealedLetters >= this.currentWordLength)
        {
            this.soundManager.playSound(SOUND_LEVEL_UP_ID);
            this.showWinScreen();
        }
        else
        {
            this.soundManager.playSound(SOUND_GUESSED_ID);
        }
    }

    proceedWrongAnswer()
    {
        if (this.gameModel.incrementErrors())
        {
            this.soundManager.playSound(SOUND_GAME_LOSE_ID);
            this.endGame();
        }
        else
        {
            this.soundManager.playSound(SOUND_LOSE_ID);
            this.imagePanel.showElement(this.gameModel.getErrors() - 1);
        }
    }

    onExitPressed(buttonInstance)
    {
        this.exitScreenHandler(this.screenType);
    }

    resize(windowWidth, windowHeight)
    {
        super.resize(windowWidth, windowHeight);
        this.panelAndKeyboardContainer.css("height", windowHeight * 0.7);
        this.imagePanel.resize(windowHeight * 0.7);
        this.wordBoard.resize(windowWidth, windowHeight);
        this.virtualKeyboard.resize(windowWidth, windowHeight);
        this.winScreen.resize();
        this.endGameScreen.resize();

        this.scoreLabel.css("font-size", windowHeight*0.07 + "px");
    }

    clear()
    {
        super.clear();
        this.exitGameButton.clear();
        this.imagePanel.clear();
        this.wordBoard.clear();
        this.virtualKeyboard.clear();
        this.winScreen.clear();
        this.endGameScreen.clear();
        this.panelAndKeyboardContainer.empty();
        this.container.empty();
    }
}
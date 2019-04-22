module.exports.WORDS_DB_PATH = "./assets/words_db.txt";
module.exports.START_SCREEN_TYPE = "START_SCREEN_TYPE";
module.exports.GAME_SCREEN_TYPE = "GAME_SCREEN_TYPE";

module.exports.HANGMAN_DESCRIPTION_TITLE = "Welcome to Hangman Game!";
module.exports.HANGMAN_DESCRIPTION = `<p>  You have to guess a name of a given world city, letter by letter. 
                                        But instead of letters there are only dashes shown.</p>
                                        <p>Click on the screen keyboard to guess a letter.</p>
                                        <p>If you have guessed, the appropriate letter will apper over the corresponding dash, but if not... a gallows element appears instead!</p>
                                        <p>Continue, untill you guess the word, or get hung!</p>
                                        </br>
                                        <p style = "text-align: center; font-size: 2rem"><b>Good Luck!</b></p>`;

module.exports.CLASS_NAMES = {
    GlobalContainer: "globalContainer",
    BaseScreen: "baseScreen",
    StartScreenBkg: "startScreenBkg",
    StartScreen: "startScreen",
    DescriptionTitle: "startScreenDescriptionTitle",
    DescriptionText: "startScreenDescriptionText",
    GameScreen: "gameScreen",
    StandardButton: "standardButton",
    ImageElement: "imageElement",
    ImageButtonContainerVK: "imageButtonContainerVK",
    ImageButtonImageVK: "imageButtonImageVK",
    ImageButtonTextVK: "imageButtonTextVK",
    ImageButtonTextVKInactive: "ImageButtonTextVKInactive",
    PreloaderBkg: "preloaderBkg",
    PreloaderLabel: "preloaderLabel",
    PreloaderOuterPB: "preloaderOuterPB",
    PreloaderInnerPB: "preloaderInnerPB",
    PanelAndKeyboardContainer: "panelAndKeyboardContainer",
    ImagePanel: "imagePanel",
    HandThumbs: "handThumbs",
    WinButton: "winButton",
    NewGameButton: "newGameButton",
    VirtualKeyboard: "virtualKeyboard",
    VirtualKey: "virtualKey",
    VirtualKeyRight: "virtualKeyRight",
    VirtualKeyWrong: "virtualKeyWrong",
    PostGameScreens: "postGameScreens",
    DashAndLetterContainer: "dashAndLetterContainer",
    Letter: "letter",
    Dash: "dash",
    WordBoardContainer: "wordBoardContainer",
    WordBoard: "wordBoard",
    ScoreLabel: "scoreLabel",
    ExitButton: "exitButton"
}

var SOUND_CLICK_PATH = "./assets/sounds/click.mp3";
var SOUND_LOSE_PATH = "./assets/sounds/lose.mp3";
var SOUND_GUESSED_PATH = "./assets/sounds/win.mp3";
var SOUND_LEVEL_UP_PATH = "./assets/sounds/levelUp.mp3";
var SOUND_GAME_LOSE_PATH = "./assets/sounds/gameLose.mp3";

var START_SCREEN_BKG_PATH = "./assets/images/startScreenBkg.png";
var GAME_BKG_PATH = "./assets/images/gameBkg.jpg";
var LINE_PATH = "./assets/images/line.png";
var TICK_PATH = "./assets/images/tick.png";
var STRIKE_OUT_PATH = "./assets/images/strikeOut.png";
var THUMB_UP_PATH = "./assets/images/thumbUp.png";
var THUMB_DOWN_PATH = "./assets/images/thumbDown.png";

var IMAGE_ASSETS_PATHS = ["./assets/images/1.png", "./assets/images/2.png","./assets/images/3.png",
"./assets/images/4.png","./assets/images/5.png","./assets/images/6.png","./assets/images/7.png"];

var IMAGE_PANEL_ELEMENTS_PERCENT_DIMENSONS = [0.34, 0.34, 0.085, 0.28, 0.56, 0.09, 0.15];  //gallows image elements widths as percents of their container width

var SOUNDS_ASSETS_PATHS = [SOUND_CLICK_PATH, SOUND_GUESSED_PATH, SOUND_LOSE_PATH, SOUND_LEVEL_UP_PATH, SOUND_GAME_LOSE_PATH];

var ADDITIONAL_IMAGE_ASSETS_PATHS = [GAME_BKG_PATH, LINE_PATH, TICK_PATH, STRIKE_OUT_PATH, THUMB_UP_PATH, THUMB_DOWN_PATH, START_SCREEN_BKG_PATH];

var ALL_ASSETS_PATHS = IMAGE_ASSETS_PATHS.concat(ADDITIONAL_IMAGE_ASSETS_PATHS, SOUNDS_ASSETS_PATHS);

module.exports.SOUND_GUESSED_ID = "SOUND_GUESSED_ID";
module.exports.SOUND_LOSE_ID = "SOUND_LOSE_ID";
module.exports.SOUND_CLICK_ID = "SOUND_CLICK_ID";
module.exports.SOUND_LEVEL_UP_ID = "SOUND_LEVEL_UP_ID";
module.exports.SOUND_GAME_LOSE_ID = "SOUND_GAME_LOSE_ID";


module.exports.IMAGE_PATHS = IMAGE_ASSETS_PATHS;
module.exports.ADDITIONAL_IMAGE_ASSETS_PATHS = ADDITIONAL_IMAGE_ASSETS_PATHS;
module.exports.SOUNDS_PATHS = SOUNDS_ASSETS_PATHS;
module.exports.ALL_ASSETS_PATHS = ALL_ASSETS_PATHS;

module.exports.START_SCREEN_BKG_PATH = START_SCREEN_BKG_PATH;
module.exports.GAME_BKG_PATH = GAME_BKG_PATH;
module.exports.LINE_PATH = LINE_PATH;
module.exports.TICK_PATH = TICK_PATH;
module.exports.STRIKE_OUT_PATH = STRIKE_OUT_PATH;
module.exports.THUMB_UP_PATH = THUMB_UP_PATH;
module.exports.THUMB_DOWN_PATH = THUMB_DOWN_PATH;

module.exports.SOUND_CLICK_PATH = SOUND_CLICK_PATH;
module.exports.SOUND_LOSE_PATH = SOUND_LOSE_PATH;
module.exports.SOUND_GUESSED_PATH = SOUND_GUESSED_PATH;
module.exports.SOUND_LEVEL_UP_PATH = SOUND_LEVEL_UP_PATH;
module.exports.SOUND_GAME_LOSE_PATH = SOUND_GAME_LOSE_PATH;

module.exports.IMAGE_PANEL_ELEMENTS_PERCENT_DIMENSONS = IMAGE_PANEL_ELEMENTS_PERCENT_DIMENSONS;

module.exports.MAX_MISTAKES_ALLOWED = 8;
module.exports.VIRTUAL_KEYBOARD_KEYS = "QWERTYUIOPASDFGHJKLZXCVBNM";  //the keys for the virtual keyboard given as one string

module.exports.NOT_GUESSED_LETTER_COLOR = "rgb(132, 130, 122)";

module.exports.WORD_BOARD_PERCENT_HEIGHT = 0.18;


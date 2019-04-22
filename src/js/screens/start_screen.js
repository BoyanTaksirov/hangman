const $ = require("jquery");
const BaseScreen = require("./base_screen");
const SwitchButton = require("../components/switch_button");
const ButtonStateData = require("../model/button_state_data");
const START_SCREEN_TYPE = require("../model/globals").START_SCREEN_TYPE;
const CLASS_NAMES = require("../model/globals").CLASS_NAMES;
const START_SCREEN_BKG_PATH = require("../model/globals").START_SCREEN_BKG_PATH;
const HANGMAN_DESCRIPTION_TITLE = require("../model/globals").HANGMAN_DESCRIPTION_TITLE;
const HANGMAN_DESCRIPTION = require("../model/globals").HANGMAN_DESCRIPTION;

module.exports = class StartScreen extends BaseScreen
{
    constructor(parentContainer, exitScreenHandler, soundManager, additionalImageAssets)
    {
        super(START_SCREEN_TYPE, parentContainer, exitScreenHandler, soundManager);
        this.additionalImageAssets = additionalImageAssets;

        this.onStartPressed = this.onStartPressed.bind(this);

        this.descriptionTitle;
        this.descriptionText;
        this.startButton;

        this.create();
        this.addToContainer();
    }

    onStartPressed(buttonInstance)
    {
        this.exitScreenHandler(this.screenType);
    }

    create()
    {
        super.create();

        this.container.addClass(CLASS_NAMES.StartScreenBkg);

        for(var i = 0; i < this.additionalImageAssets.length; i++)
        {
            if (this.additionalImageAssets[i].originalLink === START_SCREEN_BKG_PATH)
            {
                var bkgString = "url(" + this.additionalImageAssets[i].blobLink + ")";

                this.container.css({
                    "min-height": "100vh",
                    "background-image": bkgString,
                    "background-repeat": "no-repeat",
                    "background-attachment": "fixed",
                    "background-position": "center",                          
                });
                break;
            }
        }
     
        this.descriptionHolder = $("<div/>").addClass(CLASS_NAMES.StartScreen);
        this.container.append(this.descriptionHolder);

        this.descriptionTitle = $("<div/>").text(HANGMAN_DESCRIPTION_TITLE).addClass(CLASS_NAMES.DescriptionTitle);
        this.descriptionHolder.append(this.descriptionTitle);

        this.descriptionText = $("<div/>").html(HANGMAN_DESCRIPTION).addClass(CLASS_NAMES.DescriptionText);
        this.descriptionHolder.append(this.descriptionText);

        var buttonStateData = new ButtonStateData("Start Game", this.onStartPressed, CLASS_NAMES.StandardButton);
        this.startButton = new SwitchButton([buttonStateData], "START_BUTTON_ID", true, this.soundManager.playClickSound);
        this.startButton.addToContainer(this.descriptionHolder);
    }

    resize(windowWidth, windowHeight)
    {
        //super.resize(windowWidth, windowHeight);
    }

    clear()
    {
        super.clear();
        this.startButton.clear();
    }
}
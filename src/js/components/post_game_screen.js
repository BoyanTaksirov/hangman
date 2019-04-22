const $ = require("jquery");
const CLASS_NAMES = require("../model/globals").CLASS_NAMES;
const SwitchButton = require("./switch_button");
const ButtonStateData = require("../model/button_state_data");

module.exports = class EndGameScreen
{
    constructor(buttonPressHandler, thumbLink, buttonLabel, buttonClassName, buttonClickFunc)
    {
        this.buttonPressHandler = buttonPressHandler;

        this.onButtonPressed = this.onButtonPressed.bind(this);

        this.container = $("<div/>").addClass(CLASS_NAMES.PostGameScreens);
        this.thumbImage = $("<img/>").addClass(CLASS_NAMES.HandThumbs);
        this.thumbImage.attr("src", thumbLink);
        this.container.append(this.thumbImage);

        var buttonStateData = new ButtonStateData(buttonLabel, this.onButtonPressed, buttonClassName);
        this.restartButton = new SwitchButton([buttonStateData], buttonLabel, true, buttonClickFunc);
        this.restartButton.addToContainer(this.container);
    }

    show()
    {
        this.thumbImage.css("opacity", 0);
        this.container.show();   
        this.thumbImage.animate({opacity: 1}, 500);
        this.VISIBLE = true;
        this.resize();
    }

    hide()
    {
        this.container.hide();
        this.VISIBLE = false;
    }

    addToContainer(parentContainer)
    {
        this.parentContainer = parentContainer;
        this.parentContainer.append(this.container);
    }

    resize()
    {
        if(!this.VISIBLE)
        {
            return
        }
        var parentHeight = this.parentContainer.height();
        var newButtonHeight = parentHeight*0.1;
        var newButtonWidth = newButtonHeight*2;
        var newFontSize = newButtonHeight/2;
        this.restartButton.resize(newButtonWidth, newButtonHeight, newFontSize);
    }

    onButtonPressed(e)
    {
        this.buttonPressHandler();
    }

    clear()
    {
        this.restartButton.clear();
        this.container.remove();
        this.container.empty();
    }
}
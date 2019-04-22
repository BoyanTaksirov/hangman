const $ = require("jquery");
const CLASS_NAMES = require("../model/globals").CLASS_NAMES;
const SwitchImageButton = require("./switch_image_button");
const ImageButtonStateData = require("../model/image_button_state_data");

module.exports = class VirtualKeyboard
{
    constructor(keyData, keyPressedHandler, imageResources, playClick = null)
    {
        this.keyPressedHandler = keyPressedHandler;

        this.container = $("<div/>").addClass(CLASS_NAMES.VirtualKeyboard);
        this.keys = [];

        this.onKeyPressed = this.onKeyPressed.bind(this);

        for (var i = 0; i < keyData.length; i++) 
        {
            var buttonStateData1 = new ImageButtonStateData(keyData.charAt(i), this.onKeyPressed, {color: "rgb(60, 68, 60)", cursor: "pointer"}, null, null);
            var buttonStateData2 = new ImageButtonStateData(keyData.charAt(i), null, {color: "rgb(139, 255, 142)", cursor: "default"}, imageResources[0], true);
            var buttonStateData3 = new ImageButtonStateData(keyData.charAt(i), null, {color: "rgb(255, 148, 119)", cursor: "default"}, imageResources[1], true);

            var buttonStateData = [buttonStateData1, buttonStateData2, buttonStateData3];
            var letterKey = new SwitchImageButton(buttonStateData, keyData.charAt(i), false, playClick);
            letterKey.useBorderBoxSizing(true);
            letterKey.rotateRandom();
            letterKey.addToContainer(this.container);           
            this.keys.push(letterKey);
        }      
    }

    addToContainer(parentContainer)
    {
        this.parentContainer = parentContainer;
        this.parentContainer.append(this.container);
    }

    show()
    {
        this.container.show();
        this.resize();
    }

    hide()
    {
        this.container.hide();
    }

    onKeyPressed(buttonInstance)
    {
        var result = this.keyPressedHandler(buttonInstance.buttonId);
        if(result)
        {
            buttonInstance.setState(1);
        }
        else
        {
            buttonInstance.setState(2);
        }
    }

    reset()
    {
        for (var i = 0; i < this.keys.length; i++) 
        {
            this.keys[i].setState(0);
        }
    }

    getDimensions()
    {
        var dimensions = {width: this.container.width(), height: this.container.height()};
        return(dimensions);
    }

    resize()
    {      
        var containerComputedWidth = this.container.width();
        var containerComputedHeight = this.container.height();

        var maxSide = Math.max(containerComputedWidth, containerComputedHeight);
        var minSide = Math.min(containerComputedWidth, containerComputedHeight);
        var maxMinRatio = maxSide/minSide;

        var buttonSize = 0;
        for(var minSideButtonCount = 1; minSideButtonCount < this.keys.length; minSideButtonCount++)
        {
            var testButtonSize = (minSide/minSideButtonCount);
            var maxSideButtonCount = Math.floor(maxSide/testButtonSize);
            if(minSideButtonCount*maxSideButtonCount >= this.keys.length)
            {
                buttonSize = testButtonSize - 12;
                break;
            }
        }

        var newButtonWidth = buttonSize;
        var newButtonHeight = buttonSize;

        for (var i = 0; i < this.keys.length; i++) 
        {
            this.keys[i].resize(newButtonWidth, newButtonHeight);
        }
    }

    clear()
    {
        for (var i = 0; i < this.keys.length; i++) 
        {
            this.keys[i].clear();
        }

        this.container.empty();
        this.container.remove();

        this.keys = null;
    }
}
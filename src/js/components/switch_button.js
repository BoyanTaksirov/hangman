const $ = require("jquery");

module.exports = class SwitchButton
{
    constructor(buttonStates, id = null, autoToggle = true, playClick = null)
    {
        this.currentState = 0;
        this.buttonStates = buttonStates;
        this.buttonId = id;
        this.autoToggle = autoToggle;
        this.playClick = playClick;

        this.onButtonClick = this.onButtonClick.bind(this);

        this.initializeButton();
    }

    initializeButton()
    {
        this.buttonContainer = $("<div/>");
        this.setState(0);
        this.buttonContainer.click(this.onButtonClick);
    }

    useBorderBoxSizing(isBorderBox)
    {
        if(isBorderBox)
        {
            this.buttonContainer.css("box-sizing", "border-box");
        }
        else
        {
            this.buttonContainer.css("box-sizing", "content-box");
        }
    }

    rotateRandom()
    {
        var degree = Math.random()*10 - 5;
        this.buttonContainer.css("transform", "rotate(" + degree + "deg)");
    }

    setState(state)
    {
        if (state < this.buttonStates.length)
        {
            this.currentState = state;
            this.setAppearance(this.currentState);
        }
        else
        {
            console.log("[SwitchButton] Given state number is higher than the current state count for this button");
        }
    }

    setAppearance(stateNumber)
    {
        this.buttonContainer.text(this.buttonStates[stateNumber].buttonLabel);
        this.setClass(this.buttonStates[stateNumber].buttonClassName);
    }

    setClass(className)
    {
        this.buttonContainer.removeClass();
        this.buttonContainer.addClass(className);
    }

    onButtonClick(event)
    {
        if(this.playClick)
        {
            this.playClick();
        }

        if (this.buttonStates[this.currentState].stateHandler)
        {
            this.buttonStates[this.currentState].stateHandler(this);
        }
        else
        {
            return;
        }

        if (this.autoToggle)
        {
            if (this.buttonStates.length > 1)
            {
                var newState = this.currentState + 1;
                if (newState >= this.buttonStates.length)
                {
                    newState = 0;
                }

                this.setState(newState);
            }
        }
    }

    hide()
    {
        this.buttonContainer.hide();
    }

    show()
    {
        this.buttonContainer.show();
    }

    addToContainer(parentContainer)
    {
        if (!this.buttonContainer[0].parentElement)
        {
            parentContainer.append(this.buttonContainer);
        }
    }

    removeFromContainer()
    {
        this.buttonContainer.remove();
    }

    resize(newWidth, newHeight, newFontSize = null)
    {
        var fontSize = newHeight;
        if(newFontSize)
        {
            fontSize = newFontSize;
        }

        this.buttonContainer.css({width: newWidth,
                                  height: newHeight,
                                  fontSize: fontSize,
                                  lineHeight: newHeight + "px"});
    }

    clear()
    {
        this.buttonContainer.off();
        this.buttonContainer.empty();
        this.removeFromContainer();
    }
}
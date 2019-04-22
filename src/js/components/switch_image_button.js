const $ = require("jquery");
const CLASS_NAMES = require("../model/globals").CLASS_NAMES;

module.exports = class SwitchImageButton
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
        this.container = $("<div/>").addClass(CLASS_NAMES.ImageButtonContainerVK);
        this.image = $("<img/>").addClass(CLASS_NAMES.ImageButtonImageVK);
        this.textContainer = $("<div/>").addClass(CLASS_NAMES.ImageButtonTextVK);
        this.container.append(this.image);
        this.container.append(this.textContainer);
        this.setState(0);
        this.container.click(this.onButtonClick);
    }

    useBorderBoxSizing(isBorderBox)
    {
        if (isBorderBox)
        {
            this.container.css("box-sizing", "border-box");
        }
        else
        {
            this.container.css("box-sizing", "content-box");
        }
    }

    rotateRandom()
    {
        var degree = Math.random() * 10 - 5;
        this.container.css("transform", "rotate(" + degree + "deg)");
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
            console.log("[SwitchImageButton] Given state number is higher than the current state count for this button");
        }
    }

    setAppearance(stateNumber)
    {
        this.textContainer.text(this.buttonStates[stateNumber].buttonLabel);
        if(this.buttonStates[stateNumber].imageSource)
        {
            this.image.attr("src", this.buttonStates[stateNumber].imageSource);
            this.image.show();
        }
        else
        {
            this.image.hide();
        }
        this.setCSSProperties(stateNumber);
    }

    setCSSProperties(stateNumber)
    { 
        for(var cssProperty in this.buttonStates[stateNumber].buttonCSSData)
        {
            this.textContainer.css(cssProperty, this.buttonStates[stateNumber].buttonCSSData[cssProperty]);
        }

        var newWidth = this.textContainer.width();
        var newHeight = this.textContainer.height();

        this.image.css({width: newWidth, height: newHeight});
    }

    onButtonClick(event)
    {      
        if (this.buttonStates[this.currentState].stateHandler)
        {
            this.buttonStates[this.currentState].stateHandler(this);
            if (this.playClick)
            {
                this.playClick();
            }
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
        this.container.hide();
    }

    show()
    {
        this.container.show();
    }

    addToContainer(parentContainer)
    {
        if (!this.container[0].parentElement)
        {
            parentContainer.append(this.container);
        }
    }

    removeFromContainer()
    {
        this.container.remove();
    }

    resize(newWidth, newHeight)
    {
        this.container.css({
            width: newWidth,
            height: newHeight
        });

        this.image.css({
            width: newWidth,
            height: newHeight
        });

        this.textContainer.css({
            width: newWidth,
            height: newHeight,
            fontSize: newHeight,
            lineHeight: newHeight + "px"
        });
    }

    clear()
    {
        this.container.off();
        this.container.empty();
        this.removeFromContainer();
    }
}
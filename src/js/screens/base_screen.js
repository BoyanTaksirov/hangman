const $ = require("jquery");
const CLASS_NAMES = require("../model/globals").CLASS_NAMES;

module.exports = class BaseScreen
{
    constructor(screenType, parentContainer, exitScreenHandler, soundManager)
    {
        this.container;
        this.screenType = screenType;
        this.parentContainer = parentContainer;
        this.exitScreenHandler = exitScreenHandler;      
        this.soundManager = soundManager;
    }

    addToContainer()
    {
        this.parentContainer.append(this.container);
    }

    resize(windowWidth, windowHeight)
    {
       this.container.css({width: windowWidth, height: windowHeight});
    }

    create()
    {
        this.container = $("<div/>");
    }

    clear()
    {
        this.container.remove();
        this.container.empty();
    }
}